import React from 'react'

import CoinListFilterInput from '@/components/CoinListFilterInput'

import { useRecoilState, useRecoilValue } from 'recoil'

import { coinListFilterInput, coinListFilter } from '@/atoms/coinListState'

import { CoinListItem as TCoinListItem } from '@/lib/api/types'

import * as S from './styles'

import CoinListItem from '../CoinListItem'
import CoinListModal from '../CoinListModal'

function CoinListItemGroup() {
    console.log('CoinListItemGroup')
    const filteringList = useRecoilValue(coinListFilter)

    const mapToCoinListItem = (data:TCoinListItem[]) => {
        return (
            <S.CoinListGroupWrap>
                { data.map((item,index) => (<CoinListItem key={index} data={item} />))}
            </S.CoinListGroupWrap>
        )
    }

    return (
        <S.Wrap>
            <CoinListFilterInput/>
            {mapToCoinListItem(filteringList)}
            <CoinListModal />
        </S.Wrap>
        
    )
}

export default CoinListItemGroup