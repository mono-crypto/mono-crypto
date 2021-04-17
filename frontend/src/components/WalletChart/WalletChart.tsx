import React from 'react'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import { PieChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer])

function WalletChart() {
  const option = {
    tooltip: {
      trigger: 'item'
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
        data: [
          { value: 199.8 * 3235, name: 'OGN' },
          { value: 79.92 * 7033, name: 'XTZ' },
          { value: 368383, name: 'WRX' },
          { value: 245700, name: 'FIL' },
          { value: 187233, name: 'MLK' },
          { value: 186000, name: 'PUNDIX' },
          { value: 55867, name: 'TRX' },
          { value: 28368 + 8581, name: 'etc' }
        ]
      }
    ]
  }
  return <ReactEChartsCore echarts={echarts} option={option} notMerge={true} lazyUpdate={true} />
}

export default WalletChart
