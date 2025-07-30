<template>
  <div>
    <div style="text-align: center; font-size: 18px; font-weight: bold; margin-bottom: 20px;">
      戊水光伏电站电量统计表
    </div>
    <div style="margin-bottom: 10px;">
      <vxe-button @click="loadData">加载数据</vxe-button>
      <vxe-button @click="exportExcel">导出Excel</vxe-button>
      <vxe-button @click="exportCSV">导出CSV</vxe-button>
    </div>
    <vxe-table
      ref="tableRef"
      border
      show-overflow
      height="800"
      :loading="loading"
      :merge-cells="mergeCells"
      :column-config="columnConfig"
      :edit-config="editConfig"
      :mouse-config="mouseConfig"
      :keyboard-config="keyboardConfig"
      :virtual-y-config="virtualYConfig">
      
      <!-- 基础信息列 -->
      <vxe-column field="area" title="区域" width="100" fixed="left"></vxe-column>
      <vxe-column field="weather" title="天气" width="150" fixed="left"></vxe-column>
      
      <!-- 光伏系统发电 -->
      <vxe-colgroup title="光伏系统发电">
        <vxe-colgroup title="箱变表底正向有功总">
          <vxe-column field="north_box_forward" title="北区-箱变表底正向有功总" width="120" :edit-render="{ name: 'VxeInput' }"></vxe-column>
          <vxe-column field="south_box_forward" title="南区-箱变表底正向有功总" width="120" :edit-render="{ name: 'VxeInput' }"></vxe-column>
        </vxe-colgroup>
        <vxe-colgroup title="发电量（度）">
          <vxe-column field="north_generation" title="北区发电量（度）" width="120" :edit-render="{ name: 'VxeInput' }"></vxe-column>
          <vxe-column field="south_generation" title="南区发电量（度）" width="120" :edit-render="{ name: 'VxeInput' }"></vxe-column>
          <vxe-column field="total_generation" title="两区合计发电量（度）" width="120" :edit-render="{ name: 'VxeInput' }"></vxe-column>
        </vxe-colgroup>
        <vxe-colgroup title="发电效率（度/kw）">
          <vxe-column field="north_efficiency" title="北区发电效率（度/kw）" width="120" :edit-render="{ name: 'VxeInput' }"></vxe-column>
          <vxe-column field="south_efficiency" title="南区发电效率（度/kw）" width="120" :edit-render="{ name: 'VxeInput' }"></vxe-column>
          <vxe-column field="total_efficiency" title="两区合计发电效率（度/kw）" width="120" :edit-render="{ name: 'VxeInput' }"></vxe-column>
        </vxe-colgroup>
      </vxe-colgroup>
      
      <!-- 光伏系统上网电量 -->
      <vxe-colgroup title="光伏系统上网电量">
        <vxe-colgroup title="北区高压室">
          <vxe-column field="north_weiyang_reverse" title="北区高压室未央上网表底反向有功总" width="120" :edit-render="{ name: 'VxeInput' }"></vxe-column>
          <vxe-column field="north_xingyuan_reverse" title="北区高压室杏园上网表底反向有功总" width="120" :edit-render="{ name: 'VxeInput' }"></vxe-column>
          <vxe-column field="north_high_voltage" title="北区高压室电量（度）" width="120" :edit-render="{ name: 'VxeInput' }"></vxe-column>
        </vxe-colgroup>
        <vxe-colgroup title="南区高压室">
          <vxe-column field="south_weiyang_reverse" title="南区高压室未央上网表底反向有功总" width="120" :edit-render="{ name: 'VxeInput' }"></vxe-column>
          <vxe-column field="south_xingyuan_reverse" title="南区高压室杏园上网表底反向有功总" width="120" :edit-render="{ name: 'VxeInput' }"></vxe-column>
          <vxe-column field="south_high_voltage" title="南区高压室电量（度）" width="120" :edit-render="{ name: 'VxeInput' }"></vxe-column>
        </vxe-colgroup>
        <vxe-column field="total_high_voltage" title="两区高压室合计电量（度）" width="120" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      </vxe-colgroup>
      
      <!-- 光伏系统消耗电量 -->
      <vxe-colgroup title="光伏系统消耗电量">
        <vxe-colgroup title="箱变表底反向有功总">
          <vxe-column field="north_box_reverse" title="北区箱变表底反向有功总" width="120" :edit-render="{ name: 'VxeInput' }"></vxe-column>
          <vxe-column field="south_box_reverse" title="南区箱变表底反向有功总" width="120" :edit-render="{ name: 'VxeInput' }"></vxe-column>
        </vxe-colgroup>
        <vxe-colgroup title="光伏系统消耗电量（度）">
          <vxe-column field="north_consumption" title="北区光伏系统消耗电量（度）" width="120" :edit-render="{ name: 'VxeInput' }"></vxe-column>
          <vxe-column field="south_consumption" title="南区光伏系统消耗电量（度）" width="120" :edit-render="{ name: 'VxeInput' }"></vxe-column>
          <vxe-column field="total_consumption" title="合计光伏系统消耗电量（度）" width="120" :edit-render="{ name: 'VxeInput' }"></vxe-column>
        </vxe-colgroup>
      </vxe-colgroup>
      
      <!-- 五厂消纳电量 -->
      <vxe-colgroup title="五厂消纳电量">
        <vxe-colgroup title="消纳电量（度）">
          <vxe-column field="north_absorption" title="北区消纳电量（度）" width="120" :edit-render="{ name: 'VxeInput' }"></vxe-column>
          <vxe-column field="south_absorption" title="南区消纳电量（度）" width="120" :edit-render="{ name: 'VxeInput' }"></vxe-column>
          <vxe-column field="total_absorption" title="合计消纳电量（度）" width="120" :edit-render="{ name: 'VxeInput' }"></vxe-column>
        </vxe-colgroup>
        <vxe-colgroup title="消纳率（%）">
          <vxe-column field="north_absorption_rate" title="北区消纳率（%）" width="120" :edit-render="{ name: 'VxeInput' }"></vxe-column>
          <vxe-column field="south_absorption_rate" title="南区消纳率（%）" width="120" :edit-render="{ name: 'VxeInput' }"></vxe-column>
          <vxe-column field="total_absorption_rate" title="合计消纳率（%）" width="120" :edit-render="{ name: 'VxeInput' }"></vxe-column>
        </vxe-colgroup>
      </vxe-colgroup>
      
      <!-- 备注 -->
      <vxe-column field="remarks" title="备注" width="200" fixed="right" :edit-render="{ name: 'VxeInput' }"></vxe-column>
    </vxe-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { VxeTableInstance, VxeTablePropTypes, VxeUI } from 'vxe-table'

