import React, { useCallback } from 'react'

import Modal from '@/components/common/Modal'
import Input from '@/components/common/Input'
import Label from '@/components/common/Label'
import Select from '@/components/common/Select'

import { coinListModalHook } from '@/hooks/coinListModalHook'
import numberFormat, {formatType} from '@/lib/validation/numberFormat'
import dateFormat from '@/lib/validation/dateFormat'

const inputCSS = {
    padding: '0.4rem 0.8rem',
}
const buttonCSS = {
    padding: '0.3rem 0'
}

const loadingCSS = {
    width: '5rem',
    height: '5rem'
}

export function coinListModal() {
    console.log('추가, 수정 모달')
    const { coinMarketList, dialogValue, setDialogValue, changeDialogState, confirmAction } = coinListModalHook()

    const onChangeModalInput = useCallback((e:React.FormEvent<HTMLInputElement>, type:formatType) => {
        setDialogValue({
            ...dialogValue,
            [e.currentTarget.name]: numberFormat(e.currentTarget.value, type)
        });
    }, [dialogValue])
    

    const onChangeModalSelect = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.currentTarget.value;

        setDialogValue({
            ...dialogValue,
            [e.currentTarget.name]: value
        });
    }
    
    return(
        <Modal
            modalConfirmAction={confirmAction}
            changeDialogState={changeDialogState}
            visible={dialogValue.visible ? true : false}
            hasBottomBtn={true}
            hasTitle={dialogValue.ticker}
            btnLoading={dialogValue.loading}
            buttonCSS={buttonCSS}
            loadingCSS={loadingCSS}
        >
            <div>
                <Label>
                    <span>마켓</span>
                    <div>
                        <Select css={inputCSS} options={coinMarketList} name="market" onChange={onChangeModalSelect} value={dialogValue.market}/>
                    </div>
                </Label>
            </div>
            <div>
                <Label>
                    <span>코인당 가격</span>
                    <Input css={inputCSS} type="text" name="price" onChange={(e) => onChangeModalInput(e, 'number')} value={numberFormat(dialogValue.price, "number")} placeholder="KRW단위"/>
                </Label>
            </div>
            <div>
                <Label>
                    <span>수량</span>
                    <Input css={inputCSS} type="text" name="ea" onChange={(e) => onChangeModalInput(e, 'number')} value={numberFormat(dialogValue.ea, "number")}/>
                </Label>
            </div>
            <div>
                <Label>
                    <span>날짜</span>
                    <Input css={inputCSS} type="date" name="date" onChange={(e) => onChangeModalInput(e, 'date')} value={dateFormat(dialogValue.date)}/>
                </Label>
            </div>
        </Modal>
    )
}

export default coinListModal