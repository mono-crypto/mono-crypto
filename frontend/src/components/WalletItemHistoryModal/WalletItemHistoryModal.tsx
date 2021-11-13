import React, { useCallback, useEffect } from 'react'

import Modal from '@/components/common/Modal'
import Button from '@/components/common/Button'
import * as S from './styles'

import { walletItemGroupHook } from '@/hooks/walletItemGroupHook'
import { useWalletItemHistory } from '@/hooks/query/useWalletItemHistory'
import { getAuthState } from '@/atoms/authState'
import { getHistoryTicker, useHistory } from '@/atoms/walletItemHistoryState'

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
    } = walletItemGroupHook();

    const user = getAuthState()
    const ticker = getHistoryTicker()
    const [history, setHistory] = useHistory();

    
    const { isLoading: loading, data: historyData } = useWalletItemHistory(user, ticker)
    // console.log("historyData: ", historyData)
    // useEffect(() => {
    //     if(historyData) {
    //         setHistory({
    //             ...history,
    //             [ticker]: [...historyData]
    
    //         })
    //     }
    // }, [historyData])

    const changeDialogState = useCallback(() => {
        setUpdateWalletDialogDisplay({
            'state': !updateWalletDialogDisplay.state
        })
    }, [updateWalletDialogDisplay])

    return (
      <>
        <Modal
            changeDialogState={changeDialogState}
            visible={updateWalletDialogDisplay.state}
            hasBottomBtn={false}
            hasTitle={ticker+" 트랜잭션내역"}
            width="100%"
            maxWidth="80%"
            hasCloseButton={true}
        >
            {loading ? '... loading' : historyData?.map((item, index) => {
                return (
                    <S.ListItem key={index}>
                        <div>{item.market} / {item.price} / {item.ea} / {new Date(item.date).toLocaleDateString()}</div>
                        <S.ListItemButtonWrap>
                            <Button>수정</Button>
                            <Button>삭제</Button>
                        </S.ListItemButtonWrap>
                    </S.ListItem>
                )
            })}
        </Modal>
      </>
  )
}

export default WalletItemModal
