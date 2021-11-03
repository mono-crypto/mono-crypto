import { useQuery } from 'react-query'
import { getWalletItemHistory } from '@/lib/api/wallet/getWalletItemHistory'
import { User } from '@/lib/api/types'
 
export function useWalletItemHistory(user: User, ticker: string) {
  return useQuery(['walletItemHistory', user, ticker], () => getWalletItemHistory({
      user,
      ticker
  }), {
      enabled: ticker ? true : false
  })
}