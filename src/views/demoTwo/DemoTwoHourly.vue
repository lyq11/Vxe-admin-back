<template>
  <div>
    <div style="text-align: center; font-size: 18px; font-weight: bold; margin-bottom: 20px;">
      *年戊水光伏电站电量统计表2
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
      <vxe-column field="seq" title="序号" width="60" fixed="left"></vxe-column>
      <vxe-column field="date" title="*月*日" width="100" fixed="left"></vxe-column>
      <vxe-column field="project" title="项目" width="200" fixed="left"></vxe-column>
      <vxe-column field="time_0000" title="0:00" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_0030" title="0:30" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_0100" title="1:00" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_0130" title="1:30" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_0200" title="2:00" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_0230" title="2:30" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_0300" title="3:00" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_0330" title="3:30" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_0400" title="4:00" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_0430" title="4:30" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_0500" title="5:00" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_0530" title="5:30" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_0600" title="6:00" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_0630" title="6:30" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_0700" title="7:00" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_0730" title="7:30" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_0800" title="8:00" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_0830" title="8:30" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_0900" title="9:00" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_0930" title="9:30" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_1000" title="10:00" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_1030" title="10:30" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_1100" title="11:00" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_1130" title="11:30" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_1200" title="12:00" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_1230" title="12:30" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_1300" title="13:00" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_1330" title="13:30" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_1400" title="14:00" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_1430" title="14:30" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_1500" title="15:00" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_1530" title="15:30" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_1600" title="16:00" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_1630" title="16:30" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_1700" title="17:00" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_1730" title="17:30" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_1800" title="18:00" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_1830" title="18:30" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_1900" title="19:00" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_1930" title="19:30" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_2000" title="20:00" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_2030" title="20:30" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_2100" title="21:00" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_2130" title="21:30" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_2200" title="22:00" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_2230" title="22:30" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_2300" title="23:00" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_2330" title="23:30" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_2345" title="23:45" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="time_2400" title="24:00:00" width="80" :edit-render="{ name: 'VxeInput' }"></vxe-column>
      <vxe-column field="total" title="合计（度）" width="100" fixed="right" :edit-render="{ name: 'VxeInput' }"></vxe-column>
    </vxe-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { VxeTableInstance, VxeTablePropTypes, VxeUI } from 'vxe-table'

