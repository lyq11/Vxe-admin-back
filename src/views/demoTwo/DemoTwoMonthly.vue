<template>
  <div>
    <div style="text-align: center; font-size: 18px; font-weight: bold; margin-bottom: 20px;">
      发电单元月度电量统计表
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
  month: string
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
          { code: 'EXPORT_ALL', name: '导出 CSV', prefixIcon: 'vxe-icon-download', params: { filename: '发电单元月度统计表', type: 'csv' } }
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
          { code: 'PRINT_ALL', name: '打印', prefixIcon: 'vxe-icon-print', params: { columns: ['project', 'month', 'peak', 'high', 'normal', 'valley', 'total'] } },
          { code: 'EXPORT_ALL', name: '导出 CSV', prefixIcon: 'vxe-icon-download', params: { filename: '发电单元月度统计表', type: 'csv' } }
        ]
      ]
    },
    footer: {
      options: [
        [
          { code: 'PRINT_ALL', name: '打印', prefixIcon: 'vxe-icon-print', params: { columns: ['project', 'month', 'peak', 'high', 'normal', 'valley', 'total'] } }
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
    { field: 'month', title: '月份', width: 120, fixed: 'left' },
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
      { id: 1, project: '1#发电单元（南区）', month: '1月', peak: 1200, high: 2000, normal: 1800, valley: 900, total: 5900 },
      { id: 2, project: '1#发电单元（南区）', month: '2月', peak: 1100, high: 1900, normal: 1700, valley: 850, total: 5550 },
      { id: 3, project: '1#发电单元（南区）', month: '3月', peak: 1300, high: 2100, normal: 1900, valley: 950, total: 6250 },
      { id: 4, project: '1#发电单元（南区）', month: '4月', peak: 1400, high: 2200, normal: 2000, valley: 1000, total: 6600 },
      { id: 5, project: '1#发电单元（南区）', month: '5月', peak: 1500, high: 2300, normal: 2100, valley: 1050, total: 6950 },
      { id: 6, project: '1#发电单元（南区）', month: '6月', peak: 1600, high: 2400, normal: 2200, valley: 1100, total: 7300 },
      { id: 7, project: '1#发电单元（南区）', month: '7月', peak: 1700, high: 2500, normal: 2300, valley: 1150, total: 7650 },
      { id: 8, project: '1#发电单元（南区）', month: '8月', peak: 1800, high: 2600, normal: 2400, valley: 1200, total: 8000 },
      { id: 9, project: '1#发电单元（南区）', month: '9月', peak: 1600, high: 2400, normal: 2200, valley: 1100, total: 7300 },
      { id: 10, project: '1#发电单元（南区）', month: '10月', peak: 1400, high: 2200, normal: 2000, valley: 1000, total: 6600 },
      { id: 11, project: '1#发电单元（南区）', month: '11月', peak: 1200, high: 2000, normal: 1800, valley: 900, total: 5900 },
      { id: 12, project: '1#发电单元（南区）', month: '12月', peak: 1100, high: 1900, normal: 1700, valley: 850, total: 5550 },
      { id: 13, project: '1#发电单元（南区）', month: '平均', peak: 1400, high: 2200, normal: 2000, valley: 1000, total: 6600 },
      { id: 14, project: '1#发电单元（南区）', month: '最大', peak: 1800, high: 2600, normal: 2400, valley: 1200, total: 8000 },
      { id: 15, project: '1#发电单元（南区）', month: '最小', peak: 1100, high: 1900, normal: 1700, valley: 850, total: 5550 },
      { id: 16, project: '1#发电单元（南区）', month: '合计', peak: 16800, high: 26400, normal: 24000, valley: 12000, total: 79200 },
      
      // 2#发电单元（北区）
      { id: 17, project: '2#发电单元（北区）', month: '1月', peak: 1300, high: 2100, normal: 1900, valley: 950, total: 6250 },
      { id: 18, project: '2#发电单元（北区）', month: '2月', peak: 1200, high: 2000, normal: 1800, valley: 900, total: 5900 },
      { id: 19, project: '2#发电单元（北区）', month: '3月', peak: 1400, high: 2200, normal: 2000, valley: 1000, total: 6600 },
      { id: 20, project: '2#发电单元（北区）', month: '4月', peak: 1500, high: 2300, normal: 2100, valley: 1050, total: 6950 },
      { id: 21, project: '2#发电单元（北区）', month: '5月', peak: 1600, high: 2400, normal: 2200, valley: 1100, total: 7300 },
      { id: 22, project: '2#发电单元（北区）', month: '6月', peak: 1700, high: 2500, normal: 2300, valley: 1150, total: 7650 },
      { id: 23, project: '2#发电单元（北区）', month: '7月', peak: 1800, high: 2600, normal: 2400, valley: 1200, total: 8000 },
      { id: 24, project: '2#发电单元（北区）', month: '8月', peak: 1900, high: 2700, normal: 2500, valley: 1250, total: 8350 },
      { id: 25, project: '2#发电单元（北区）', month: '9月', peak: 1700, high: 2500, normal: 2300, valley: 1150, total: 7650 },
      { id: 26, project: '2#发电单元（北区）', month: '10月', peak: 1500, high: 2300, normal: 2100, valley: 1050, total: 6950 },
      { id: 27, project: '2#发电单元（北区）', month: '11月', peak: 1300, high: 2100, normal: 1900, valley: 950, total: 6250 },
      { id: 28, project: '2#发电单元（北区）', month: '12月', peak: 1200, high: 2000, normal: 1800, valley: 900, total: 5900 },
      { id: 29, project: '2#发电单元（北区）', month: '平均', peak: 1500, high: 2300, normal: 2100, valley: 1050, total: 6950 },
      { id: 30, project: '2#发电单元（北区）', month: '最大', peak: 1900, high: 2700, normal: 2500, valley: 1250, total: 8350 },
      { id: 31, project: '2#发电单元（北区）', month: '最小', peak: 1200, high: 2000, normal: 1800, valley: 900, total: 5900 },
      { id: 32, project: '2#发电单元（北区）', month: '合计', peak: 18000, high: 27600, normal: 25200, valley: 12600, total: 83400 },
      
      // 合计
      { id: 33, project: '合计', month: '1月', peak: 2500, high: 4100, normal: 3700, valley: 1850, total: 12150 },
      { id: 34, project: '合计', month: '2月', peak: 2300, high: 3900, normal: 3500, valley: 1750, total: 11450 },
      { id: 35, project: '合计', month: '3月', peak: 2700, high: 4300, normal: 3900, valley: 1950, total: 12850 },
      { id: 36, project: '合计', month: '4月', peak: 2900, high: 4500, normal: 4100, valley: 2050, total: 13550 },
      { id: 37, project: '合计', month: '5月', peak: 3100, high: 4700, normal: 4300, valley: 2150, total: 14250 },
      { id: 38, project: '合计', month: '6月', peak: 3300, high: 4900, normal: 4500, valley: 2250, total: 14950 },
      { id: 39, project: '合计', month: '7月', peak: 3500, high: 5100, normal: 4700, valley: 2350, total: 15650 },
      { id: 40, project: '合计', month: '8月', peak: 3700, high: 5300, normal: 4900, valley: 2450, total: 16350 },
      { id: 41, project: '合计', month: '9月', peak: 3300, high: 4900, normal: 4500, valley: 2250, total: 14950 },
      { id: 42, project: '合计', month: '10月', peak: 2900, high: 4500, normal: 4100, valley: 2050, total: 13550 },
      { id: 43, project: '合计', month: '11月', peak: 2500, high: 4100, normal: 3700, valley: 1850, total: 12150 },
      { id: 44, project: '合计', month: '12月', peak: 2300, high: 3900, normal: 3500, valley: 1750, total: 11450 },
      { id: 45, project: '合计', month: '平均', peak: 2900, high: 4500, normal: 4100, valley: 2050, total: 13550 },
      { id: 46, project: '合计', month: '最大', peak: 3700, high: 5300, normal: 4900, valley: 2450, total: 16350 },
      { id: 47, project: '合计', month: '最小', peak: 2300, high: 3900, normal: 3500, valley: 1750, total: 11450 },
      { id: 48, project: '合计', month: '合计', peak: 34800, high: 54000, normal: 49200, valley: 24600, total: 162600 }
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
    { row: 0, rowspan: 16, colspan: 1, col: 0 }, // 1#发电单元（南区）
    { row: 16, rowspan: 16, colspan: 1, col: 0 }, // 2#发电单元（北区）
    { row: 32, rowspan: 16, colspan: 1, col: 0 }, // 合计
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