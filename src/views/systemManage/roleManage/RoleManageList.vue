<template>
  <PageView>
    <vxe-grid ref="gridRef" v-bind="gridOptions" v-on="gridEvents">
      <template #action="{ row }">
        <vxe-button v-if="userStore.userRoleLevel < row.level" mode="text" status="error" icon="vxe-icon-delete"
          permission-code="roleManageActionDelete" @click="removeRow(row)"></vxe-button>
      </template>
    </vxe-grid>
  </PageView>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { VxeGridProps, VxeGridInstance, VxeGridListeners, VxeColumnPropTypes } from 'vxe-table'
import { VxeUI, VxeFormItemPropTypes, VxeTreeSelectProps, VxeNumberInputProps } from 'vxe-pc-ui'
import { RoleVO, getPubAdminRoleListPage, postPubAdminRoleSaveBatch, deletePubAdminRoleDelete } from '@/api/role'
import { getPubAdminPermissionsListAll } from '@/api/permissions'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const gridRef = ref<VxeGridInstance<RoleVO>>()

const minLevel = userStore.userRoleLevel + 1
const levelEditRender = reactive<VxeColumnPropTypes.EditRender<RoleVO, VxeNumberInputProps>>({
  name: 'VxeNumberInput',
  defaultValue: minLevel,
  props: {
    min: minLevel,
    max: 999
  }
})

const permissionsCodesEditRender = reactive<VxeColumnPropTypes.EditRender<RoleVO, VxeTreeSelectProps>>({
  name: 'VxeTreeSelect',
  options: [],
  optionProps: {
    value: 'code',
    label: 'name'
  },
  props: {
    multiple: true,
    treeConfig: {
      transform: true,
      keyField: 'code',
      parentField: 'parentCode',
      showCheckbox: true
    }
  }
})

