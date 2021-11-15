import { useQuery } from 'react-query'
import { getWalletItemHistory } from '@/lib/api/wallet/getWalletItemHistory'
import { User } from '@/lib/api/types'
 
export function useWalletItemHistory(user: User, ticker: string) {
  return useQuery(['walletItemHistory', ticker], () => getWalletItemHistory({
    user,
    ticker
  }), {
    staleTime: (1000 * 60) * 5,
    enabled: ticker ? true : false
  })
}