interface RowVO {
  id: number
  area: string
  weather: string
  north_box_forward: number | string
  south_box_forward: number | string
  north_generation: number | string
  south_generation: number | string
  total_generation: number | string
  north_efficiency: number | string
  south_efficiency: number | string
  total_efficiency: number | string
  north_weiyang_reverse: number | string
  north_xingyuan_reverse: number | string
  north_high_voltage: number | string
  south_weiyang_reverse: number | string
  south_xingyuan_reverse: number | string
  south_high_voltage: number | string
  total_high_voltage: number | string
  north_box_reverse: number | string
  south_box_reverse: number | string
  north_consumption: number | string
  south_consumption: number | string
  total_consumption: number | string
  north_absorption: number | string
  south_absorption: number | string
  total_absorption: number | string
  north_absorption_rate: number | string
  south_absorption_rate: number | string
  total_absorption_rate: number | string
  remarks: string
}

const tableRef = ref<VxeTableInstance<RowVO>>()

const loading = ref(false)
const mergeCells = ref<VxeTablePropTypes.MergeCells<RowVO>>([])

const columnConfig = reactive<VxeTablePropTypes.ColumnConfig>({
  resizable: true
})

const mouseConfig = reactive<VxeTablePropTypes.MouseConfig>({
  area: true
})

const editConfig = reactive<VxeTablePropTypes.EditConfig>({
  mode: 'cell',
  trigger: 'dblclick'
})

const keyboardConfig = reactive<VxeTablePropTypes.KeyboardConfig>({
  arrowCursorLock: true,
  isClip: true,
  isArrow: true,
  isShift: true,
  isTab: true,
  isEnter: true,
  isEdit: true,
  isDel: true,
  isEsc: true,
  isFNR: true,
  isMerge: true
})

const virtualYConfig = reactive<VxeTablePropTypes.VirtualYConfig>({
  enabled: true,
  gt: 0
})

