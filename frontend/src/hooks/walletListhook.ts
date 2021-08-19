import { useCallback } from 'react'
import { addWalletListQuery } from '@/hooks/query/useWalletListQuery'

import { addWalletItem as TaddWalletItem } from '@/lib/api/types'

export function walletListHook() {
    const mutation = addWalletListQuery();

    const addWalletListMuation = useCallback(
        (walletItem:TaddWalletItem) => {
          mutation.mutate(walletItem)
        },
        [mutation],
    )

    return {
        addWalletListMuation
    }
}