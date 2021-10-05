import { useRecoilState } from 'recoil';

import { useMutation, useQueryClient } from 'react-query'
import { deleteWalletItem as AdeleteWalletItem } from '@/lib/api/wallet/deleteWalletItem'

import { updateWalletDialogDisplayState, updateWalletDialogState } from '@/atoms/updateWalletItemDialog';

export function walletItemHook() {
    const [updateWalletDialog, setUpdateWalletDialog] = useRecoilState(updateWalletDialogState);
    const [updateWalletDialogDisplay, setUpdateWalletDialogDisplay] = useRecoilState(updateWalletDialogDisplayState);

    const queryClient = useQueryClient() 
    const deleteWalletItemMutation = useMutation(deleteWalletId => AdeleteWalletItem(deleteWalletId), {
        onSuccess: () => {
            queryClient.invalidateQueries('walletList')
        }
    })

    return {
        deleteWalletItemMutation: deleteWalletItemMutation,
        updateWalletDialogState: updateWalletDialog,
        updateWalletDialogDisplay: updateWalletDialogDisplay,
        setUpdateWalletDialogDisplay: setUpdateWalletDialogDisplay,
        setUpdateWalletDialogState: setUpdateWalletDialog
    }
}