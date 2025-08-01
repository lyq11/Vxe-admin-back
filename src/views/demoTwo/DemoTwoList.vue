<template>
  <div>
    <div style="text-align: center; font-size: 18px; font-weight: bold; margin-bottom: 20px;">
      *年戊水光伏电站电量统计表
    </div>
    <vxe-grid ref="gridRef" v-bind="gridOptions" v-on="gridEvents">
      <template #toolbarButtons>
        <span>数据：</span>
        <vxe-select v-model="rowSize" :options="dataOptions" @change="changeRowSizeEvent"></vxe-select>
      </template>

      <template #bottom>
        <div>统计信息：{{ countText }}</div>
      </template>
    </vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { VxeGridInstance, VxeGridListeners, VxeGridProps } from 'vxe-table'
import XEUtils from 'xe-utils'

interface RowVO {
  id: number
  seq: string
  date: string
  project: string
  peak: number
  high: number
  normal: number
  valley: number
  total: number
}

const gridRef = ref<VxeGridInstance<RowVO>>()

const rowSize = ref(50)
const countText = ref('')

const dataOptions = ref([
  { label: '加载 3 行', value: 3 },
  { label: '加载 20 行', value: 20 },
  { label: '加载 50 行', value: 50 },
  { label: '加载 100 行', value: 100 },
  { label: '加载 500 行', value: 500 },
  { label: '加载 1000 行', value: 1000 },
  { label: '加载 5000 行', value: 5000 },
  { label: '加载 10000 行', value: 10000 },
  { label: '加载 50000 行', value: 50000 }
])

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  height: 800,
  showOverflow: true,
  keepSource: true,
  mergeCells: [], // 合并单元格配置
  columnConfig: {
    resizable: true,
    width: 160
  },
  rowConfig: {
    keyField: 'id',
    resizable: true
  },
  resizableConfig: {
    isSyncAutoWidth: true,
    isDblclickAutoWidth: true,
    isSyncAutoHeight: true,
    isDblclickAutoHeight: true
  },
  exportConfig: {
    types: [
      'xlsx'
    ]
  },
  toolbarConfig: {
    custom: true,
    zoom: true,
    export: true,
    slots: {
      buttons: 'toolbarButtons'
    }
  },
  mouseConfig: {
    area: true
  },
  areaConfig: {
    multiple: true,
    showColumnStatus: true,
    showRowStatus: true,
    selectCellToRow: true,
    extendByCalc: true,
    extendByCopy: true
  },
  editConfig: {
    mode: 'cell',
    trigger: 'dblclick',
    showStatus: true
  },
  menuConfig: {
    header: {
      options: [
        [
          { code: 'COPY_TITLE', name: '复制列标题' },
          { code: 'EXPORT_ALL', name: '导出 CSV', prefixIcon: 'vxe-icon-download', params: { filename: '光伏电站电量统计表', type: 'csv' } }
        ]
      ]
    },
    body: {
      options: [
        [
          { code: 'myCode', name: '自定义的菜单' }
        ],
        [
          { code: 'CLEAR_CELL', name: '清除单元格值 (Del)' },
          { code: 'COPY_CELL', name: '页面内复制 (Ctrl+C)', prefixIcon: 'vxe-icon-copy' },
          { code: 'CUT_CELL', name: '页面内剪贴 (Ctrl+X)', prefixIcon: 'vxe-icon-cut' },
          { code: 'PASTE_CELL', name: '页面内粘贴 (Ctrl+V)', prefixIcon: 'vxe-icon-paste' }
        ],
        [
          { code: 'OPEN_FIND', name: '查找 (Ctrl+F)' },
          { code: 'OPEN_REPLACE', name: '替换 (Ctrl+H)' },
          { code: 'MERGE_OR_CLEAR', name: '合并/取消 (Ctrl+M)', prefixIcon: 'vxe-icon-merge-cells' }
        ],
        [
          {
            name: '插入数据',
            children: [
              { code: 'INSERT_AT_ROW', name: '插入' },
              { code: 'INSERT_NEXT_AT_ROW', name: '插入 next' },
              { code: 'INSERT_AT_EDIT_ROW', name: '插入并编辑' },
              { code: 'INSERT_NEXT_AT_EDIT_ROW', name: '插入并编辑 next' }
            ]
          }
        ],
        [
          {
            name: '删除数据',
            children: [
              { code: 'DELETE_ROW', name: '删除行' },
              { code: 'DELETE_AREA_ROW', name: '删除选取范围内的行' },
              { code: 'DELETE_CHECKBOX_ROW', name: '删除复选框勾选行' }
            ]
          }
        ],
        [
          { code: 'EDIT_CELL', name: '编辑' },
          { code: 'REVERT_CELL', name: '还原值', prefixIcon: 'vxe-icon-repeat' }
        ],
        [
          { code: 'CLEAR_FILTER', name: '清除筛选' },
          { code: 'CLEAR_ALL_FILTER', name: '清除所有筛选' },
          {
            name: '排序',
            children: [
              { code: 'CLEAR_SORT', name: '清除排序' },
              { code: 'SORT_ASC', name: '升序', prefixIcon: 'vxe-icon-sort-alpha-asc' },
              { code: 'SORT_DESC', name: '倒序', prefixIcon: 'vxe-icon-sort-alpha-desc' }
            ]
          }
        ],
        [
          { code: 'PRINT_ALL', name: '打印', prefixIcon: 'vxe-icon-print', params: { columns: ['seq', 'date', 'project', 'peak', 'high', 'normal', 'valley', 'total'] } },
          { code: 'EXPORT_ALL', name: '导出 CSV', prefixIcon: 'vxe-icon-download', params: { filename: '光伏电站电量统计表', type: 'csv' } }
        ]
      ]
    },
    footer: {
      options: [
        [
          { code: 'PRINT_ALL', name: '打印', prefixIcon: 'vxe-icon-print', params: { columns: ['seq', 'date', 'project', 'peak', 'high', 'normal', 'valley', 'total'] } }
        ]
      ]
    }
  },
  keyboardConfig: {
    arrowCursorLock: true,
    isClip: true,
    isArrow: true,
    isShift: true,
    isTab: true,
    isEnter: true,
    isEdit: true,
    isBack: true,
    isDel: true,
    isEsc: true,
    isFNR: true,
    isMerge: true
  },
  virtualXConfig: {
    enabled: true,
    gt: 0
  },
  virtualYConfig: {
    enabled: true,
    gt: 0
  },
  columns: [
    { field: 'seq', title: '序号', width: 80, fixed: 'left' },
    { field: 'date', title: '*月*日', width: 120, fixed: 'left' },
    { field: 'project', title: '项目', width: 200, fixed: 'left' },
    { field: 'peak', title: '尖峰（度）', width: 120, editRender: { name: 'input' } },
    { field: 'high', title: '峰（度）', width: 120, editRender: { name: 'input' } },
    { field: 'normal', title: '平（度）', width: 120, editRender: { name: 'input' } },
    { field: 'valley', title: '谷（度）', width: 120, editRender: { name: 'input' } },
    { field: 'total', title: '合计（度）', width: 120, editRender: { name: 'input' } }
  ]
})

