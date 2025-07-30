<template>
  <div>
    <div style="text-align: center; font-size: 18px; font-weight: bold; margin-bottom: 20px;">
      戊水光伏电站电量统计表
    </div>
    <div style="margin-bottom: 10px;">
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
      <vxe-column field="project" title="项目" width="200" fixed="left"></vxe-column>
      <vxe-column field="time" title="时间" width="120" fixed="left"></vxe-column>
      <vxe-column field="subProject" title="项目" width="120" fixed="left"></vxe-column>
      
      <!-- 南区箱变（1#发电单元） -->
      <vxe-colgroup title="南区箱变（1#发电单元）">
        <vxe-column field="south_peak" title="尖峰" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
        <vxe-column field="south_high" title="峰" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
        <vxe-column field="south_normal" title="平" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
        <vxe-column field="south_valley" title="谷" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
        <vxe-column field="south_total" title="合计" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      </vxe-colgroup>
      
      <!-- 北区箱变（2#发电单元） -->
      <vxe-colgroup title="北区箱变（2#发电单元）">
        <vxe-column field="north_peak" title="尖峰" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
        <vxe-column field="north_high" title="峰" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
        <vxe-column field="north_normal" title="平" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
        <vxe-column field="north_valley" title="谷" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
        <vxe-column field="north_total" title="合计" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      </vxe-colgroup>
      
      <!-- 合计 -->
      <vxe-colgroup title="合计">
        <vxe-column field="total_peak" title="尖峰" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
        <vxe-column field="total_high" title="峰" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
        <vxe-column field="total_normal" title="平" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
        <vxe-column field="total_valley" title="谷" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
        <vxe-column field="total_sum" title="合计" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      </vxe-colgroup>
    </vxe-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { VxeTableInstance, VxeTablePropTypes, VxeUI } from 'vxe-table'

