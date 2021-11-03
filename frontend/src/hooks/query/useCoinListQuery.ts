import { useQuery } from 'react-query'
import { getCoinList } from '@/lib/api/coin/getCoinList'
 
export default function useCoinListQuery() {
  return useQuery('coinList', getCoinList, {
    staleTime: (1000 * 60) * 5
  })
}