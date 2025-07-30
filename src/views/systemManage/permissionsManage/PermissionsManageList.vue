<template>
  <PageView>
    <vxe-grid ref="gridRef" v-bind="gridOptions">
      <template #action="{ row }">
        <vxe-button mode="text" status="error" icon="vxe-icon-delete" permission-code="permissionsManageActionDelete"
          @click="removeRow(row)"></vxe-button>
      </template>
    </vxe-grid>
  </PageView>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { VxeGridProps, VxeGridInstance, VxeColumnPropTypes } from 'vxe-table'
import { VxeUI, VxeTreeSelectProps } from 'vxe-pc-ui'
import { PermissionsVO, getPubAdminPermissionsListAll, postPubAdminPermissionsSaveBatch, deletePubAdminPermissionsDelete } from '@/api/permissions'
import { getPubAdminRouteListAll } from '@/api/route'

const gridRef = ref<VxeGridInstance<PermissionsVO>>()

const routeCodesEditRender = reactive<VxeColumnPropTypes.EditRender<PermissionsVO, VxeTreeSelectProps>>({
  name: 'VxeTreeSelect',
  options: [],
  optionProps: {
    value: 'code',
    label: 'name'
  },
  props: {
    multiple: true,
    clearable: true,
    treeConfig: {
      transform: true,
      keyField: 'code',
      parentField: 'parentCode',
      showCheckbox: true,
      checkboxConfig: {
        checkStrictly: true
      }
    }
  }
})

getPubAdminRouteListAll({}).then(res => {
  routeCodesEditRender.options = res.data.list
})

const gridOptions = reactive<VxeGridProps<PermissionsVO>>({
  id: 'PermissionsManageList',
  height: '100%',
  keepSource: true,
  showOverflow: true,
  data: [],
  rowConfig: {
    isHover: true
  },
  treeConfig: {
    transform: true,
    rowField: 'code',
    parentField: 'parentCode',
    expandAll: true
  },
  editConfig: {
    mode: 'row',
    showStatus: true,
    enabled: VxeUI.permission.checkVisible('permissionsManageActionInsert|permissionsManageActionUpdate')
  },
  customConfig: {
    storage: true
  },
  toolbarConfig: {  
    refresh: true,
    zoom: true,
    buttons: [
      { name: '新增', code: 'insert_edit', status: 'primary', icon: 'vxe-icon-add', permissionCode: 'permissionsManageActionInsert' },
      { name: '标记/删除', code: 'mark_cancel', status: 'error', icon: 'vxe-icon-delete', permissionCode: 'permissionsManageActionDelete' },
      { name: '保存', code: 'save', status: 'success', icon: 'vxe-icon-save', permissionCode: 'permissionsManageActionInsert|permissionsManageActionDelete|permissionsManageActionUpdate' }
    ]
  },
  editRules: {
    name: [
      { required: true, message: '请输入权限名称' }
    ],
    code: [
      { required: true, message: '请输入权限编码' }
    ]
  },
  pagerConfig: {},
  columns: [
    { type: 'checkbox', width: 60 },
    { type: 'seq', width: 70 },
    { field: 'code', title: '权限编码', width: 300, editRender: { name: 'VxeInput' } },
    { field: 'name', title: '权限名称', treeNode: true, minWidth: 300, editRender: { name: 'VxeInput' } },
    { field: 'routeCodes', title: '关联路由', minWidth: 500, editRender: routeCodesEditRender },
    { field: 'updatedAt', title: '最后更新时间', width: 160, formatter: 'FormatDateTime' },
     { field: 'createdAt', title: '创建时间', width: 160, formatter: 'FormatDateTime' },
    { field: 'action', title: '操作', fixed: 'right', width: 80, slots: { default: 'action' } }
  ],
  proxyConfig: {
    response: {
      result: 'data.list', // 配置响应结果列表字段
      total: 'data.total' // 配置响应结果总页数字段
    },
    ajax: {
      query ({ page }) {
        const params = {
          ...page
        }
        return getPubAdminPermissionsListAll(params).then(res => {
          console.log('权限数据原始响应:', res)
          
          // 处理routeCodes数据格式
          if (res.data && res.data.list) {
            res.data.list.forEach((item: any) => {
              // 如果routeCodes是字符串格式的JSON，转换为数组
              if (item.routeCodes && typeof item.routeCodes === 'string') {
                try {
                  item.routeCodes = JSON.parse(item.routeCodes)
                } catch (error) {
                  console.warn('解析routeCodes失败:', item.routeCodes, error)
                  item.routeCodes = []
                }
              } else if (!item.routeCodes) {
                item.routeCodes = []
              }
            })
          }
          
          console.log('处理后的权限数据:', res)
          return res
        })
      },
      save ({ body }) {
        console.log('保存权限数据:', body)
        
        // 在保存前处理数据格式
        if (body.insertRecords) {
          body.insertRecords.forEach((item: any) => {
            if (item.routeCodes && Array.isArray(item.routeCodes)) {
              item.routeCodes = JSON.stringify(item.routeCodes)
            }
          })
        }
        
        if (body.updateRecords) {
          body.updateRecords.forEach((item: any) => {
            if (item.routeCodes && Array.isArray(item.routeCodes)) {
              item.routeCodes = JSON.stringify(item.routeCodes)
            }
          })
        }
        
        return postPubAdminPermissionsSaveBatch(body)
      }
    }
  }
})

const removeRow = async (row: PermissionsVO) => {
  const $grid = gridRef.value
  if ($grid && $grid.isInsertByRow(row)) {
    $grid.remove(row)
    return
  }
  const type = await VxeUI.modal.confirm({
    content: `请确认是否删除 " ${row.name} "？`
  })
  if (type === 'confirm') {
    deletePubAdminPermissionsDelete({ id: row.id }).then(() => {
      if ($grid) {
        $grid.commitProxy('query')
      }
      VxeUI.modal.message({
        content: '删除成功',
        status: 'success'
      })
    })
  }
}
</script>
