import { useQuery, useMutation } from 'react-query'
import { getWalletList } from '@/lib/api/wallet/getWalletList'
import { deleteWalletItem } from '@/lib/api/wallet/deleteWalletItem'
import { addWalletList } from '@/lib/api/wallet/addWalletList'

import { addWalletItem as TaddWalletItem } from '@/lib/api/types'
import { useCallback } from 'react'
 
export function useWalletListQuery() {
  return useQuery('walletList', getWalletList)
}

export function addWalletListQuery() {
  return useMutation((params:TaddWalletItem) => addWalletList(params), {
    onMutate: async params => {
      setText('')
      await queryClient.cancelQueries('todos')

      const previousValue = queryClient.getQueryData('todos')

      queryClient.setQueryData('todos', old => ({
        ...old,
        items: [...old.items, text],
      }))

      return previousValue
    },
    // On failure, roll back to the previous value
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData('todos', previousValue),
    // After success or failure, refetch the todos query
    onSettled: () => {
      queryClient.invalidateQueries('todos')
    },
  })
}

export function deleteWalletListQuery(walletItemId:string) {
  
  // return useMutation(newWalletList => deleteWalletItem(walletItemId))

  // const handleSubmit = useCallback(
  //     (walletList) => {
  //         console.log(walletList)
  //         mutation.mutate(walletList)
  //     },
  //     [mutation],
  // )

  return {

  }
}