const loadData = (size: number) => {
  // 模拟后台接口
  gridOptions.loading = true
  setTimeout(async () => {
    const list: RowVO[] = [
      // 1. 发电量
      { id: 1, seq: '1', date: '发电量', project: '1#发电单元（南区）', peak: 1250, high: 2100, normal: 1800, valley: 950, total: 6100 },
      { id: 2, seq: '1', date: '发电量', project: '2#发电单元（北区）', peak: 1350, high: 2200, normal: 1900, valley: 1050, total: 6500 },
      { id: 3, seq: '1', date: '发电量', project: '合计（度）', peak: 2600, high: 4300, normal: 3700, valley: 2000, total: 12600 },
      { id: 4, seq: '1', date: '发电量', project: '占比（%）', peak: 20.6, high: 34.1, normal: 29.4, valley: 15.9, total: 100 },
      
      // 2. 上网电量
      { id: 5, seq: '2', date: '上网电量', project: '南区未央', peak: 1100, high: 1850, normal: 1600, valley: 850, total: 5400 },
      { id: 6, seq: '2', date: '上网电量', project: '南区杏园', peak: 1150, high: 1950, normal: 1700, valley: 900, total: 5700 },
      { id: 7, seq: '2', date: '上网电量', project: '北区未央', peak: 1200, high: 2000, normal: 1750, valley: 950, total: 5900 },
      { id: 8, seq: '2', date: '上网电量', project: '北区杏园', peak: 1250, high: 2100, normal: 1800, valley: 1000, total: 6150 },
      { id: 9, seq: '2', date: '上网电量', project: '合计（度）', peak: 4700, high: 7900, normal: 6850, valley: 3700, total: 23150 },
      
      // 3. 光伏系统消耗电量
      { id: 13, seq: '3', date: '光伏系统消耗电量', project: '1#发电单元（南区）', peak: 50, high: 80, normal: 70, valley: 40, total: 240 },
      { id: 14, seq: '3', date: '光伏系统消耗电量', project: '2#发电单元（北区）', peak: 55, high: 85, normal: 75, valley: 45, total: 260 },
      { id: 15, seq: '3', date: '光伏系统消耗电量', project: '合计（度）', peak: 105, high: 165, normal: 145, valley: 85, total: 500 },
      
      // 4. 第五再生水厂光伏消纳电量
      { id: 17, seq: '4', date: '第五再生水厂光伏消纳电量', project: '南区高压室', peak: 800, high: 1350, normal: 1150, valley: 650, total: 3950 },
      { id: 18, seq: '4', date: '第五再生水厂光伏消纳电量', project: '北区高压室', peak: 850, high: 1400, normal: 1200, valley: 700, total: 4150 },
      { id: 19, seq: '4', date: '第五再生水厂光伏消纳电量', project: '合计（度）', peak: 1650, high: 2750, normal: 2350, valley: 1350, total: 8100 },
      { id: 20, seq: '4', date: '第五再生水厂光伏消纳电量', project: '占比（%）', peak: 20.4, high: 34.0, normal: 29.0, valley: 16.6, total: 100 },
      { id: 21, seq: '4', date: '第五再生水厂光伏消纳电量', project: '光伏消纳电量/总用电量（%）', peak: 35.0, high: 35.0, normal: 35.0, valley: 35.0, total: 35.0 },
      
      // 5. 第五再生水厂市电用电量
      { id: 23, seq: '5', date: '第五再生水厂市电用电量', project: '南区未央', peak: 1500, high: 2500, normal: 2200, valley: 1200, total: 7400 },
      { id: 24, seq: '5', date: '第五再生水厂市电用电量', project: '南区杏园', peak: 1600, high: 2700, normal: 2300, valley: 1300, total: 7900 },
      { id: 25, seq: '5', date: '第五再生水厂市电用电量', project: '北区未央', peak: 1700, high: 2800, normal: 2400, valley: 1400, total: 8300 },
      { id: 26, seq: '5', date: '第五再生水厂市电用电量', project: '北区杏园', peak: 1800, high: 2900, normal: 2500, valley: 1500, total: 8700 },
      { id: 27, seq: '5', date: '第五再生水厂市电用电量', project: '合计（度）', peak: 6600, high: 10900, normal: 9400, valley: 5400, total: 32300 },
      { id: 28, seq: '5', date: '第五再生水厂市电用电量', project: '占比（%）', peak: 20.4, high: 33.7, normal: 29.1, valley: 16.8, total: 100 },
      
      // 6. 第五再生水厂总用电量
      { id: 30, seq: '6', date: '第五再生水厂总用电量', project: '南区未央', peak: 2300, high: 3850, normal: 3350, valley: 1850, total: 11350 },
      { id: 31, seq: '6', date: '第五再生水厂总用电量', project: '南区杏园', peak: 2450, high: 4050, normal: 3500, valley: 1950, total: 11950 },
      { id: 32, seq: '6', date: '第五再生水厂总用电量', project: '北区未央', peak: 2550, high: 4200, normal: 3600, valley: 2050, total: 12400 },
      { id: 33, seq: '6', date: '第五再生水厂总用电量', project: '北区杏园', peak: 2650, high: 4350, normal: 3700, valley: 2150, total: 12850 },
      { id: 34, seq: '6', date: '第五再生水厂总用电量', project: '合计（度）', peak: 9950, high: 16450, normal: 14150, valley: 8000, total: 48550 },
      { id: 35, seq: '6', date: '第五再生水厂总用电量', project: '占比（%）', peak: 20.5, high: 33.9, normal: 29.1, valley: 16.5, total: 100 }
    ]
    
    gridOptions.loading = false
    const $grid = gridRef.value
    if ($grid) {
      await $grid.reloadData(list)
      // 设置合并单元格
      setMergeCells($grid)
      updateFooterInfo()
    }
  }, 200)
}

