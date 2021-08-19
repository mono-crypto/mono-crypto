import React, { useState } from 'react'

import Input from '@/components/common/Input'
import Label from '@/components/common/Label'

import Modal from '@/components/common/Modal'

import { useRecoilState } from 'recoil'
import { addCoinDialogState, loadingAddCoinDialog } from '@/atoms/addCoinDialog'

import { addWalletList } from '@/lib/api/wallet/addWalletList'
import { addWalletItem as TaddWalletItem } from '@/lib/api/types'

import { walletListHook } from '@/hooks/walletListhook'

interface CoinListItemGroupProps {
    children: React.ReactNode
}

function CoinListItemGroup({children}: CoinListItemGroupProps) {
    const [coinDialogState, setCoinDialogState] = useRecoilState(addCoinDialogState);
    const [coinDialogLoadingState, setCoinDialogLoadingState] = useRecoilState(loadingAddCoinDialog);

    const [modalValues, setModalValues] = useState<TaddWalletItem>({
        ticker: '',
        market: '',
        price: 0,
        date: '',
        convertPrice: 0
    });

    const { addWalletListMuation } = walletListHook();

    const changeDialogState = () => {
        setCoinDialogState({
            'state': !coinDialogState.state
        })
    }
    
    const modalConfirmAction = async() => {
        console.log(coinDialogLoadingState)
        setCoinDialogLoadingState({
            loading: true
        });
        try {
            const addWalletListResult = await addWalletList({
                ...modalValues,
                'ticker': coinDialogState.ticker,
            });
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
        <>
            <div>
                {children}
            </div>
            <Modal modalConfirmAction={modalConfirmAction} changeDialogState={changeDialogState} visible={coinDialogState.state} hasBottomBtn={true} hasTitle={coinDialogState.ticker} btnLoading={coinDialogLoadingState.loading}>
                <div>
                    <Label>
                        <span>마켓</span>
                        <div>
                            <Input type="text" name="market" onChange={onChangeModalInput} value=""/>
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
                        <Input type="number" name="ea" onChange={onChangeModalInput} value=""/>
                    </Label>
                </div>
                <div>
                    <Label>
                        <span>날짜</span>
                        <Input type="text" name="date" onChange={onChangeModalInput} value={modalValues.date}/>
                    </Label>
                </div>
            </Modal>
        </>
        
    )
}

export default CoinListItemGroup