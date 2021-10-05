import { useMutation, useQueryClient } from 'react-query'
import { addWalletList as AaddWalletItem } from '@/lib/api/wallet/addWalletList'
import { addWalletItem as TaddWalletItem } from '@/lib/api/types'

export function coinListItemGroupHook() {
    const queryClient = useQueryClient() 
    const mutation = useMutation((addWalletItemData:TaddWalletItem) => AaddWalletItem(addWalletItemData), {
        onSuccess: () => {
            queryClient.invalidateQueries('walletList')
        }
    })

    return {
        mutation: mutation,
    }
}