interface RowVO {
  id: number
  project: string
  time: string
  subProject: string
  south_peak: number | string
  south_high: number | string
  south_normal: number | string
  south_valley: number | string
  south_total: number | string
  north_peak: number | string
  north_high: number | string
  north_normal: number | string
  north_valley: number | string
  north_total: number | string
  total_peak: number | string
  total_high: number | string
  total_normal: number | string
  total_valley: number | string
  total_sum: number | string
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

const loadData = (size: number = 50) => {
  loading.value = true
  setTimeout(async () => {
    const list: RowVO[] = [
      // 发电量（度）
      { id: 1, project: '发电量（度）', time: '4月1日0:00', subProject: '表底', south_peak: 0, south_high: 0, south_normal: 0, south_valley: 0, south_total: 0, north_peak: 0, north_high: 0, north_normal: 0, north_valley: 0, north_total: 0, total_peak: 0, total_high: 0, total_normal: 0, total_valley: 0, total_sum: 0 },
      { id: 2, project: '', time: '4月30日24:00', subProject: '表底', south_peak: 0, south_high: 10.9629, south_normal: 24.3707, south_valley: 0.1401, south_total: 35.4737, north_peak: 0, north_high: 5.0855, north_normal: 11.8252, north_valley: 0.049, north_total: 16.9597, total_peak: 0, total_high: 0, total_normal: 0, total_valley: 0, total_sum: 0 },
      { id: 3, project: '', time: '/', subProject: '电量', south_peak: 0, south_high: 87703.20, south_normal: 194965.60, south_valley: 1120.80, south_total: 283789.60, north_peak: 0, north_high: 20342.00, north_normal: 47300.80, north_valley: 196.00, north_total: 67838.80, total_peak: 0, total_high: 108045.20, total_normal: 242266.40, total_valley: 1316.80, total_sum: 351628.40 },
      
      // 光伏系统消耗电量（度）
      { id: 4, project: '光伏系统消耗电量（度）', time: '4月1日0:00', subProject: '表底', south_peak: 0, south_high: 0, south_normal: 0, south_valley: 0, south_total: 0, north_peak: 0, north_high: 0, north_normal: 0, north_valley: 0, north_total: 0, total_peak: 0, total_high: 0, total_normal: 0, total_valley: 0, total_sum: 0 },
      { id: 5, project: '', time: '4月30日24:00', subProject: '表底', south_peak: 0, south_high: 0.0694, south_normal: 0.0037, south_valley: 0.1281, south_total: 0.2012, north_peak: 0, north_high: 0.0626, north_normal: 0.0077, north_valley: 0.1181, north_total: 0.1884, total_peak: 0, total_high: 0, total_normal: 0, total_valley: 0, total_sum: 0 },
      { id: 6, project: '', time: '/', subProject: '电量', south_peak: 0, south_high: 555.20, south_normal: 29.60, south_valley: 1024.80, south_total: 1609.60, north_peak: 0, north_high: 250.40, north_normal: 30.80, north_valley: 472.40, north_total: 753.60, total_peak: 0, total_high: 805.60, total_normal: 60.40, total_valley: 1497.20, total_sum: 2363.20 },
      
      // 上网电量（度）
      { id: 7, project: '上网电量（度）', time: '/', subProject: '项目', south_peak: '南区高压室（未央）', south_high: '', south_normal: '', south_valley: '', south_total: '', north_peak: '南区高压室（杏园）', north_high: '', north_normal: '', north_valley: '', north_total: '', total_peak: '北区高压室（未央）', total_high: '', total_normal: '', total_valley: '', total_sum: '' },
      { id: 8, project: '', time: '', subProject: '', south_peak: '尖峰', south_high: '峰', south_normal: '平', south_valley: '谷', south_total: '合计', north_peak: '尖峰', north_high: '峰', north_normal: '平', north_valley: '谷', north_total: '合计', total_peak: '尖峰', total_high: '峰', total_normal: '平', total_valley: '谷', total_sum: '合计' },
      { id: 9, project: '', time: '4月1日0:00', subProject: '表底', south_peak: '/', south_high: 0, south_normal: 0, south_valley: 0, south_total: 0, north_peak: '/', north_high: 0, north_normal: 0, north_valley: 0, north_total: 0, total_peak: '/', total_high: 0, total_normal: 0, total_valley: 0.01, total_sum: 0.01 },
      { id: 10, project: '', time: '4月30日24:00', subProject: '表底', south_peak: '/', south_high: 0.04, south_normal: 0.13, south_valley: 0, south_total: 0.17, north_peak: '/', north_high: 0, north_normal: 0, north_valley: 0, north_total: 0, total_peak: '/', total_high: 0.01, total_normal: 0, total_valley: 0.04, total_sum: 0.05 },
      { id: 11, project: '', time: '/', subProject: '电量', south_peak: '/', south_high: 480, south_normal: 1560, south_valley: 0, south_total: 2040, north_peak: '/', north_high: 0, north_normal: 0, north_valley: 0, north_total: 0, total_peak: '/', total_high: 120, total_normal: 0, total_valley: 360, total_sum: 480 },
      { id: 12, project: '', time: '', subProject: '', south_peak: '/', south_high: 0, south_normal: 0, south_valley: 0, south_total: 0, north_peak: '/', north_high: 0, north_normal: 0, north_valley: 0, north_total: 0, total_peak: '/', total_high: 0, total_normal: 0, total_valley: 0, total_sum: 0 },
      { id: 13, project: '', time: '', subProject: '', south_peak: '/', south_high: 600, south_normal: 1560, south_valley: 360, south_total: 2520, north_peak: '/', north_high: 0, north_normal: 0, north_valley: 0, north_total: 0, total_peak: '/', total_high: 0, total_normal: 0, total_valley: 0, total_sum: 0 },
      
      // 第五再生水厂光伏消纳电量（度）
      { id: 14, project: '第五再生水厂光伏消纳电量（度）', time: '/', subProject: '项目', south_peak: '南区高压室（未央）', south_high: '', south_normal: '', south_valley: '', south_total: '', north_peak: '南区高压室（杏园）', north_high: '', north_normal: '', north_valley: '', north_total: '', total_peak: '北区高压室（未央）', total_high: '', total_normal: '', total_valley: '', total_sum: '' },
      { id: 15, project: '', time: '', subProject: '', south_peak: '尖峰', south_high: '峰', south_normal: '平', south_valley: '谷', south_total: '合计', north_peak: '尖峰', north_high: '峰', north_normal: '平', north_valley: '谷', north_total: '合计', total_peak: '尖峰', total_high: '峰', total_normal: '平', total_valley: '谷', total_sum: '合计' },
      { id: 16, project: '', time: '', subProject: '电量', south_peak: 0, south_high: 86668.00, south_normal: 193376.00, south_valley: 96.00, south_total: 280140.00, north_peak: 0, north_high: 0, north_normal: 0, north_valley: 0, north_total: 0, total_peak: 0, total_high: 19971.60, total_normal: 47270.00, total_valley: -636.40, total_sum: 66605.20 },
      { id: 17, project: '', time: '', subProject: '', south_peak: 0, south_high: 0, south_normal: 0, south_valley: 0, south_total: 0, north_peak: 0, north_high: 0, north_normal: 0, north_valley: 0, north_total: 0, total_peak: 0, total_high: 0, total_normal: 0, total_valley: 0, total_sum: 0 },
      { id: 18, project: '', time: '', subProject: '', south_peak: 0, south_high: 0, south_normal: 0, south_valley: 0, south_total: 0, north_peak: 0, north_high: 0, north_normal: 0, north_valley: 0, north_total: 0, total_peak: 0, total_high: 106639.60, total_normal: 240646.00, total_valley: -540.40, total_sum: 346745.20 }
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
  // 使用合并单元格扩展的方法
  const mergeList = [
    // 发电量（度）项目列合并
    { row: 0, rowspan: 3, colspan: 1, col: 0 }, // 项目列
    
    // 光伏系统消耗电量（度）项目列合并
    { row: 3, rowspan: 3, colspan: 1, col: 0 }, // 项目列
    
    // 上网电量（度）项目列合并
    { row: 6, rowspan: 8, colspan: 1, col: 0 }, // 项目列
    
    // 第五再生水厂光伏消纳电量（度）项目列合并
    { row: 14, rowspan: 5, colspan: 1, col: 0 }, // 项目列
    
    // 上网电量（度）的复杂合并
    { row: 6, rowspan: 2, colspan: 1, col: 1 }, // 时间列 - 项目行
    { row: 8, rowspan: 1, colspan: 1, col: 1 }, // 时间列 - 表底行
    { row: 9, rowspan: 1, colspan: 1, col: 1 }, // 时间列 - 表底行
    { row: 10, rowspan: 3, colspan: 1, col: 1 }, // 时间列 - 电量行
    
    // 第五再生水厂光伏消纳电量（度）的时间列合并
    { row: 14, rowspan: 2, colspan: 1, col: 1 }, // 时间列 - 项目行
    { row: 16, rowspan: 3, colspan: 1, col: 1 }, // 时间列 - 电量行
  ]
  
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
  loadData(18)
})
</script> 