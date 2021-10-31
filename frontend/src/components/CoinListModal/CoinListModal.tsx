import React, { useCallback } from 'react'

import Modal from '@/components/common/Modal'
import Input from '@/components/common/Input'
import Label from '@/components/common/Label'
import Select from '@/components/common/Select'

import { coinListModalHook } from '@/hooks/coinListModalHook'
import { useAddCoinModalVisibleState, useAddCoinModalLoadingState, useAddCoinModalStateSelector, useCoinMarketList } from '@/atoms/addCoinDialog'

const inputCSS = {
    padding: '0.4rem 0.8rem',
}
const buttonCSS = {
    padding: '0.3rem 0'
}

export function coinListModal() {
    console.log('coinListModal')
    const { mutation, user } = coinListModalHook()
    const [, setDialogLoadingState] = useAddCoinModalLoadingState()
    const [dialogVisibleState, setDialogVisibleState] = useAddCoinModalVisibleState()
    const [dialogValue, setDialogValue] = useAddCoinModalStateSelector()
    const coinMarketList = useCoinMarketList();

    const modalConfirmAction = useCallback(async() => {
        setDialogLoadingState(true);
        try {
            await mutation.mutate({
                ...dialogValue,
                'user': user
            })
        } catch(e) {
            console.log(e);
        }
        setDialogLoadingState(false);
        changeDialogState();
    }, [dialogValue, user])
    

    const onChangeModalInput = useCallback((e:React.FormEvent<HTMLInputElement>, type:string) => {
        let value:any = e.currentTarget.value;
        if(type === 'number') {
            value = parseInt(e.currentTarget.value.replace(/[^\d]+/g, ''), 10)
            if(isNaN(value)) {
                value = 0
            }
        }

        setDialogValue({
            ...dialogValue,
            [e.currentTarget.name]: type === 'number' ? value?.toLocaleString() : value
        });
        console.log('onChangeModalInput: ', dialogValue)

    }, [dialogValue])
    

    const onChangeModalSelect = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.currentTarget.value;

        setDialogValue({
            ...dialogValue,
            [e.currentTarget.name]: value
        });
    }

    const changeDialogState = useCallback(() => {
        setDialogVisibleState(!dialogVisibleState)
    }, [dialogVisibleState])
    
    return(
        <Modal
            modalConfirmAction={modalConfirmAction}
            changeDialogState={changeDialogState}
            visible={dialogValue.visible}
            hasBottomBtn={true}
            hasTitle={dialogValue.ticker}
            btnLoading={dialogValue.loading}
            buttonCSS={buttonCSS}
        >
            <div>
                <Label>
                    <span>마켓</span>
                    <div>
                        <Select css={inputCSS} options={coinMarketList} name="market" onChange={onChangeModalSelect}/>
                    </div>
                </Label>
            </div>
            <div>
                <Label>
                    <span>코인당 가격</span>
                    <Input css={inputCSS} type="text" name="price" onChange={(e) => onChangeModalInput(e, 'number')} value={dialogValue.price}/>
                </Label>
            </div>
            <div>
                <Label>
                    <span>수량</span>
                    <Input css={inputCSS} type="text" name="ea" onChange={(e) => onChangeModalInput(e, 'number')} value={dialogValue.ea}/>
                </Label>
            </div>
            <div>
                <Label>
                    <span>날짜</span>
                    <Input css={inputCSS} type="text" name="date" onChange={(e) => onChangeModalInput(e, 'date')} value={dialogValue.date}/>
                </Label>
            </div>
        </Modal>
    )
}

export default coinListModal