interface RowVO {
  id: number
  seq: string
  date: string
  project: string
  time_0000: number
  time_0030: number
  time_0100: number
  time_0130: number
  time_0200: number
  time_0230: number
  time_0300: number
  time_0330: number
  time_0400: number
  time_0430: number
  time_0500: number
  time_0530: number
  time_0600: number
  time_0630: number
  time_0700: number
  time_0730: number
  time_0800: number
  time_0830: number
  time_0900: number
  time_0930: number
  time_1000: number
  time_1030: number
  time_1100: number
  time_1130: number
  time_1200: number
  time_1230: number
  time_1300: number
  time_1330: number
  time_1400: number
  time_1430: number
  time_1500: number
  time_1530: number
  time_1600: number
  time_1630: number
  time_1700: number
  time_1730: number
  time_1800: number
  time_1830: number
  time_1900: number
  time_1930: number
  time_2000: number
  time_2030: number
  time_2100: number
  time_2130: number
  time_2200: number
  time_2230: number
  time_2300: number
  time_2330: number
  time_2345: number
  time_2400: number
  total: number
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

// 生成时间列数据
const generateTimeData = () => {
  const data: any = {}
  const timeSlots = [
    '0000', '0030', '0100', '0130', '0200', '0230', '0300', '0330', '0400', '0430',
    '0500', '0530', '0600', '0630', '0700', '0730', '0800', '0830', '0900', '0930',
    '1000', '1030', '1100', '1130', '1200', '1230', '1300', '1330', '1400', '1430',
    '1500', '1530', '1600', '1630', '1700', '1730', '1800', '1830', '1900', '1930',
    '2000', '2030', '2100', '2130', '2200', '2230', '2300', '2330', '2345', '2400'
  ]
  
  timeSlots.forEach(time => {
    data[`time_${time}`] = Math.floor(Math.random() * 1000) + 100
  })
  
  return data
}

// 计算合计
const calculateTotal = (rowData: any) => {
  const timeSlots = [
    '0000', '0030', '0100', '0130', '0200', '0230', '0300', '0330', '0400', '0430',
    '0500', '0530', '0600', '0630', '0700', '0730', '0800', '0830', '0900', '0930',
    '1000', '1030', '1100', '1130', '1200', '1230', '1300', '1330', '1400', '1430',
    '1500', '1530', '1600', '1630', '1700', '1730', '1800', '1830', '1900', '1930',
    '2000', '2030', '2100', '2130', '2200', '2230', '2300', '2330', '2345', '2400'
  ]
  
  let total = 0
  timeSlots.forEach(time => {
    total += rowData[`time_${time}`] || 0
  })
  
  return total
}

const loadData = (size: number = 50) => {
  loading.value = true
  setTimeout(async () => {
    const list: RowVO[] = [
      // 发电量
      { id: 1, seq: '1', date: '*月*日', project: '发电量', ...generateTimeData() },
      { id: 2, seq: '', date: '', project: '1#发电单元（南区）', ...generateTimeData() },
      { id: 3, seq: '', date: '', project: '2#发电单元（北区）', ...generateTimeData() },
      { id: 4, seq: '', date: '', project: '合计（度）', ...generateTimeData() },
      
      // 上网电量
      { id: 5, seq: '2', date: '*月*日', project: '上网电量', ...generateTimeData() },
      { id: 6, seq: '', date: '', project: '南区未央', ...generateTimeData() },
      { id: 7, seq: '', date: '', project: '南区杏园', ...generateTimeData() },
      { id: 8, seq: '', date: '', project: '北区未央', ...generateTimeData() },
      { id: 9, seq: '', date: '', project: '北区杏园', ...generateTimeData() },
      { id: 10, seq: '', date: '', project: '合计（度）', ...generateTimeData() },
      
      // 光伏系统消耗电量
      { id: 11, seq: '3', date: '*月*日', project: '光伏系统消耗电量', ...generateTimeData() },
      { id: 12, seq: '', date: '', project: '1#发电单元（南区）', ...generateTimeData() },
      { id: 13, seq: '', date: '', project: '2#发电单元（北区）', ...generateTimeData() },
      { id: 14, seq: '', date: '', project: '合计（度）', ...generateTimeData() },
      
      // 第五再生水厂光伏消纳电量
      { id: 15, seq: '4', date: '*月*日', project: '第五再生水厂光伏消纳电量', ...generateTimeData() },
      { id: 16, seq: '', date: '', project: '南区高压室', ...generateTimeData() },
      { id: 17, seq: '', date: '', project: '北区高压室', ...generateTimeData() },
      { id: 18, seq: '', date: '', project: '合计（度）', ...generateTimeData() },
      
      // 第五再生水厂市电用电量
      { id: 19, seq: '5', date: '*月*日', project: '第五再生水厂市电用电量', ...generateTimeData() },
      { id: 20, seq: '', date: '', project: '南区未央', ...generateTimeData() },
      { id: 21, seq: '', date: '', project: '南区杏园', ...generateTimeData() },
      { id: 22, seq: '', date: '', project: '北区未央', ...generateTimeData() },
      { id: 23, seq: '', date: '', project: '北区杏园', ...generateTimeData() },
      { id: 24, seq: '', date: '', project: '合计（度）', ...generateTimeData() },
      
      // 第五再生水厂总用电量
      { id: 25, seq: '6', date: '*月*日', project: '第五再生水厂总用电量', ...generateTimeData() },
      { id: 26, seq: '', date: '', project: '南区未央', ...generateTimeData() },
      { id: 27, seq: '', date: '', project: '南区杏园', ...generateTimeData() },
      { id: 28, seq: '', date: '', project: '北区未央', ...generateTimeData() },
      { id: 29, seq: '', date: '', project: '北区杏园', ...generateTimeData() },
      { id: 30, seq: '', date: '', project: '合计（度）', ...generateTimeData() }
    ]
    
    // 计算每行的合计
    list.forEach(row => {
      row.total = calculateTotal(row)
    })
    
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
    // 发电量序号和日期合并
    { row: 0, rowspan: 4, colspan: 1, col: 0 }, // 序号
    { row: 0, rowspan: 4, colspan: 1, col: 1 }, // 日期
    
    // 上网电量序号和日期合并
    { row: 4, rowspan: 6, colspan: 1, col: 0 }, // 序号
    { row: 4, rowspan: 6, colspan: 1, col: 1 }, // 日期
    
    // 光伏系统消耗电量序号和日期合并
    { row: 10, rowspan: 4, colspan: 1, col: 0 }, // 序号
    { row: 10, rowspan: 4, colspan: 1, col: 1 }, // 日期
    
    // 第五再生水厂光伏消纳电量序号和日期合并
    { row: 14, rowspan: 5, colspan: 1, col: 0 }, // 序号
    { row: 14, rowspan: 5, colspan: 1, col: 1 }, // 日期
    
    // 第五再生水厂市电用电量序号和日期合并
    { row: 18, rowspan: 7, colspan: 1, col: 0 }, // 序号
    { row: 18, rowspan: 7, colspan: 1, col: 1 }, // 日期
    
    // 第五再生水厂总用电量序号和日期合并
    { row: 24, rowspan: 7, colspan: 1, col: 0 }, // 序号
    { row: 24, rowspan: 7, colspan: 1, col: 1 }, // 日期
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
      filename: '*年戊水光伏电站电量统计表2',
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
      filename: '*年戊水光伏电站电量统计表2',
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
  loadData(30)
})
</script> 