const loadData = () => {
  loading.value = true
  setTimeout(async () => {
    const list: RowVO[] = [
      {
        id: 0,
        area: '4月30日 19:40',
        weather: '',
        north_box_forward: 16.9597,
        south_box_forward: 35.4737,
        north_generation: 0,
        south_generation: 0,
        total_generation: 0,
        north_efficiency: 0,
        south_efficiency: 0,
        total_efficiency: 0,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0,
        south_weiyang_reverse: 0.17,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 0,
        total_high_voltage: 0,
        north_box_reverse: 0.1884,
        south_box_reverse: 0.2012,
        north_consumption: 0,
        south_consumption: 0,
        total_consumption: 0,
        north_absorption: 0,
        south_absorption: 0,
        total_absorption: 0,
        north_absorption_rate: 0,
        south_absorption_rate: 0,
        total_absorption_rate: 0,
        remarks: ''
      },
      {
        id: 1,
        area: '1日',
        weather: '晴(33℃）',
        north_box_forward: 18.9110,
        south_box_forward: 39.2805,
        north_generation: 7805.2,
        south_generation: 30454.4,
        total_generation: 38259.6,
        north_efficiency: 6.35,
        south_efficiency: 5.91,
        total_efficiency: 6.00,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0.00,
        south_weiyang_reverse: 0.17,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 0.00,
        total_high_voltage: 0.00,
        north_box_reverse: 0.2131,
        south_box_reverse: 0.2275,
        north_consumption: 98.80,
        south_consumption: 210.40,
        total_consumption: 309.20,
        north_absorption: 7706.4,
        south_absorption: 30244.0,
        total_absorption: 37950.4,
        north_absorption_rate: 98.73,
        south_absorption_rate: 99.31,
        total_absorption_rate: 99.19,
        remarks: '10:00 14#逆变器故障'
      },
      {
        id: 2,
        area: '2日',
        weather: '晴(21:00雨，37℃）',
        north_box_forward: 20.4764,
        south_box_forward: 42.3698,
        north_generation: 6261.6,
        south_generation: 24714.4,
        total_generation: 30976.0,
        north_efficiency: 5.09,
        south_efficiency: 4.80,
        total_efficiency: 4.86,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0.00,
        south_weiyang_reverse: 0.17,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 0.00,
        total_high_voltage: 0.00,
        north_box_reverse: 0.2263,
        south_box_reverse: 0.2416,
        north_consumption: 52.80,
        south_consumption: 112.80,
        total_consumption: 165.60,
        north_absorption: 6208.8,
        south_absorption: 24601.6,
        total_absorption: 30810.4,
        north_absorption_rate: 99.16,
        south_absorption_rate: 99.54,
        total_absorption_rate: 99.47,
        remarks: '10:20 7#逆变器故障'
      },
      {
        id: 3,
        area: '3日',
        weather: '晴（29℃）',
        north_box_forward: 22.0565,
        south_box_forward: 45.6481,
        north_generation: 6320.4,
        south_generation: 26226.4,
        total_generation: 32546.8,
        north_efficiency: 5.14,
        south_efficiency: 5.09,
        total_efficiency: 5.10,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0.00,
        south_weiyang_reverse: 0.18,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 120.00,
        total_high_voltage: 120.00,
        north_box_reverse: 0.2386,
        south_box_reverse: 0.2551,
        north_consumption: 49.20,
        south_consumption: 108.00,
        total_consumption: 157.20,
        north_absorption: 6271.2,
        south_absorption: 25998.4,
        total_absorption: 32269.6,
        north_absorption_rate: 99.22,
        south_absorption_rate: 99.13,
        total_absorption_rate: 99.15,
        remarks: ''
      },
      {
        id: 4,
        area: '4日',
        weather: '晴(20:00-21:00雨，30℃）',
        north_box_forward: 23.3764,
        south_box_forward: 48.0815,
        north_generation: 5279.6,
        south_generation: 19467.2,
        total_generation: 24746.8,
        north_efficiency: 4.29,
        south_efficiency: 3.78,
        total_efficiency: 3.88,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0.00,
        south_weiyang_reverse: 0.18,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 0.00,
        total_high_voltage: 0.00,
        north_box_reverse: 0.2519,
        south_box_reverse: 0.2695,
        north_consumption: 53.20,
        south_consumption: 115.20,
        total_consumption: 168.40,
        north_absorption: 5226.4,
        south_absorption: 19352.0,
        total_absorption: 24578.4,
        north_absorption_rate: 98.99,
        south_absorption_rate: 99.41,
        total_absorption_rate: 99.32,
        remarks: ''
      },
      {
        id: 5,
        area: '5日',
        weather: '沙尘（29℃）',
        north_box_forward: 24.6319,
        south_box_forward: 50.5868,
        north_generation: 5022.0,
        south_generation: 20042.4,
        total_generation: 25064.4,
        north_efficiency: 4.08,
        south_efficiency: 3.89,
        total_efficiency: 3.93,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0.00,
        south_weiyang_reverse: 0.18,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 0.00,
        total_high_voltage: 0.00,
        north_box_reverse: 0.2643,
        south_box_reverse: 0.2830,
        north_consumption: 49.60,
        south_consumption: 108.00,
        total_consumption: 157.60,
        north_absorption: 4972.4,
        south_absorption: 19934.4,
        total_absorption: 24906.8,
        north_absorption_rate: 99.01,
        south_absorption_rate: 99.46,
        total_absorption_rate: 99.37,
        remarks: ''
      },
      {
        id: 6,
        area: '6日',
        weather: '阴（28℃）',
        north_box_forward: 25.7483,
        south_box_forward: 53.0203,
        north_generation: 4465.6,
        south_generation: 19468.0,
        total_generation: 23933.6,
        north_efficiency: 3.63,
        south_efficiency: 3.78,
        total_efficiency: 3.75,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0.00,
        south_weiyang_reverse: 0.18,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 0.00,
        total_high_voltage: 0.00,
        north_box_reverse: 0.2763,
        south_box_reverse: 0.2962,
        north_consumption: 48.00,
        south_consumption: 105.60,
        total_consumption: 153.60,
        north_absorption: 4417.6,
        south_absorption: 19362.4,
        total_absorption: 23780.0,
        north_absorption_rate: 98.93,
        south_absorption_rate: 99.46,
        total_absorption_rate: 99.36,
        remarks: '16：00 7#逆变器恢复'
      },
      {
        id: 7,
        area: '7日',
        weather: '晴（30℃）',
        north_box_forward: 26.9656,
        south_box_forward: 55.8165,
        north_generation: 4869.2,
        south_generation: 22369.6,
        total_generation: 27238.8,
        north_efficiency: 3.96,
        south_efficiency: 4.34,
        total_efficiency: 4.27,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0.00,
        south_weiyang_reverse: 0.22,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 480.00,
        total_high_voltage: 480.00,
        north_box_reverse: 0.2902,
        south_box_reverse: 0.3111,
        north_consumption: 55.60,
        south_consumption: 119.20,
        total_consumption: 174.80,
        north_absorption: 4813.6,
        south_absorption: 21770.4,
        total_absorption: 26584.0,
        north_absorption_rate: 98.86,
        south_absorption_rate: 97.32,
        total_absorption_rate: 97.60,
        remarks: ''
      },
      {
        id: 8,
        area: '8日',
        weather: '霾（27℃）',
        north_box_forward: 28.0718,
        south_box_forward: 58.2702,
        north_generation: 4424.8,
        south_generation: 19629.6,
        total_generation: 24054.4,
        north_efficiency: 3.60,
        south_efficiency: 3.81,
        total_efficiency: 3.77,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0.00,
        south_weiyang_reverse: 0.22,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 0.00,
        total_high_voltage: 0.00,
        north_box_reverse: 0.3034,
        south_box_reverse: 0.3256,
        north_consumption: 52.80,
        south_consumption: 116.00,
        total_consumption: 168.80,
        north_absorption: 4372.0,
        south_absorption: 19513.6,
        total_absorption: 23885.6,
        north_absorption_rate: 98.81,
        south_absorption_rate: 99.41,
        total_absorption_rate: 99.30,
        remarks: ''
      },
      {
        id: 9,
        area: '9日',
        weather: '晴（24℃）',
        north_box_forward: 29.5325,
        south_box_forward: 61.4170,
        north_generation: 5842.8,
        south_generation: 25174.4,
        total_generation: 31017.2,
        north_efficiency: 4.75,
        south_efficiency: 4.89,
        total_efficiency: 4.86,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0.00,
        south_weiyang_reverse: 0.28,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 720.00,
        total_high_voltage: 720.00,
        north_box_reverse: 0.3158,
        south_box_reverse: 0.3393,
        north_consumption: 49.60,
        south_consumption: 109.60,
        total_consumption: 159.20,
        north_absorption: 5793.2,
        south_absorption: 24344.8,
        total_absorption: 30138.0,
        north_absorption_rate: 99.15,
        south_absorption_rate: 96.70,
        total_absorption_rate: 97.17,
        remarks: ''
      },
      {
        id: 10,
        area: '10日',
        weather: '晴（26℃）',
        north_box_forward: 31.3653,
        south_box_forward: 65.2131,
        north_generation: 7331.2,
        south_generation: 30368.8,
        total_generation: 37700.0,
        north_efficiency: 5.96,
        south_efficiency: 5.90,
        total_efficiency: 5.91,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0.00,
        south_weiyang_reverse: 0.31,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 360.00,
        total_high_voltage: 360.00,
        north_box_reverse: 0.3283,
        south_box_reverse: 0.3531,
        north_consumption: 50.00,
        south_consumption: 110.40,
        total_consumption: 160.40,
        north_absorption: 7281.2,
        south_absorption: 29898.4,
        total_absorption: 37179.6,
        north_absorption_rate: 99.32,
        south_absorption_rate: 98.45,
        total_absorption_rate: 98.62,
        remarks: ''
      },
      {
        id: 11,
        area: '11日',
        weather: '晴（30℃）',
        north_box_forward: 33.2010,
        south_box_forward: 69.2609,
        north_generation: 7342.8,
        south_generation: 32382.4,
        total_generation: 39725.2,
        north_efficiency: 5.97,
        south_efficiency: 6.29,
        total_efficiency: 6.23,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0.00,
        south_weiyang_reverse: 0.39,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 960.00,
        total_high_voltage: 960.00,
        north_box_reverse: 0.3411,
        south_box_reverse: 0.3672,
        north_consumption: 51.20,
        south_consumption: 112.80,
        total_consumption: 164.00,
        north_absorption: 7291.6,
        south_absorption: 31309.6,
        total_absorption: 38601.2,
        north_absorption_rate: 99.30,
        south_absorption_rate: 96.69,
        total_absorption_rate: 97.17,
        remarks: ''
      },
      {
        id: 12,
        area: '12日',
        weather: '晴（30℃）',
        north_box_forward: 34.5636,
        south_box_forward: 72.0706,
        north_generation: 5450.4,
        south_generation: 22477.6,
        total_generation: 27928.0,
        north_efficiency: 4.43,
        south_efficiency: 4.36,
        total_efficiency: 4.38,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0.00,
        south_weiyang_reverse: 0.42,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 360.00,
        total_high_voltage: 360.00,
        north_box_reverse: 0.3546,
        south_box_reverse: 0.3817,
        north_consumption: 54.00,
        south_consumption: 116.00,
        total_consumption: 170.00,
        north_absorption: 5396.4,
        south_absorption: 22001.6,
        total_absorption: 27398.0,
        north_absorption_rate: 99.01,
        south_absorption_rate: 97.88,
        total_absorption_rate: 98.10,
        remarks: '10：00 14#逆变器恢复'
      },
      {
        id: 13,
        area: '13日',
        weather: '晴(4:00-8:00雨，31℃)',
        north_box_forward: 36.0164,
        south_box_forward: 75.2123,
        north_generation: 5811.2,
        south_generation: 25133.6,
        total_generation: 30944.8,
        north_efficiency: 4.72,
        south_efficiency: 4.88,
        total_efficiency: 4.85,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0.00,
        south_weiyang_reverse: 0.47,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 600.00,
        total_high_voltage: 600.00,
        north_box_reverse: 0.3678,
        south_box_reverse: 0.3959,
        north_consumption: 52.80,
        south_consumption: 113.60,
        total_consumption: 166.40,
        north_absorption: 5758.4,
        south_absorption: 24420.0,
        total_absorption: 30178.4,
        north_absorption_rate: 99.09,
        south_absorption_rate: 97.16,
        total_absorption_rate: 97.52,
        remarks: '14：00 14#逆变器故障'
      },
      {
        id: 14,
        area: '14日',
        weather: '阴（28℃）',
        north_box_forward: 37.1080,
        south_box_forward: 77.6265,
        north_generation: 4366.4,
        south_generation: 19313.6,
        total_generation: 23680.0,
        north_efficiency: 3.55,
        south_efficiency: 3.75,
        total_efficiency: 3.71,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0.00,
        south_weiyang_reverse: 0.47,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 0.00,
        total_high_voltage: 0.00,
        north_box_reverse: 0.3806,
        south_box_reverse: 0.4099,
        north_consumption: 51.20,
        south_consumption: 112.00,
        total_consumption: 163.20,
        north_absorption: 4315.2,
        south_absorption: 19201.6,
        total_absorption: 23516.8,
        north_absorption_rate: 98.83,
        south_absorption_rate: 99.42,
        total_absorption_rate: 99.31,
        remarks: '10：20 14#逆变器恢复'
      },
      {
        id: 15,
        area: '15日',
        weather: '多云（31℃）',
        north_box_forward: 38.6324,
        south_box_forward: 80.8959,
        north_generation: 6097.6,
        south_generation: 26155.2,
        total_generation: 32252.8,
        north_efficiency: 4.96,
        south_efficiency: 5.08,
        total_efficiency: 5.06,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0.00,
        south_weiyang_reverse: 0.49,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 240.00,
        total_high_voltage: 240.00,
        north_box_reverse: 0.3935,
        south_box_reverse: 0.4239,
        north_consumption: 51.60,
        south_consumption: 112.00,
        total_consumption: 163.60,
        north_absorption: 6046.0,
        south_absorption: 25803.2,
        total_absorption: 31849.2,
        north_absorption_rate: 99.15,
        south_absorption_rate: 98.65,
        total_absorption_rate: 98.75,
        remarks: '13:17 13#逆变器故障'
      },
      {
        id: 16,
        area: '16日',
        weather: '晴（32℃）',
        north_box_forward: 39.9836,
        south_box_forward: 83.9762,
        north_generation: 5404.8,
        south_generation: 24642.4,
        total_generation: 30047.2,
        north_efficiency: 4.39,
        south_efficiency: 4.78,
        total_efficiency: 4.71,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0.00,
        south_weiyang_reverse: 0.50,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 120.00,
        total_high_voltage: 120.00,
        north_box_reverse: 0.4068,
        south_box_reverse: 0.4382,
        north_consumption: 53.20,
        south_consumption: 114.40,
        total_consumption: 167.60,
        north_absorption: 5351.6,
        south_absorption: 24408.0,
        total_absorption: 29759.6,
        north_absorption_rate: 99.02,
        south_absorption_rate: 99.05,
        total_absorption_rate: 99.04,
        remarks: '9：50 13#逆变器恢复'
      },
      {
        id: 17,
        area: '17日',
        weather: '阴（28℃）',
        north_box_forward: 41.2950,
        south_box_forward: 86.7716,
        north_generation: 5245.6,
        south_generation: 22363.2,
        total_generation: 27608.8,
        north_efficiency: 4.26,
        south_efficiency: 4.34,
        total_efficiency: 4.33,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0.00,
        south_weiyang_reverse: 0.50,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 0.00,
        total_high_voltage: 0.00,
        north_box_reverse: 0.4195,
        south_box_reverse: 0.4522,
        north_consumption: 50.80,
        south_consumption: 112.00,
        total_consumption: 162.80,
        north_absorption: 5194.8,
        south_absorption: 22251.2,
        total_absorption: 27446.0,
        north_absorption_rate: 99.03,
        south_absorption_rate: 99.50,
        total_absorption_rate: 99.41,
        remarks: ''
      },
      {
        id: 18,
        area: '18日',
        weather: '多云（36℃）',
        north_box_forward: 42.9532,
        south_box_forward: 90.4488,
        north_generation: 6632.8,
        south_generation: 29417.6,
        total_generation: 36050.4,
        north_efficiency: 5.39,
        south_efficiency: 5.71,
        total_efficiency: 5.65,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0.00,
        south_weiyang_reverse: 0.52,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 240.00,
        total_high_voltage: 240.00,
        north_box_reverse: 0.4323,
        south_box_reverse: 0.4661,
        north_consumption: 51.20,
        south_consumption: 111.20,
        total_consumption: 162.40,
        north_absorption: 6581.6,
        south_absorption: 29066.4,
        total_absorption: 35648.0,
        north_absorption_rate: 99.23,
        south_absorption_rate: 98.81,
        total_absorption_rate: 98.88,
        remarks: ''
      },
      {
        id: 19,
        area: '19日',
        weather: '晴（39℃）',
        north_box_forward: 44.3638,
        south_box_forward: 93.9074,
        north_generation: 5642.4,
        south_generation: 27668.8,
        total_generation: 33311.2,
        north_efficiency: 4.59,
        south_efficiency: 5.37,
        total_efficiency: 5.22,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0.00,
        south_weiyang_reverse: 0.53,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 120.00,
        total_high_voltage: 120.00,
        north_box_reverse: 0.4456,
        south_box_reverse: 0.4803,
        north_consumption: 53.20,
        south_consumption: 113.60,
        total_consumption: 166.80,
        north_absorption: 5589.2,
        south_absorption: 27435.2,
        total_absorption: 33024.4,
        north_absorption_rate: 99.06,
        south_absorption_rate: 99.16,
        total_absorption_rate: 99.14,
        remarks: ''
      },
      {
        id: 20,
        area: '20日',
        weather: '晴(39℃）',
        north_box_forward: 45.6394,
        south_box_forward: 97.2139,
        north_generation: 5102.4,
        south_generation: 26452.0,
        total_generation: 31554.4,
        north_efficiency: 4.15,
        south_efficiency: 5.14,
        total_efficiency: 4.95,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0.00,
        south_weiyang_reverse: 0.58,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 600.00,
        total_high_voltage: 600.00,
        north_box_reverse: 0.4586,
        south_box_reverse: 0.4946,
        north_consumption: 52.00,
        south_consumption: 114.40,
        total_consumption: 166.40,
        north_absorption: 5050.4,
        south_absorption: 25737.6,
        total_absorption: 30788.0,
        north_absorption_rate: 98.98,
        south_absorption_rate: 97.30,
        total_absorption_rate: 97.57,
        remarks: ''
      },
      {
        id: 21,
        area: '21日',
        weather: '晴(41℃）',
        north_box_forward: 46.7632,
        south_box_forward: 100.1804,
        north_generation: 4495.2,
        south_generation: 23732.0,
        total_generation: 28227.2,
        north_efficiency: 3.65,
        south_efficiency: 4.61,
        total_efficiency: 4.42,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0.00,
        south_weiyang_reverse: 0.64,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 720.00,
        total_high_voltage: 720.00,
        north_box_reverse: 0.4727,
        south_box_reverse: 0.5100,
        north_consumption: 56.40,
        south_consumption: 123.20,
        total_consumption: 179.60,
        north_absorption: 4438.8,
        south_absorption: 22888.8,
        total_absorption: 27327.6,
        north_absorption_rate: 98.75,
        south_absorption_rate: 96.45,
        total_absorption_rate: 96.81,
        remarks: ''
      },
      {
        id: 22,
        area: '22日',
        weather: '雨（27℃）',
        north_box_forward: 47.8308,
        south_box_forward: 102.6122,
        north_generation: 4270.4,
        south_generation: 19454.4,
        total_generation: 23724.8,
        north_efficiency: 3.47,
        south_efficiency: 3.78,
        total_efficiency: 3.72,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0.00,
        south_weiyang_reverse: 0.67,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 360.00,
        total_high_voltage: 360.00,
        north_box_reverse: 0.4845,
        south_box_reverse: 0.5235,
        north_consumption: 47.20,
        south_consumption: 108.00,
        total_consumption: 155.20,
        north_absorption: 4223.2,
        south_absorption: 18986.4,
        total_absorption: 23209.6,
        north_absorption_rate: 98.89,
        south_absorption_rate: 97.59,
        total_absorption_rate: 97.83,
        remarks: ''
      },
      {
        id: 23,
        area: '23日',
        weather: '多云（27℃）',
        north_box_forward: 49.4047,
        south_box_forward: 106.3360,
        north_generation: 6295.6,
        south_generation: 29790.4,
        total_generation: 36086.0,
        north_efficiency: 5.12,
        south_efficiency: 5.78,
        total_efficiency: 5.66,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0.00,
        south_weiyang_reverse: 0.83,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 1920.00,
        total_high_voltage: 1920.00,
        north_box_reverse: 0.4965,
        south_box_reverse: 0.5367,
        north_consumption: 48.00,
        south_consumption: 105.60,
        total_consumption: 153.60,
        north_absorption: 6247.6,
        south_absorption: 27764.8,
        total_absorption: 34012.4,
        north_absorption_rate: 99.24,
        south_absorption_rate: 93.20,
        total_absorption_rate: 94.25,
        remarks: '12：36 14#逆变器故障  16：03 29#逆变器故障'
      },
      {
        id: 24,
        area: '24日',
        weather: '多云（28℃）',
        north_box_forward: 50.8006,
        south_box_forward: 109.7433,
        north_generation: 5583.6,
        south_generation: 27258.4,
        total_generation: 32842.0,
        north_efficiency: 4.54,
        south_efficiency: 5.29,
        total_efficiency: 5.15,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0.00,
        south_weiyang_reverse: 1.00,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 2040.00,
        total_high_voltage: 2040.00,
        north_box_reverse: 0.5094,
        south_box_reverse: 0.5507,
        north_consumption: 51.60,
        south_consumption: 112.00,
        total_consumption: 163.60,
        north_absorption: 5532.0,
        south_absorption: 25106.4,
        total_absorption: 30638.4,
        north_absorption_rate: 99.08,
        south_absorption_rate: 92.11,
        total_absorption_rate: 93.29,
        remarks: ''
      },
      {
        id: 25,
        area: '25日',
        weather: '阴（24℃）',
        north_box_forward: 52.0692,
        south_box_forward: 113.3714,
        north_generation: 5074.4,
        south_generation: 29024.8,
        total_generation: 34099.2,
        north_efficiency: 4.13,
        south_efficiency: 5.64,
        total_efficiency: 5.34,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0.00,
        south_weiyang_reverse: 1.17,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 2040.00,
        total_high_voltage: 2040.00,
        north_box_reverse: 0.5214,
        south_box_reverse: 0.5636,
        north_consumption: 48.00,
        south_consumption: 103.20,
        total_consumption: 151.20,
        north_absorption: 5026.4,
        south_absorption: 26881.6,
        total_absorption: 31908.0,
        north_absorption_rate: 99.05,
        south_absorption_rate: 92.62,
        total_absorption_rate: 93.57,
        remarks: '14：00 14#逆变器恢复'
      },
      {
        id: 26,
        area: '26日',
        weather: '阴(27℃)',
        north_box_forward: 53.0111,
        south_box_forward: 115.7963,
        north_generation: 3767.6,
        south_generation: 19399.2,
        total_generation: 23166.8,
        north_efficiency: 3.06,
        south_efficiency: 3.77,
        total_efficiency: 3.63,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0.00,
        south_weiyang_reverse: 1.18,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 120.00,
        total_high_voltage: 120.00,
        north_box_reverse: 0.5338,
        south_box_reverse: 0.5771,
        north_consumption: 49.60,
        south_consumption: 108.00,
        total_consumption: 157.60,
        north_absorption: 3718.0,
        south_absorption: 19171.2,
        total_absorption: 22889.2,
        north_absorption_rate: 98.68,
        south_absorption_rate: 98.82,
        total_absorption_rate: 98.80,
        remarks: '14:00 29#逆变器恢复'
      },
      {
        id: 27,
        area: '27日',
        weather: '阴(26℃)',
        north_box_forward: 54.4494,
        south_box_forward: 118.8408,
        north_generation: 5753.2,
        south_generation: 24356.0,
        total_generation: 30109.2,
        north_efficiency: 4.68,
        south_efficiency: 4.73,
        total_efficiency: 4.72,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0.00,
        south_weiyang_reverse: 1.21,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 360.00,
        total_high_voltage: 360.00,
        north_box_reverse: 0.5460,
        south_box_reverse: 0.5905,
        north_consumption: 48.80,
        south_consumption: 107.20,
        total_consumption: 156.00,
        north_absorption: 5704.4,
        south_absorption: 23888.8,
        total_absorption: 29593.2,
        north_absorption_rate: 99.15,
        south_absorption_rate: 98.08,
        total_absorption_rate: 98.29,
        remarks: ''
      },
      {
        id: 28,
        area: '28日',
        weather: '晴（27℃）',
        north_box_forward: 56.3432,
        south_box_forward: 122.9797,
        north_generation: 7575.2,
        south_generation: 33111.2,
        total_generation: 40686.4,
        north_efficiency: 6.16,
        south_efficiency: 6.43,
        total_efficiency: 6.38,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0.00,
        south_weiyang_reverse: 1.46,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 3000.00,
        total_high_voltage: 3000.00,
        north_box_reverse: 0.5585,
        south_box_reverse: 0.6041,
        north_consumption: 50.00,
        south_consumption: 108.80,
        total_consumption: 158.80,
        north_absorption: 7525.2,
        south_absorption: 30002.4,
        total_absorption: 37527.6,
        north_absorption_rate: 99.34,
        south_absorption_rate: 90.61,
        total_absorption_rate: 92.24,
        remarks: ''
      },
      {
        id: 29,
        area: '29日',
        weather: '晴（34℃）',
        north_box_forward: 57.9184,
        south_box_forward: 126.3883,
        north_generation: 6300.8,
        south_generation: 27268.8,
        total_generation: 33569.6,
        north_efficiency: 5.12,
        south_efficiency: 5.29,
        total_efficiency: 5.26,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0.00,
        south_weiyang_reverse: 1.65,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 2280.00,
        total_high_voltage: 2280.00,
        north_box_reverse: 0.5713,
        south_box_reverse: 0.6187,
        north_consumption: 51.20,
        south_consumption: 116.80,
        total_consumption: 168.00,
        north_absorption: 6249.6,
        south_absorption: 24872.0,
        total_absorption: 31121.6,
        north_absorption_rate: 99.19,
        south_absorption_rate: 91.21,
        total_absorption_rate: 92.71,
        remarks: ''
      },
      {
        id: 30,
        area: '30日',
        weather: '小雨（34℃）',
        north_box_forward: 58.4061,
        south_box_forward: 127.4373,
        north_generation: 1950.8,
        south_generation: 8392.0,
        total_generation: 10342.8,
        north_efficiency: 1.59,
        south_efficiency: 1.63,
        total_efficiency: 1.62,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0.00,
        south_weiyang_reverse: 1.65,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 0.00,
        total_high_voltage: 0.00,
        north_box_reverse: 0.5847,
        south_box_reverse: 0.6336,
        north_consumption: 53.60,
        south_consumption: 119.20,
        total_consumption: 172.80,
        north_absorption: 1897.2,
        south_absorption: 8272.8,
        total_absorption: 10170.0,
        north_absorption_rate: 97.25,
        south_absorption_rate: 98.58,
        total_absorption_rate: 98.33,
        remarks: ''
      },
      {
        id: 31,
        area: '31日',
        weather: '阴（27℃）',
        north_box_forward: 59.2437,
        south_box_forward: 129.2199,
        north_generation: 3350.4,
        south_generation: 14260.8,
        total_generation: 17611.2,
        north_efficiency: 2.72,
        south_efficiency: 2.77,
        total_efficiency: 2.76,
        north_weiyang_reverse: 0.05,
        north_xingyuan_reverse: 0.00,
        north_high_voltage: 0.00,
        south_weiyang_reverse: 1.65,
        south_xingyuan_reverse: 0.00,
        south_high_voltage: 0.00,
        total_high_voltage: 0.00,
        north_box_reverse: 0.5847,
        south_box_reverse: 0.6336,
        north_consumption: 0.00,
        south_consumption: 0.00,
        total_consumption: 0.00,
        north_absorption: 3350.4,
        south_absorption: 14260.8,
        total_absorption: 17611.2,
        north_absorption_rate: 100.00,
        south_absorption_rate: 100.00,
        total_absorption_rate: 100.00,
        remarks: ''
      },
      {
        id: 32,
        area: '合计（度）',
        weather: '/',
        north_box_forward: '/',
        south_box_forward: '/',
        north_generation: 169136.0,
        south_generation: 749969.6,
        total_generation: 919105.6,
        north_efficiency: '/',
        south_efficiency: '/',
        total_efficiency: '/',
        north_weiyang_reverse: '/',
        north_xingyuan_reverse: '/',
        north_high_voltage: 0.0,
        south_weiyang_reverse: '/',
        south_xingyuan_reverse: '/',
        south_high_voltage: 17760.0,
        total_high_voltage: 17760.0,
        north_box_reverse: '/',
        south_box_reverse: '/',
        north_consumption: 1585.2,
        south_consumption: 3459.2,
        total_consumption: 5044.4,
        north_absorption: 167550.8,
        south_absorption: 728750.4,
        total_absorption: 896301.2,
        north_absorption_rate: '/',
        south_absorption_rate: '/',
        total_absorption_rate: '/',
        remarks: ''
      },
      {
        id: 33,
        area: '平均（度）',
        weather: '/',
        north_box_forward: '/',
        south_box_forward: '/',
        north_generation: 5456.0,
        south_generation: 24192.6,
        total_generation: 29648.6,
        north_efficiency: 4.44,
        south_efficiency: 4.70,
        total_efficiency: 4.65,
        north_weiyang_reverse: '/',
        north_xingyuan_reverse: '/',
        north_high_voltage: 0.0,
        south_weiyang_reverse: '/',
        south_xingyuan_reverse: '/',
        south_high_voltage: 572.9,
        total_high_voltage: 572.9,
        north_box_reverse: '/',
        south_box_reverse: '/',
        north_consumption: 51.1,
        south_consumption: 111.6,
        total_consumption: 162.7,
        north_absorption: 5404.9,
        south_absorption: 23508.1,
        total_absorption: 28912.9,
        north_absorption_rate: 99.02,
        south_absorption_rate: 97.45,
        total_absorption_rate: 97.73,
        remarks: ''
      },
      {
        id: 34,
        area: '最大（度）',
        weather: '/',
        north_box_forward: '/',
        south_box_forward: '/',
        north_generation: 7805.2,
        south_generation: 33111.2,
        total_generation: 40686.4,
        north_efficiency: 6.35,
        south_efficiency: 6.43,
        total_efficiency: 6.38,
        north_weiyang_reverse: '/',
        north_xingyuan_reverse: '/',
        north_high_voltage: 0.0,
        south_weiyang_reverse: '/',
        south_xingyuan_reverse: '/',
        south_high_voltage: 3000.0,
        total_high_voltage: 3000.0,
        north_box_reverse: '/',
        south_box_reverse: '/',
        north_consumption: 98.8,
        south_consumption: 210.4,
        total_consumption: 309.2,
        north_absorption: 7706.4,
        south_absorption: 31309.6,
        total_absorption: 38601.2,
        north_absorption_rate: 100.00,
        south_absorption_rate: 100.00,
        total_absorption_rate: 100.00,
        remarks: ''
      },
      {
        id: 35,
        area: '最小（度）',
        weather: '/',
        north_box_forward: '/',
        south_box_forward: '/',
        north_generation: 1950.8,
        south_generation: 8392.0,
        total_generation: 10342.8,
        north_efficiency: 1.59,
        south_efficiency: 1.63,
        total_efficiency: 1.62,
        north_weiyang_reverse: '/',
        north_xingyuan_reverse: '/',
        north_high_voltage: 0.0,
        south_weiyang_reverse: '/',
        south_xingyuan_reverse: '/',
        south_high_voltage: 0.0,
        total_high_voltage: 0.0,
        north_box_reverse: '/',
        south_box_reverse: '/',
        north_consumption: 0.0,
        south_consumption: 0.0,
        total_consumption: 0.0,
        north_absorption: 1897.2,
        south_absorption: 8272.8,
        total_absorption: 10170.0,
        north_absorption_rate: 97.25,
        south_absorption_rate: 90.61,
        total_absorption_rate: 92.24,
        remarks: ''
      }
    ]
    
    const $table = tableRef.value
    if ($table) {
      await $table.reloadData(list)
      setMergeCells($table)
    }
    loading.value = false
  }, 200)
}

