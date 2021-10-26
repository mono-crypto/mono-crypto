import React, { useState } from 'react'

import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import { PieChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

import { useRecoilState } from 'recoil'

import styled from 'styled-components'
import { walletItemList } from '@/atoms/walletListState'

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
`;

echarts.use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer])

function WalletChart() {
  console.log('Walletchart')
  const [walletItemListData,] = useRecoilState(walletItemList)
  
  const [chartFlag, setChartFlag] = useState(true)
  const changeChartMode = () => {
    setChartFlag(!chartFlag)
  }
  const chartData = () => {
    return walletItemListData ? walletItemListData.map(item => {
      return { value: item.ea, name: item.ticker}
    }) : []
  }

  let option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: '보유비중',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: chartData()
      }
    ]
  }
  let assetOption = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: '자산비중',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: []
      }
    ]
  }

  if(walletItemListData.length > 0) {
    return (
      <>
        <ButtonWrap>
          <button onClick={changeChartMode}>
            {chartFlag === true ? '자산비중으로 보기' : '보유비중으로 보기'}
          </button>
        </ButtonWrap>
        {
          chartFlag ?
          <ReactEChartsCore
            echarts={echarts}
            option={option}
            notMerge={true}
            lazyUpdate={true}
          /> :
          <ReactEChartsCore
            echarts={echarts}
            option={assetOption}
            notMerge={true}
            lazyUpdate={true}
          />
        }
      </>
    )
  } else {
    return (
      <>
      </>
    )
  }
}

export default WalletChart
