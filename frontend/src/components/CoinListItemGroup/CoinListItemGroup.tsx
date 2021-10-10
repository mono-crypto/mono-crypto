import React, { useState } from 'react'

import Input from '@/components/common/Input'
import Label from '@/components/common/Label'
import Modal from '@/components/common/Modal'

import { useRecoilState, useSetRecoilState } from 'recoil'
import { addCoinDialogState, loadingAddCoinDialog } from '@/atoms/addCoinDialog'

import { addWalletItem as TaddWalletItem } from '@/lib/api/types'

import { coinListItemGroupHook } from '@/hooks/coinListItemGroup'

import { coinListFilterInput } from '@/atoms/coinListState'

import * as S from './styles'

interface CoinListItemGroupProps {
    children: React.ReactNode
}

function CoinListItemGroup({children}: CoinListItemGroupProps) {
    const [coinDialogState, setCoinDialogState] = useRecoilState(addCoinDialogState);
    const [coinDialogLoadingState, setCoinDialogLoadingState] = useRecoilState(loadingAddCoinDialog);
    const { mutation } = coinListItemGroupHook();
    let timer:null | NodeJS.Timeout = null;

    const setListItemFilterInput = useSetRecoilState(coinListFilterInput)

    const changeListItemFilterInput = (e: React.FormEvent<HTMLInputElement>) => {
        let eventTarget = e;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function() {
            setListItemFilterInput(eventTarget.target.value);
        }, 300);
    }
    
    const [modalValues, setModalValues] = useState<TaddWalletItem>({
        ticker: '',
        market: '',
        price: 0,
        ea: 0,
        date: '',
        convertPrice: 0
    });

    const changeDialogState = () => {
        setCoinDialogState({
            'state': !coinDialogState.state
        })
    }
    
    const modalConfirmAction = async() => {
        setCoinDialogLoadingState({
            loading: true
        });
        try {
            await mutation.mutate({
                ...modalValues,
                'ticker': coinDialogState.ticker,
            })
        } catch(e) {
            console.log(e);
        }
        setCoinDialogLoadingState({
            loading: false
        });
        changeDialogState();
    }

    const onChangeModalInput = (e:React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setModalValues({
            ...modalValues,
            [e.currentTarget.name]: value
        });
    }

    return (
        <S.Wrap>
            <Input
                type="text"
                onChange={changeListItemFilterInput}
                placeholder="INSERT TICKER"
                css={
                    {
                        'padding': '10px',
                        'margin-bottom': '1.5rem',
                        'border': '1px solid rgb(236, 239, 241)',
                        'font-size': '1rem',
                        'background': '#fff'
                    }
                }
            />
            <S.CoinListGroupWrap>
                {children}
            </S.CoinListGroupWrap>
            <Modal modalConfirmAction={modalConfirmAction} changeDialogState={changeDialogState} visible={coinDialogState.state} hasBottomBtn={true} hasTitle={coinDialogState.ticker} btnLoading={coinDialogLoadingState.loading}>
                <div>
                    <Label>
                        <span>마켓</span>
                        <div>
                            <Input type="text" name="market" onChange={onChangeModalInput} value={modalValues.market}/>
                        </div>
                    </Label>
                </div>
                <div>
                    <Label>
                        <span>코인당 가격</span>
                        <Input type="number" name="price" onChange={onChangeModalInput} value={modalValues.price}/>
                    </Label>
                </div>
                <div>
                    <Label>
                        <span>수량</span>
                        <Input type={"number"} name={"ea"} onChange={onChangeModalInput} value={modalValues.ea}/>
                    </Label>
                </div>
                <div>
                    <Label>
                        <span>날짜</span>
                        <Input type={"text"} name={"date"} onChange={onChangeModalInput} value={modalValues.date}/>
                    </Label>
                </div>
            </Modal>
        </S.Wrap>
        
    )
}

export default CoinListItemGroup