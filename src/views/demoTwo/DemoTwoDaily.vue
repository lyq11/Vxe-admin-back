<template>
  <div>
    <div style="text-align: center; font-size: 18px; font-weight: bold; margin-bottom: 20px;">
      20XX年XX月戊水光伏电站电量统计表-发电量
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
      <vxe-column field="day" title="项目" width="80" fixed="left"></vxe-column>
      <vxe-colgroup title="1#发电单元（南区）（度）">
        <vxe-column field="unit1_peak" title="尖峰" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
        <vxe-column field="unit1_high" title="峰" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
        <vxe-column field="unit1_normal" title="平" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
        <vxe-column field="unit1_valley" title="谷" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
        <vxe-column field="unit1_total" title="合计" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      </vxe-colgroup>
      <vxe-colgroup title="2#发电单元（北区）（度）">
        <vxe-column field="unit2_peak" title="尖峰" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
        <vxe-column field="unit2_high" title="峰" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
        <vxe-column field="unit2_normal" title="平" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
        <vxe-column field="unit2_valley" title="谷" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
        <vxe-column field="unit2_total" title="合计" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      </vxe-colgroup>
      <vxe-colgroup title="合计（度）">
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
  day: string
  unit1_peak: number
  unit1_high: number
  unit1_normal: number
  unit1_valley: number
  unit1_total: number
  unit2_peak: number
  unit2_high: number
  unit2_normal: number
  unit2_valley: number
  unit2_total: number
  total_peak: number
  total_high: number
  total_normal: number
  total_valley: number
  total_sum: number
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

