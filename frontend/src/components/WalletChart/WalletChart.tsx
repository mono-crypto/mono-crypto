import React, { useCallback, useState } from 'react'

import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import { PieChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

import { useRecoilState } from 'recoil'

import styled from 'styled-components'
import { walletItemList } from '@/atoms/walletListState'

import Button from '@/components/common/Button'

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonCSS = {
  'line-height': '1',
  'padding': '0.6rem 0.5rem 0.5rem 0.5rem',
  'width': '20%',
  'font-size': '1rem'
  // 'box-shadow': '0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)'
}

const ButtonHoverCSS = {
  'background-color': 'rgb(0 0 0 / 20%)'
}

echarts.use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer])

function WalletChart() {
  const [walletItemListData,] = useRecoilState(walletItemList)
  
  const [chartFlag, setChartFlag] = useState(true)
  const changeChartMode = () => {
    setChartFlag(!chartFlag)
  }

  const chartData = useCallback(() => {
    const data = walletItemListData?.map(item => {
      return { value: item.ea, name: item.ticker}
    })

    return data
  }, [walletItemListData])
  
  const chartAssetData = useCallback(() => {
    const data = walletItemListData?.map(item => {
      return { value: item.totalPrice.reduce((prev:number, cur:number) => prev+cur), name: item.ticker}
    })

    return data
  }, [walletItemListData])

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
        data: chartData(),
        minAngle: 10
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
        data: chartAssetData(),
        minAngle: 10
      }
    ]
  }

  if(walletItemListData.length > 0) {
    return (
      <>
        <ButtonWrap>
          <Button onClick={changeChartMode} css={ButtonCSS} hoverCSS={ButtonHoverCSS}>
            {chartFlag === true ? '자산비중으로 보기' : '보유비중으로 보기'}
          </Button>
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
