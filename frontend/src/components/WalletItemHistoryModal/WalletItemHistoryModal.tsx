import React, { useCallback } from 'react'

import Modal from '@/components/common/Modal'
import Button from '@/components/common/Button'
import * as S from './styles'

import { walletItemGroupHook } from '@/hooks/walletItemGroupHook'
import { useWalletItemHistory } from '@/hooks/query/useWalletItemHistory'
import { getAuthState } from '@/atoms/authState'
import { getHistoryTicker, useHistory, useHistoryVisible } from '@/atoms/walletItemHistoryState'

const inputCSS = {
    padding: '0.4rem 0.8rem',
}
const buttonCSS = {
    padding: '0.3rem 0'
}

function WalletItemModal() {
    console.log('WalletItemModal render')
    const {
        updateWalletDialogDisplay,
        setUpdateWalletDialogDisplay,
        deleteWalletTransactionMutation
    } = walletItemGroupHook();

    const user = getAuthState()
    const ticker = getHistoryTicker()
    const [history, setHistory] = useHistory();
    const [visible, setHistoryVisible] = useHistoryVisible();

    
    const { isLoading: loading, data: historyData } = useWalletItemHistory(user, ticker)

    const changeDialogState = useCallback(() => {
        setHistoryVisible(!visible)
    }, [visible])

    const openUpdateDialog = () => {
        setUpdateWalletDialogDisplay({
            state: true
        })
    }

    const transactionUpdate = (id:string) => {
        
    }

    const transactionDelete = (id:string) => {
        deleteWalletTransactionMutation.mutate({
            access_token: user?.access_token,
            _id: id
        })
    }

    return (
      <>
        <Modal
            changeDialogState={changeDialogState}
            visible={visible}
            hasBottomBtn={false}
            hasTitle={ticker+" 트랜잭션내역"}
            width="100%"
            maxWidth="80%"
            hasCloseButton={true}
        >
            {loading ? '... loading' : historyData?.map((item, index) => {
                console.log('historyData: ', item)
                return (
                    <S.ListItem key={index}>
                        <div>{item.market} / {item.price} / {item.ea} / {new Date(item.date).toLocaleDateString()}</div>
                        <S.ListItemButtonWrap>
                            <Button onClick={openUpdateDialog}>수정</Button>
                            <Button onClick={() => transactionDelete(item._id)}>삭제</Button>
                        </S.ListItemButtonWrap>
                    </S.ListItem>
                )
            })}
        </Modal>
      </>
  )
}

export default WalletItemModal