const loadData = (size: number = 35) => {
  loading.value = true
  setTimeout(async () => {
    const list: RowVO[] = [
      // 1-31日的数据
      { id: 1, day: '1日', unit1_peak: 1200, unit1_high: 2000, unit1_normal: 1800, unit1_valley: 900, unit1_total: 5900, unit2_peak: 1300, unit2_high: 2100, unit2_normal: 1900, unit2_valley: 950, unit2_total: 6250, total_peak: 2500, total_high: 4100, total_normal: 3700, total_valley: 1850, total_sum: 12150 },
      { id: 2, day: '2日', unit1_peak: 1100, unit1_high: 1900, unit1_normal: 1700, unit1_valley: 850, unit1_total: 5550, unit2_peak: 1200, unit2_high: 2000, unit2_normal: 1800, unit2_valley: 900, unit2_total: 5900, total_peak: 2300, total_high: 3900, total_normal: 3500, total_valley: 1750, total_sum: 11450 },
      { id: 3, day: '3日', unit1_peak: 1300, unit1_high: 2100, unit1_normal: 1900, unit1_valley: 950, unit1_total: 6250, unit2_peak: 1400, unit2_high: 2200, unit2_normal: 2000, unit2_valley: 1000, unit2_total: 6600, total_peak: 2700, total_high: 4300, total_normal: 3900, total_valley: 1950, total_sum: 12850 },
      { id: 4, day: '4日', unit1_peak: 1400, unit1_high: 2200, unit1_normal: 2000, unit1_valley: 1000, unit1_total: 6600, unit2_peak: 1500, unit2_high: 2300, unit2_normal: 2100, unit2_valley: 1050, unit2_total: 6950, total_peak: 2900, total_high: 4500, total_normal: 4100, total_valley: 2050, total_sum: 13550 },
      { id: 5, day: '5日', unit1_peak: 1500, unit1_high: 2300, unit1_normal: 2100, unit1_valley: 1050, unit1_total: 6950, unit2_peak: 1600, unit2_high: 2400, unit2_normal: 2200, unit2_valley: 1100, unit2_total: 7300, total_peak: 3100, total_high: 4700, total_normal: 4300, total_valley: 2150, total_sum: 14250 },
      { id: 6, day: '6日', unit1_peak: 1600, unit1_high: 2400, unit1_normal: 2200, unit1_valley: 1100, unit1_total: 7300, unit2_peak: 1700, unit2_high: 2500, unit2_normal: 2300, unit2_valley: 1150, unit2_total: 7650, total_peak: 3300, total_high: 4900, total_normal: 4500, total_valley: 2250, total_sum: 14950 },
      { id: 7, day: '7日', unit1_peak: 1700, unit1_high: 2500, unit1_normal: 2300, unit1_valley: 1150, unit1_total: 7650, unit2_peak: 1800, unit2_high: 2600, unit2_normal: 2400, unit2_valley: 1200, unit2_total: 8000, total_peak: 3500, total_high: 5100, total_normal: 4700, total_valley: 2350, total_sum: 15650 },
      { id: 8, day: '8日', unit1_peak: 1800, unit1_high: 2600, unit1_normal: 2400, unit1_valley: 1200, unit1_total: 8000, unit2_peak: 1900, unit2_high: 2700, unit2_normal: 2500, unit2_valley: 1250, unit2_total: 8350, total_peak: 3700, total_high: 5300, total_normal: 4900, total_valley: 2450, total_sum: 16350 },
      { id: 9, day: '9日', unit1_peak: 1600, unit1_high: 2400, unit1_normal: 2200, unit1_valley: 1100, unit1_total: 7300, unit2_peak: 1700, unit2_high: 2500, unit2_normal: 2300, unit2_valley: 1150, unit2_total: 7650, total_peak: 3300, total_high: 4900, total_normal: 4500, total_valley: 2250, total_sum: 14950 },
      { id: 10, day: '10日', unit1_peak: 1400, unit1_high: 2200, unit1_normal: 2000, unit1_valley: 1000, unit1_total: 6600, unit2_peak: 1500, unit2_high: 2300, unit2_normal: 2100, unit2_valley: 1050, unit2_total: 6950, total_peak: 2900, total_high: 4500, total_normal: 4100, total_valley: 2050, total_sum: 13550 },
      { id: 11, day: '11日', unit1_peak: 1200, unit1_high: 2000, unit1_normal: 1800, unit1_valley: 900, unit1_total: 5900, unit2_peak: 1300, unit2_high: 2100, unit2_normal: 1900, unit2_valley: 950, unit2_total: 6250, total_peak: 2500, total_high: 4100, total_normal: 3700, total_valley: 1850, total_sum: 12150 },
      { id: 12, day: '12日', unit1_peak: 1100, unit1_high: 1900, unit1_normal: 1700, unit1_valley: 850, unit1_total: 5550, unit2_peak: 1200, unit2_high: 2000, unit2_normal: 1800, unit2_valley: 900, unit2_total: 5900, total_peak: 2300, total_high: 3900, total_normal: 3500, total_valley: 1750, total_sum: 11450 },
      { id: 13, day: '13日', unit1_peak: 1300, unit1_high: 2100, unit1_normal: 1900, unit1_valley: 950, unit1_total: 6250, unit2_peak: 1400, unit2_high: 2200, unit2_normal: 2000, unit2_valley: 1000, unit2_total: 6600, total_peak: 2700, total_high: 4300, total_normal: 3900, total_valley: 1950, total_sum: 12850 },
      { id: 14, day: '14日', unit1_peak: 1400, unit1_high: 2200, unit1_normal: 2000, unit1_valley: 1000, unit1_total: 6600, unit2_peak: 1500, unit2_high: 2300, unit2_normal: 2100, unit2_valley: 1050, unit2_total: 6950, total_peak: 2900, total_high: 4500, total_normal: 4100, total_valley: 2050, total_sum: 13550 },
      { id: 15, day: '15日', unit1_peak: 1500, unit1_high: 2300, unit1_normal: 2100, unit1_valley: 1050, unit1_total: 6950, unit2_peak: 1600, unit2_high: 2400, unit2_normal: 2200, unit2_valley: 1100, unit2_total: 7300, total_peak: 3100, total_high: 4700, total_normal: 4300, total_valley: 2150, total_sum: 14250 },
      { id: 16, day: '16日', unit1_peak: 1600, unit1_high: 2400, unit1_normal: 2200, unit1_valley: 1100, unit1_total: 7300, unit2_peak: 1700, unit2_high: 2500, unit2_normal: 2300, unit2_valley: 1150, unit2_total: 7650, total_peak: 3300, total_high: 4900, total_normal: 4500, total_valley: 2250, total_sum: 14950 },
      { id: 17, day: '17日', unit1_peak: 1700, unit1_high: 2500, unit1_normal: 2300, unit1_valley: 1150, unit1_total: 7650, unit2_peak: 1800, unit2_high: 2600, unit2_normal: 2400, unit2_valley: 1200, unit2_total: 8000, total_peak: 3500, total_high: 5100, total_normal: 4700, total_valley: 2350, total_sum: 15650 },
      { id: 18, day: '18日', unit1_peak: 1800, unit1_high: 2600, unit1_normal: 2400, unit1_valley: 1200, unit1_total: 8000, unit2_peak: 1900, unit2_high: 2700, unit2_normal: 2500, unit2_valley: 1250, unit2_total: 8350, total_peak: 3700, total_high: 5300, total_normal: 4900, total_valley: 2450, total_sum: 16350 },
      { id: 19, day: '19日', unit1_peak: 1600, unit1_high: 2400, unit1_normal: 2200, unit1_valley: 1100, unit1_total: 7300, unit2_peak: 1700, unit2_high: 2500, unit2_normal: 2300, unit2_valley: 1150, unit2_total: 7650, total_peak: 3300, total_high: 4900, total_normal: 4500, total_valley: 2250, total_sum: 14950 },
      { id: 20, day: '20日', unit1_peak: 1400, unit1_high: 2200, unit1_normal: 2000, unit1_valley: 1000, unit1_total: 6600, unit2_peak: 1500, unit2_high: 2300, unit2_normal: 2100, unit2_valley: 1050, unit2_total: 6950, total_peak: 2900, total_high: 4500, total_normal: 4100, total_valley: 2050, total_sum: 13550 },
      { id: 21, day: '21日', unit1_peak: 1200, unit1_high: 2000, unit1_normal: 1800, unit1_valley: 900, unit1_total: 5900, unit2_peak: 1300, unit2_high: 2100, unit2_normal: 1900, unit2_valley: 950, unit2_total: 6250, total_peak: 2500, total_high: 4100, total_normal: 3700, total_valley: 1850, total_sum: 12150 },
      { id: 22, day: '22日', unit1_peak: 1100, unit1_high: 1900, unit1_normal: 1700, unit1_valley: 850, unit1_total: 5550, unit2_peak: 1200, unit2_high: 2000, unit2_normal: 1800, unit2_valley: 900, unit2_total: 5900, total_peak: 2300, total_high: 3900, total_normal: 3500, total_valley: 1750, total_sum: 11450 },
      { id: 23, day: '23日', unit1_peak: 1300, unit1_high: 2100, unit1_normal: 1900, unit1_valley: 950, unit1_total: 6250, unit2_peak: 1400, unit2_high: 2200, unit2_normal: 2000, unit2_valley: 1000, unit2_total: 6600, total_peak: 2700, total_high: 4300, total_normal: 3900, total_valley: 1950, total_sum: 12850 },
      { id: 24, day: '24日', unit1_peak: 1400, unit1_high: 2200, unit1_normal: 2000, unit1_valley: 1000, unit1_total: 6600, unit2_peak: 1500, unit2_high: 2300, unit2_normal: 2100, unit2_valley: 1050, unit2_total: 6950, total_peak: 2900, total_high: 4500, total_normal: 4100, total_valley: 2050, total_sum: 13550 },
      { id: 25, day: '25日', unit1_peak: 1500, unit1_high: 2300, unit1_normal: 2100, unit1_valley: 1050, unit1_total: 6950, unit2_peak: 1600, unit2_high: 2400, unit2_normal: 2200, unit2_valley: 1100, unit2_total: 7300, total_peak: 3100, total_high: 4700, total_normal: 4300, total_valley: 2150, total_sum: 14250 },
      { id: 26, day: '26日', unit1_peak: 1600, unit1_high: 2400, unit1_normal: 2200, unit1_valley: 1100, unit1_total: 7300, unit2_peak: 1700, unit2_high: 2500, unit2_normal: 2300, unit2_valley: 1150, unit2_total: 7650, total_peak: 3300, total_high: 4900, total_normal: 4500, total_valley: 2250, total_sum: 14950 },
      { id: 27, day: '27日', unit1_peak: 1700, unit1_high: 2500, unit1_normal: 2300, unit1_valley: 1150, unit1_total: 7650, unit2_peak: 1800, unit2_high: 2600, unit2_normal: 2400, unit2_valley: 1200, unit2_total: 8000, total_peak: 3500, total_high: 5100, total_normal: 4700, total_valley: 2350, total_sum: 15650 },
      { id: 28, day: '28日', unit1_peak: 1800, unit1_high: 2600, unit1_normal: 2400, unit1_valley: 1200, unit1_total: 8000, unit2_peak: 1900, unit2_high: 2700, unit2_normal: 2500, unit2_valley: 1250, unit2_total: 8350, total_peak: 3700, total_high: 5300, total_normal: 4900, total_valley: 2450, total_sum: 16350 },
      { id: 29, day: '29日', unit1_peak: 1600, unit1_high: 2400, unit1_normal: 2200, unit1_valley: 1100, unit1_total: 7300, unit2_peak: 1700, unit2_high: 2500, unit2_normal: 2300, unit2_valley: 1150, unit2_total: 7650, total_peak: 3300, total_high: 4900, total_normal: 4500, total_valley: 2250, total_sum: 14950 },
      { id: 30, day: '30日', unit1_peak: 1400, unit1_high: 2200, unit1_normal: 2000, unit1_valley: 1000, unit1_total: 6600, unit2_peak: 1500, unit2_high: 2300, unit2_normal: 2100, unit2_valley: 1050, unit2_total: 6950, total_peak: 2900, total_high: 4500, total_normal: 4100, total_valley: 2050, total_sum: 13550 },
      { id: 31, day: '31日', unit1_peak: 1200, unit1_high: 2000, unit1_normal: 1800, unit1_valley: 900, unit1_total: 5900, unit2_peak: 1300, unit2_high: 2100, unit2_normal: 1900, unit2_valley: 950, unit2_total: 6250, total_peak: 2500, total_high: 4100, total_normal: 3700, total_valley: 1850, total_sum: 12150 },
      
      // 统计行
      { id: 32, day: '平均', unit1_peak: 1450, unit1_high: 2250, unit1_normal: 2050, unit1_valley: 1025, unit1_total: 6775, unit2_peak: 1550, unit2_high: 2350, unit2_normal: 2150, unit2_valley: 1075, unit2_total: 7125, total_peak: 3000, total_high: 4600, total_normal: 4200, total_valley: 2100, total_sum: 13900 },
      { id: 33, day: '最大', unit1_peak: 1800, unit1_high: 2600, unit1_normal: 2400, unit1_valley: 1200, unit1_total: 8000, unit2_peak: 1900, unit2_high: 2700, unit2_normal: 2500, unit2_valley: 1250, unit2_total: 8350, total_peak: 3700, total_high: 5300, total_normal: 4900, total_valley: 2450, total_sum: 16350 },
      { id: 34, day: '最小', unit1_peak: 1100, unit1_high: 1900, unit1_normal: 1700, unit1_valley: 850, unit1_total: 5550, unit2_peak: 1200, unit2_high: 2000, unit2_normal: 1800, unit2_valley: 900, unit2_total: 5900, total_peak: 2300, total_high: 3900, total_normal: 3500, total_valley: 1750, total_sum: 11450 },
      { id: 35, day: '合计', unit1_peak: 44950, unit1_high: 69750, unit1_normal: 63550, unit1_valley: 31775, unit1_total: 210025, unit2_peak: 48050, unit2_high: 72850, unit2_normal: 66650, unit2_valley: 33325, unit2_total: 220875, total_peak: 93000, total_high: 142600, total_normal: 130200, total_valley: 65100, total_sum: 430900 }
    ]
    
    const $table = tableRef.value
    if ($table) {
      await $table.reloadData(list)
      // 设置合并单元格
      setMergeCells($table)
    }
    loading.value = false
  }, 200)
}

const setMergeCells = ($table: VxeTableInstance<RowVO>) => {
  // 使用合并单元格扩展的方法
  const mergeList = [
    // // 表头合并 - 项目列
    // { row: 0, rowspan: 2, colspan: 1, col: 0 }, // 项目列合并两行
    
    // // 1#发电单元（南区）列组合并
    // { row: 0, rowspan: 1, colspan: 5, col: 1 }, // 1#发电单元（南区）（度）
    
    // // 2#发电单元（北区）列组合并
    // { row: 0, rowspan: 1, colspan: 5, col: 6 }, // 2#发电单元（北区）（度）
    
    // // 合计列组合并
    // { row: 0, rowspan: 1, colspan: 5, col: 11 }, // 合计（度）
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
      filename: '20XX年XX月戊水光伏电站电量统计表-发电量',
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
      filename: '20XX年XX月戊水光伏电站电量统计表-发电量',
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
  loadData(35)
})
</script> 