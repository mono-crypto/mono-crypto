import { useQuery } from 'react-query'
import { getAllExchangeInfo } from '@/lib/api/exchangeInfo/getExchangeInfo'
 
export function useExchangeInfoQuery() {
  return useQuery('allExchangeInfo', getAllExchangeInfo)
}