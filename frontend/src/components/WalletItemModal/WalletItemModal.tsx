import React, { useCallback } from 'react'

import Modal from '@/components/common/Modal'
import Input from '@/components/common/Input'
import Label from '@/components/common/Label'
import * as S from './styles'

import { walletItemGroupHook } from '@/hooks/walletItemGroupHook'

const inputCSS = {
    padding: '0.4rem 0.8rem',
}
const buttonCSS = {
    padding: '0.3rem 0'
}

function WalletItemModal() {
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

    const changeDialogState = useCallback(() => {
        setUpdateWalletDialogDisplay({
            'state': !updateWalletDialogDisplay.state
        })
    }, [updateWalletDialogDisplay])
    

    const modalConfirmAction = useCallback(() => {
        updateWalletItemMutation.mutate({
            _id: updateWalletDialog._id,
            ea: updateWalletDialog.ea,
            price: updateWalletDialog.price,
            date: updateWalletDialog.date
        })
        changeDialogState()
    }, [updateWalletDialog])

    return (
      <>
        <Modal
            modalConfirmAction={modalConfirmAction}
            changeDialogState={changeDialogState}
            visible={updateWalletDialogDisplay.state}
            hasBottomBtn={false}
            hasTitle="내역"
            btnLoading={updateWalletDialogLoading.loading}
            width="100%"
            maxWidth="80%"
        >
            list
        </Modal>
      </>
  )
}

export default WalletItemModal
