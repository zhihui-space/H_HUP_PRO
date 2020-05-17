<template>
  <div :class="className" :style="{height:height,width:width,zoom: zoom}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

const animationDuration = 6000

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    zoom: {
      type: String,
      default: '133%'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  created() {
    // if (window.screen.width=='1366') {
    //   this.zoom.default = '133%'
    // } else if (window.screen.width=='1360') {
    //   this.zoom.default = '133%'
    // } else if (window.screen.width=='1440') {
    //   this.zoom.default = '117%'
    // }
  },
  mounted() {
    this.initChart()
    let optionSetting = {
      width: 800,
      height: 200,
    }
    // this.chart.resize(optionSetting)
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '一类',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [79, 52, 200, 334, 390, 330, 220],
          animationDuration
        }, {
          name: '二类',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [80, 52, 200, 334, 390, 330, 220],
          animationDuration
        }, {
          name: '三类',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [30, 52, 200, 334, 390, 330, 220],
          animationDuration
        }]
      })
    }
  }
}
</script>