const setMergeCells = ($table: VxeTableInstance<RowVO>) => {
  // 设置合并单元格配置
  const mergeList: VxeTablePropTypes.MergeCells<RowVO> = []
  
  // 设置合并单元格配置
  mergeCells.value = mergeList
  
  // 尝试使用API方法设置合并单元格
  try {
    // 使用VXE Table的合并单元格API
    if ($table.setMergeCells) {
      $table.setMergeCells(mergeList)
    } else {
      // 尝试使用不同的方法名
      ($table as any).setMergeCells(mergeList)
    }
  } catch (error) {
    console.log('合并单元格设置失败，可能需要使用其他方法:', error)
  }
}

const exportExcel = () => {
  const $table = tableRef.value
  if ($table) {
    $table.exportData({
      filename: '戊水光伏电站电量统计表',
      type: 'xlsx',
      original: false
    }).then(() => {
      VxeUI.modal.message({
        content: '导出成功',
        status: 'success'
      })
    }).catch(() => {
      VxeUI.modal.message({
        content: '导出失败',
        status: 'error'
      })
    })
  }
}

const exportCSV = () => {
  const $table = tableRef.value
  if ($table) {
    $table.exportData({
      filename: '戊水光伏电站电量统计表',
      type: 'csv',
      original: false
    }).then(() => {
      VxeUI.modal.message({
        content: '导出成功',
        status: 'success'
      })
    }).catch(() => {
      VxeUI.modal.message({
        content: '导出失败',
        status: 'error'
      })
    })
  }
}

onMounted(() => {
  // 初始化时不加载数据，只创建表格框架
  console.log('表格框架已创建，点击"加载数据"按钮来加载数据')
})
</script> 