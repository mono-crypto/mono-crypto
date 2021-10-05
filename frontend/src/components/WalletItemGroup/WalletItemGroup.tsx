import React from 'react'

import Modal from '@/components/common/Modal'
import Input from '@/components/common/Input'
import Label from '@/components/common/Label'

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

    return (
        <>
            <div>
                {children}
            </div>
            <Modal modalConfirmAction={modalConfirmAction} changeDialogState={changeDialogState} visible={updateWalletDialogDisplay.state} hasBottomBtn={true} hasTitle={updateWalletDialog.ticker} btnLoading={updateWalletDialogLoading.loading}>
                <div>
                    <Label>
                        <span>마켓</span>
                        <Input type="text" name="market" onChange={onChangeModalInput} value={updateWalletDialog.market}/>
                    </Label>
                </div>
                <div>
                    <Label>
                        <span>코인당 가격</span>
                        <Input type="number" name="price" onChange={onChangeModalInput} value={updateWalletDialog.price}/>
                    </Label>
                </div>
                <div>
                    <Label>
                        <span>수량</span>
                        <Input type="number" name="ea" onChange={onChangeModalInput} value={updateWalletDialog.ea}/>
                    </Label>
                </div>
                <div>
                    <Label>
                        <span>날짜</span>
                        <Input type="text" name="date" onChange={onChangeModalInput} value={updateWalletDialog.date}/>
                    </Label>
                </div>
            </Modal>
        </>
    )
}

export default WalletItemGroup