import React, { useCallback, useEffect } from 'react'

import Modal from '@/components/common/Modal'
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
        >
            {loading ? '... loading' : historyData?.map((item, index) => {
                return (
                    <div style={
                        {'display': 'flex'}
                    } key={index}>
                        <div>{item.market} / {item.price} / {item.ea} / {item.date}</div>
                        <div>
                            <button>수정</button>
                            <button>삭제</button>
                        </div>
                    </div>
                )
            })}
        </Modal>
      </>
  )
}

export default WalletItemModal
