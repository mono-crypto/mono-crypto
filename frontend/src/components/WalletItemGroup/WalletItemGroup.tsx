import React from 'react'

import Modal from '@/components/common/Modal'
import Input from '@/components/common/Input'
import Label from '@/components/common/Label'
import * as S from './styles'

import { walletItemGroupHook } from '@/hooks/walletItemGroupHook'

interface WalletItemGroupProps {
    children: React.ReactNode
}

function WalletItemGroup({children}: WalletItemGroupProps) {
    const {
        updateWalletItemMutation,
        updateWalletDialog,
        setUpdateWalletDialog,
        updateWalletDialogDisplay,
        setUpdateWalletDialogDisplay,
        updateWalletDialogLoading,
        setUpdateWalletDialogLoading
    } = walletItemGroupHook();
    
    const onChangeModalInput = (e:React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;

        setUpdateWalletDialog({
            ...updateWalletDialog,
            [e.currentTarget.name]: value
        })
    }

    const changeDialogState = (flag:boolean) => {
        setUpdateWalletDialogDisplay({
            'state': !updateWalletDialogDisplay.state
        })
    }

    const modalConfirmAction = () => {
        updateWalletItemMutation.mutate({
            _id: updateWalletDialog._id,
            ea: updateWalletDialog.ea,
            price: updateWalletDialog.price,
            date: updateWalletDialog.date
        })
        changeDialogState(false)
    }

    const inputCSS = {
        padding: '0.4rem 0.8rem',
    }
    const buttonCSS = {
        padding: '0.3rem 0'
    }

    return (
        <>
            <div>
                {children}
            </div>
            <Modal
                modalConfirmAction={modalConfirmAction}
                changeDialogState={changeDialogState}
                visible={updateWalletDialogDisplay.state}
                hasBottomBtn={true}
                hasTitle={updateWalletDialog.ticker}
                btnLoading={updateWalletDialogLoading.loading}
                buttonCSS={buttonCSS}
            >
                <S.LabelWrap>
                    <Label>
                        <span>마켓</span>
                        <Input type="text" name="market" onChange={onChangeModalInput} value={updateWalletDialog.market} css={inputCSS}/>
                    </Label>
                </S.LabelWrap>
                <S.LabelWrap>
                    <Label>
                        <span>코인당 가격</span>
                        <Input type="text" name="price" onChange={onChangeModalInput} value={updateWalletDialog.price} css={inputCSS}/>
                    </Label>
                </S.LabelWrap>
                <S.LabelWrap>
                    <Label>
                        <span>수량</span>
                        <Input type="text" name="ea" onChange={onChangeModalInput} value={updateWalletDialog.ea} css={inputCSS}/>
                    </Label>
                </S.LabelWrap>
                <S.LabelWrap>
                    <Label>
                        <span>날짜</span>
                        <Input type="text" name="date" onChange={onChangeModalInput} value={updateWalletDialog.date} css={inputCSS}/>
                    </Label>
                </S.LabelWrap>
            </Modal>
        </>
    )
}

export default WalletItemGroup