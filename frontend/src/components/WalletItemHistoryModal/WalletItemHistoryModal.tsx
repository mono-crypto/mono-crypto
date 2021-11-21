import React, { useCallback, useEffect } from 'react'

import Modal from '@/components/common/Modal'
import Button from '@/components/common/Button'
import * as S from './styles'

import { walletItemGroupHook } from '@/hooks/walletItemGroupHook'
import { useWalletItemHistory } from '@/hooks/query/useWalletItemHistory'
import { getAuthState } from '@/atoms/authState'
import { getHistoryTicker, useHistory, useHistoryVisible } from '@/atoms/walletItemHistoryState'

import { useAddCoinModalStateSelector } from '@/atoms/addCoinDialog'

import dateFormat from '@/lib/validation/dateFormat'
const buttonCSS = {
    padding: '0.3rem 1rem'
}

const ButtonHoverCSS = {
    'background-color': 'rgb(0 0 0 / 20%)'
}

function WalletItemHistoryModal() {
    console.log('WalletItemHistoryModal render')
    const {
        updateWalletDialogDisplay,
        setUpdateWalletDialogDisplay,
        deleteWalletTransactionMutation
    } = walletItemGroupHook();

    const [dialogState, setDialogState] = useAddCoinModalStateSelector();
    const user = getAuthState()
    const ticker = getHistoryTicker()
    const [history, setHistory] = useHistory();
    const [visible, setHistoryVisible] = useHistoryVisible();
    
    const { isLoading: loading, data: historyData } = useWalletItemHistory(user, ticker)
    
    const openModifyDialog = (selectData) => {
        setDialogState({
            _id: selectData._id,
            price: selectData.price,
            date: selectData.date,
            ea: selectData.ea,
            ticker: selectData.ticker,
            market: selectData.market,
            visible: true
        })
    }
    const changeDialogState = useCallback(() => {
        setHistoryVisible(!visible)
    }, [visible])

    const transactionDelete = (id: string, ticker: string) => {
        deleteWalletTransactionMutation.mutate({
            access_token: user?.access_token,
            _id: id,
            ticker: ticker
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
            {loading ? '... loading' : historyData?.map((item, index:number) => {
                return (
                    <S.ListItem key={index}>
                        <div>{item.market} / {item.price} / {item.ea} / {new Date(item.date).toLocaleDateString()}</div>
                        <S.ListItemButtonWrap>
                            <Button onClick={() => openModifyDialog(item)} css={buttonCSS} hoverCSS={ButtonHoverCSS}>수정</Button>
                            <Button onClick={() => transactionDelete(item._id, item.ticker)} css={buttonCSS} hoverCSS={ButtonHoverCSS}>삭제</Button>
                        </S.ListItemButtonWrap>
                    </S.ListItem>
                )
            })}
        </Modal>
      </>
  )
}

export default WalletItemHistoryModal
