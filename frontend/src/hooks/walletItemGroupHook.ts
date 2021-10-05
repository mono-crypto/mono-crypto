import { useRecoilState } from 'recoil'
import { useMutation, useQueryClient } from 'react-query'

import { updateWalletDialogState, updateWalletDialogDisplayState, loadingUpdateWalletDialog } from '@/atoms/updateWalletItemDialog'

import { updateWalletItem as PupdateWalletItem } from '@/lib/api/wallet/updateWalletItem';
import { updateWalletItem as TupdateWalletItem } from '@/lib/api/types'


export function walletItemGroupHook() {
    const [updateWalletDialog, setUpdateWalletDialog] = useRecoilState(updateWalletDialogState);
    const [updateWalletDialogDisplay, setUpdateWalletDialogDisplay] = useRecoilState(updateWalletDialogDisplayState);
    const [updateWalletDialogLoading, setUpdateWalletDialogLoading] = useRecoilState(loadingUpdateWalletDialog);

    const queryClient = useQueryClient() 
    const updateWalletItemMutation = useMutation((updateWalletObject:TupdateWalletItem) => PupdateWalletItem(updateWalletObject), {
        onSuccess: () => {
            queryClient.invalidateQueries('walletList')
        }
    })

    return {
        updateWalletItemMutation: updateWalletItemMutation,
        updateWalletDialog: updateWalletDialog,
        setUpdateWalletDialog: setUpdateWalletDialog,
        updateWalletDialogDisplay: updateWalletDialogDisplay,
        setUpdateWalletDialogDisplay: setUpdateWalletDialogDisplay,
        updateWalletDialogLoading: updateWalletDialogLoading,
        setUpdateWalletDialogLoading: setUpdateWalletDialogLoading,
    }
}