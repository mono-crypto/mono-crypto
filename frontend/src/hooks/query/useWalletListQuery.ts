import { useQuery, useMutation } from 'react-query'
import { getWalletList } from '@/lib/api/wallet/getWalletList'
import { addWalletList } from '@/lib/api/wallet/addWalletList'

import { addWalletItem as TaddWalletItem } from '@/lib/api/types'
 
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