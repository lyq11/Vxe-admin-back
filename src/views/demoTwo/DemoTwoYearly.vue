<template>
  <div>
    <div style="text-align: center; font-size: 18px; font-weight: bold; margin-bottom: 20px;">
      年度戊水光伏电站电量统计表-发电量
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
  project: string
  year: string
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
          { code: 'EXPORT_ALL', name: '导出 CSV', prefixIcon: 'vxe-icon-download', params: { filename: '年度戊水光伏电站电量统计表-发电量', type: 'csv' } }
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
          { code: 'PRINT_ALL', name: '打印', prefixIcon: 'vxe-icon-print', params: { columns: ['project', 'year', 'peak', 'high', 'normal', 'valley', 'total'] } },
          { code: 'EXPORT_ALL', name: '导出 CSV', prefixIcon: 'vxe-icon-download', params: { filename: '年度戊水光伏电站电量统计表-发电量', type: 'csv' } }
        ]
      ]
    },
    footer: {
      options: [
        [
          { code: 'PRINT_ALL', name: '打印', prefixIcon: 'vxe-icon-print', params: { columns: ['project', 'year', 'peak', 'high', 'normal', 'valley', 'total'] } }
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
    { field: 'project', title: '项目', width: 200, fixed: 'left' },
    { field: 'year', title: '年份', width: 120, fixed: 'left' },
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
      // 1#发电单元（南区）
      { id: 1, project: '1#发电单元（南区）', year: '2025年', peak: 15000, high: 25000, normal: 22000, valley: 11000, total: 73000 },
      { id: 2, project: '1#发电单元（南区）', year: '2026年', peak: 16000, high: 26000, normal: 23000, valley: 11500, total: 76500 },
      { id: 3, project: '1#发电单元（南区）', year: '2027年', peak: 17000, high: 27000, normal: 24000, valley: 12000, total: 80000 },
      { id: 4, project: '1#发电单元（南区）', year: '2028年', peak: 18000, high: 28000, normal: 25000, valley: 12500, total: 83500 },
      { id: 5, project: '1#发电单元（南区）', year: '2029年', peak: 19000, high: 29000, normal: 26000, valley: 13000, total: 87000 },
      { id: 6, project: '1#发电单元（南区）', year: '2030年', peak: 20000, high: 30000, normal: 27000, valley: 13500, total: 90500 },
      { id: 7, project: '1#发电单元（南区）', year: '2031年', peak: 21000, high: 31000, normal: 28000, valley: 14000, total: 94000 },
      { id: 8, project: '1#发电单元（南区）', year: '2032年', peak: 22000, high: 32000, normal: 29000, valley: 14500, total: 97500 },
      { id: 9, project: '1#发电单元（南区）', year: '2033年', peak: 23000, high: 33000, normal: 30000, valley: 15000, total: 101000 },
      { id: 10, project: '1#发电单元（南区）', year: '2034年', peak: 24000, high: 34000, normal: 31000, valley: 15500, total: 104500 },
      { id: 11, project: '1#发电单元（南区）', year: '平均', peak: 19500, high: 29500, normal: 26500, valley: 13250, total: 88750 },
      { id: 12, project: '1#发电单元（南区）', year: '最大', peak: 24000, high: 34000, normal: 31000, valley: 15500, total: 104500 },
      { id: 13, project: '1#发电单元（南区）', year: '最小', peak: 15000, high: 25000, normal: 22000, valley: 11000, total: 73000 },
      { id: 14, project: '1#发电单元（南区）', year: '合计', peak: 195000, high: 295000, normal: 265000, valley: 132500, total: 887500 },
      
      // 2#发电单元（北区）
      { id: 15, project: '2#发电单元（北区）', year: '2025年', peak: 16000, high: 26000, normal: 23000, valley: 11500, total: 76500 },
      { id: 16, project: '2#发电单元（北区）', year: '2026年', peak: 17000, high: 27000, normal: 24000, valley: 12000, total: 80000 },
      { id: 17, project: '2#发电单元（北区）', year: '2027年', peak: 18000, high: 28000, normal: 25000, valley: 12500, total: 83500 },
      { id: 18, project: '2#发电单元（北区）', year: '2028年', peak: 19000, high: 29000, normal: 26000, valley: 13000, total: 87000 },
      { id: 19, project: '2#发电单元（北区）', year: '2029年', peak: 20000, high: 30000, normal: 27000, valley: 13500, total: 90500 },
      { id: 20, project: '2#发电单元（北区）', year: '2030年', peak: 21000, high: 31000, normal: 28000, valley: 14000, total: 94000 },
      { id: 21, project: '2#发电单元（北区）', year: '2031年', peak: 22000, high: 32000, normal: 29000, valley: 14500, total: 97500 },
      { id: 22, project: '2#发电单元（北区）', year: '2032年', peak: 23000, high: 33000, normal: 30000, valley: 15000, total: 101000 },
      { id: 23, project: '2#发电单元（北区）', year: '2033年', peak: 24000, high: 34000, normal: 31000, valley: 15500, total: 104500 },
      { id: 24, project: '2#发电单元（北区）', year: '2034年', peak: 25000, high: 35000, normal: 32000, valley: 16000, total: 108000 },
      { id: 25, project: '2#发电单元（北区）', year: '平均', peak: 20500, high: 30500, normal: 27500, valley: 13750, total: 92250 },
      { id: 26, project: '2#发电单元（北区）', year: '最大', peak: 25000, high: 35000, normal: 32000, valley: 16000, total: 108000 },
      { id: 27, project: '2#发电单元（北区）', year: '最小', peak: 16000, high: 26000, normal: 23000, valley: 11500, total: 76500 },
      { id: 28, project: '2#发电单元（北区）', year: '合计', peak: 205000, high: 305000, normal: 275000, valley: 137500, total: 922500 },
      
      // 合计
      { id: 29, project: '合计', year: '2025年', peak: 31000, high: 51000, normal: 45000, valley: 22500, total: 149500 },
      { id: 30, project: '合计', year: '2026年', peak: 33000, high: 53000, normal: 47000, valley: 23500, total: 156500 },
      { id: 31, project: '合计', year: '2027年', peak: 35000, high: 55000, normal: 49000, valley: 24500, total: 163500 },
      { id: 32, project: '合计', year: '2028年', peak: 37000, high: 57000, normal: 51000, valley: 25500, total: 170500 },
      { id: 33, project: '合计', year: '2029年', peak: 39000, high: 59000, normal: 53000, valley: 26500, total: 177500 },
      { id: 34, project: '合计', year: '2030年', peak: 41000, high: 61000, normal: 55000, valley: 27500, total: 184500 },
      { id: 35, project: '合计', year: '2031年', peak: 43000, high: 63000, normal: 57000, valley: 28500, total: 191500 },
      { id: 36, project: '合计', year: '2032年', peak: 45000, high: 65000, normal: 59000, valley: 29500, total: 198500 },
      { id: 37, project: '合计', year: '2033年', peak: 47000, high: 67000, normal: 61000, valley: 30500, total: 205500 },
      { id: 38, project: '合计', year: '2034年', peak: 49000, high: 69000, normal: 63000, valley: 31500, total: 212500 },
      { id: 39, project: '合计', year: '平均', peak: 40000, high: 60000, normal: 54000, valley: 27000, total: 181000 },
      { id: 40, project: '合计', year: '最大', peak: 49000, high: 69000, normal: 63000, valley: 31500, total: 212500 },
      { id: 41, project: '合计', year: '最小', peak: 31000, high: 51000, normal: 45000, valley: 22500, total: 149500 },
      { id: 42, project: '合计', year: '合计', peak: 400000, high: 600000, normal: 540000, valley: 270000, total: 1810000 }
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
    // 项目列合并
    { row: 0, rowspan: 14, colspan: 1, col: 0 }, // 1#发电单元（南区）
    { row: 14, rowspan: 14, colspan: 1, col: 0 }, // 2#发电单元（北区）
    { row: 28, rowspan: 14, colspan: 1, col: 0 }, // 合计
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