const permissionsCodesItemRender = reactive<VxeFormItemPropTypes.ItemRender<RoleVO, VxeTreeSelectProps>>({
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

getPubAdminPermissionsListAll({}).then(res => {
  permissionsCodesEditRender.options = res.data.list
  permissionsCodesItemRender.options = res.data.list
})

const gridOptions = reactive<VxeGridProps<RoleVO>>({
  id: 'RoleManageList',
  height: '100%',
  keepSource: true,
  showOverflow: true,
  data: [],
  rowConfig: {
    isHover: true
  },
  customConfig: {
    storage: true
  },
  sortConfig: {
    remote: true,
    multiple: true
  },
  editConfig: {
    mode: 'row',
    showStatus: true,
    enabled: VxeUI.permission.checkVisible('roleManageActionInsert|roleManageActionUpdate'),
    beforeEditMethod ({ row }) {
      return userStore.userRoleLevel < row.level
    }
  },
  checkboxConfig: {
    checkMethod ({ row }) {
      return userStore.userRoleLevel < row.level
    }
  },
  toolbarConfig: {
    refresh: true,
    zoom: true,
    buttons: [
      { name: '新增', code: 'insert_edit', status: 'primary', icon: 'vxe-icon-add', permissionCode: 'roleManageActionInsert' },
      { name: '标记/删除', code: 'mark_cancel', status: 'error', icon: 'vxe-icon-delete', permissionCode: 'roleManageActionDelete' },
      { name: '保存', code: 'save', status: 'success', icon: 'vxe-icon-save', permissionCode: 'roleManageActionInsert|roleManageActionDelete|roleManageActionUpdate' }
    ]
  },
  editRules: {
    name: [
      { required: true, message: '请输入角色名称' }
    ],
    code: [
      { required: true, message: '请输入角色编码' }
    ]
  },
  formConfig: {
    items: [
      { field: 'name', title: '角色名称', span: 6, itemRender: { name: 'VxeInput', props: { clearable: true } } },
      { field: 'permissionsCodes', title: '关联权限', span: 6, itemRender: permissionsCodesItemRender },
      { itemRender: { name: 'ListSearchBtn' } }
    ]
  },
  pagerConfig: {},
  columns: [
    { type: 'checkbox', width: 60 },
    { type: 'seq', width: 70 },
    { field: 'code', title: '角色编码', width: 300, editRender: { name: 'VxeInput' } },
    { field: 'name', title: '角色名称', minWidth: 200, sortable: true, editRender: { name: 'VxeInput' } },
    { field: 'level', title: '权重', width: 120, sortable: true, editRender: levelEditRender, titlePrefix: { icon: 'vxe-icon-question-circle-fill', content: '角色权重说明：数值越低权限越高，高权重的角色可以修改低权重的数据。' } },
    { field: 'permissionsCodes', title: '关联权限', minWidth: 500, editRender: permissionsCodesEditRender },
    { field: 'remark', title: '备注', minWidth: 300, editRender: { name: 'VxeInput' } },
    { field: 'updatedAt', title: '最后更新时间', width: 160, formatter: 'FormatDateTime', sortable: true },
    { field: 'createdAt', title: '创建时间', width: 160, formatter: 'FormatDateTime', sortable: true },
    { field: 'action', title: '操作', fixed: 'right', width: 80, slots: { default: 'action' } }
  ],
  proxyConfig: {
    sort: true,
    form: true,
    response: {
      result: 'data.list', // 配置响应结果列表字段
      total: 'data.total' // 配置响应结果总页数字段
    },
    ajax: {
      query ({ page, form, sorts }) {
        const params = {
          ...page,
          ...form,
          permissionsCodes: form.permissionsCodes ? form.permissionsCodes.join(',') : '',
          orderBy: sorts.map(item => `${item.field}|${item.order}`).join(',')
        }
        return getPubAdminRoleListPage(params).then(res => {
          console.log('角色数据原始响应:', res)
          
          // 处理permissionsCodes数据格式
          if (res.data && res.data.list) {
            res.data.list.forEach((item: any) => {
              // 如果permissionsCodes是字符串格式的JSON，转换为数组
              if (item.permissionsCodes && typeof item.permissionsCodes === 'string') {
                try {
                  item.permissionsCodes = JSON.parse(item.permissionsCodes)
                } catch (error) {
                  console.warn('解析permissionsCodes失败:', item.permissionsCodes, error)
                  item.permissionsCodes = []
                }
              } else if (!item.permissionsCodes) {
                item.permissionsCodes = []
              }
            })
          }
          
          console.log('处理后的角色数据:', res)
          return res
        })
      },
      save ({ body }) {
        console.log('保存角色数据:', body)
        
        // 在保存前处理数据格式
        if (body.insertRecords) {
          body.insertRecords.forEach((item: any) => {
            if (item.permissionsCodes && Array.isArray(item.permissionsCodes)) {
              item.permissionsCodes = JSON.stringify(item.permissionsCodes)
            }
          })
        }
        
        if (body.updateRecords) {
          body.updateRecords.forEach((item: any) => {
            if (item.permissionsCodes && Array.isArray(item.permissionsCodes)) {
              item.permissionsCodes = JSON.stringify(item.permissionsCodes)
            }
          })
        }
        
        return postPubAdminRoleSaveBatch(body)
      }
    }
  }
})

const removeRow = async (row: RoleVO) => {
  const $grid = gridRef.value
  if ($grid && $grid.isInsertByRow(row)) {
    $grid.remove(row)
    return
  }
  const type = await VxeUI.modal.confirm({
    content: `请确认是否删除 “ ${row.name} ”？`
  })
  if (type === 'confirm') {
    deletePubAdminRoleDelete({ _id: row.id }).then(() => {
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

const gridEvents: VxeGridListeners = {
  editDisabled () {
    VxeUI.modal.message({
      id: 'noPermissionEdit',
      content: '无法编辑，权限不够！',
      status: 'warning'
    })
  }
}
</script>
