import { useQuery } from 'react-query'
import { getWalletList } from '@/lib/api/wallet/getWalletList'
import { User } from '@/lib/api/types'
 
export function useWalletListQuery(id: number | undefined, key?: User | null) {

  return useQuery(['walletList', key], () => getWalletList(id))
}