const setMergeCells = ($grid: VxeGridInstance<RowVO>) => {
  // 使用合并单元格扩展的方法
  const mergeCells = [
    // 序号列合并
    { row: 0, rowspan: 4, colspan: 1, col: 0 }, // 发电量序号
    { row: 4, rowspan: 5, colspan: 1, col: 0 }, // 上网电量序号
    { row: 9, rowspan: 3, colspan: 1, col: 0 }, // 光伏系统消耗电量序号
    { row: 12, rowspan: 5, colspan: 1, col: 0 }, // 第五再生水厂光伏消纳电量序号
    { row: 17, rowspan: 6, colspan: 1, col: 0 }, // 第五再生水厂市电用电量序号
    { row: 23, rowspan: 6, colspan: 1, col: 0 }, // 第五再生水厂总用电量序号
    
    { row: 0, rowspan: 4, colspan: 1, col: 1 }, // 发电量序号
    { row: 4, rowspan: 5, colspan: 1, col: 1 }, // 上网电量序号
    { row: 9, rowspan: 3, colspan: 1, col: 1 }, // 光伏系统消耗电量序号
    { row: 12, rowspan: 5, colspan: 1, col: 1 }, // 第五再生水厂光伏消纳电量序号
    { row: 17, rowspan: 6, colspan: 1, col: 1 }, // 第五再生水厂市电用电量序号
    { row: 23, rowspan: 6, colspan: 1, col: 1 }, // 第五再生水厂总用电量序号
    
    // // 日期列合并（全部合并为空）
    // { row: 0, rowspan: 4, colspan: 1, col: 0 }, // 发电量序号
    // { row: 4, rowspan: 5, colspan: 1, col: 0 }, // 上网电量序号
    // { row: 9, rowspan: 4, colspan: 1, col: 0 }, // 光伏系统消耗电量序号
    // { row: 13, rowspan: 4, colspan: 1, col: 0 }, // 第五再生水厂光伏消纳电量序号
    // { row: 16, rowspan: 7, colspan: 1, col: 0 }, // 第五再生水厂市电用电量序号
    // { row: 28, rowspan: 7, colspan: 1, col: 0 }, // 第五再生水厂总用电量序号
    
  ]
  
  // 设置合并单元格配置
  gridOptions.mergeCells = mergeCells
  
  // 尝试使用API方法设置合并单元格
  try {
    // 使用VXE Table的合并单元格API
    if ($grid.setMergeCells) {
      $grid.setMergeCells(mergeCells)
    } else {
      // 尝试使用不同的方法名
      ($grid as any).setMergeCells(mergeCells)
    }
  } catch (error) {
    console.log('合并单元格设置失败，可能需要使用其他方法:', error)
  }
  // 强制更新表格
}

const updateFooterInfo = () => {
  const $grid = gridRef.value
  if ($grid) {
    const cellAreas = $grid.getCellAreas()
    const firstItem = cellAreas[0]
    let countNum = 0
    if (firstItem) {
      firstItem.rows.forEach(row => {
        firstItem.cols.forEach(column => {
          const cellValue = row[column.field]
          if (typeof cellValue === 'number') {
            countNum += cellValue
          }
        })
      })
    }
    countText.value = firstItem ? `当前已选择 ${firstItem.rows.length} 行 ${firstItem.cols.length} 列；合计：${countNum}` : ''
  }
}

const gridEvents: VxeGridListeners<RowVO> = {
  cellAreaSelectionEnd () {
    updateFooterInfo()
  },
  cellAreaExtensionEnd () {
    updateFooterInfo()
  },
  clearCellAreaSelection () {
    updateFooterInfo()
  }
}

const changeRowSizeEvent = () => {
  loadData(rowSize.value)
}

onMounted(() => {
  loadData(rowSize.value)
})
</script>
