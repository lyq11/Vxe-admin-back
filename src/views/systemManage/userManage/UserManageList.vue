<template>
  <PageView>
    <vxe-grid ref="gridRef" v-bind="gridOptions" v-on="gridEvents">
      <template #top>
        <vxe-tip status="error" icon="vxe-icon-warning-circle-fill"
          permission-code="userManageActionInsert">新增用户的初始密码为：<vxe-text click-to-copy>123456</vxe-text></vxe-tip>
      </template>

      <template #editName="{ row }">
        <vxe-input v-model="row.username" :disabled="!!row.code"></vxe-input>
      </template>

      <template #defaultPictureUrl="{ row }">
        <VxeUpload
          singleMode
          urlMode
          v-model="row.pictureUrl"
          :show-button-text="false"
          :show-remove-button="false"
          :imageStyle="{ width: 40, height: 40 }"
          :readonly="userStore.userRoleLevel >= row.roleLevel || !VxeUI.permission.checkVisible('userManageActionInsert|userManageActionUpdate')"
          mode="image"
          button-icon="vxe-icon-edit">
        </VxeUpload>
      </template>

      <template #action="{ row }">
        <vxe-button v-if="userStore.userRoleLevel < row.roleLevel" mode="text" status="error" icon="vxe-icon-delete"
          permission-code="userManageActionDelete" @click="removeRow(row)"></vxe-button>
      </template>
    </vxe-grid>
  </PageView>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { VxeGridProps, VxeColumnPropTypes, VxeGridInstance, VxeGridListeners } from 'vxe-table'
import { VxeUI, VxeFormItemPropTypes, VxeSelectProps } from 'vxe-pc-ui'
import { UserVO, getPubAdminUserListPage, deletePubAdminUserDelete, postPubAdminUserSaveBatch } from '@/api/user'
import { getPubAdminRoleOptions } from '@/api/role'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const gridRef = ref<VxeGridInstance<UserVO>>()

const roleCodeEditRender = reactive<VxeColumnPropTypes.EditRender<UserVO, VxeSelectProps>>({
  name: 'VxeSelect',
  options: [],
  optionProps: {
    value: 'code',
    label: 'name'
  },
  defaultValue: 'default',
  props: {
    disabled: true
  }
})

// const roleCodesEditRender = reactive<VxeColumnPropTypes.EditRender<UserVO, VxeSelectProps>>({
//   name: 'VxeSelect',
//   props: {
//     multiple: true
//   },
//   options: [],
//   optionProps: {
//     value: 'code',
//     label: 'name'
//   },
//   defaultValue: [
//     'default'
//   ],
//   events: {
//     change ({ row }) {
//       // 添加空值检查，避免undefined错误
//       if (row.roleCodes && Array.isArray(row.roleCodes) && row.roleCode) {
//         if (!row.roleCodes.includes(row.roleCode)) {
//           row.roleCode = row.roleCodes[0]
//         }
//       }
//     }
//   }
// })

const roleCodeItemRender = reactive<VxeFormItemPropTypes.ItemRender<UserVO, VxeSelectProps>>({
  name: 'VxeSelect',
  props: {
    clearable: true
  },
  options: [],
  optionProps: {
    value: 'code',
    label: 'name'
  },
})

const roleCodesItemRender = reactive<VxeFormItemPropTypes.ItemRender<UserVO, VxeSelectProps>>({
  name: 'VxeSelect',
  props: {
    multiple: true,
    clearable: true
  },
  options: []
})

const gridOptions = reactive<VxeGridProps<UserVO>>({
  id: 'UserManageList',
  height: '100%',
  keepSource: true,
  showOverflow: true,
  customConfig: {
    storage: true
  },
  rowConfig: {
    isHover: true,
    keyField: '_id'
  },
  sortConfig: {
    remote: true,
    multiple: true
  },
  editConfig: {
    mode: 'row',
    showStatus: true,
    enabled: VxeUI.permission.checkVisible('userManageActionInsert|userManageActionUpdate'),
    beforeEditMethod ({ row, column }) {
      if (userStore.userRoleLevel >= row.roleLevel) {
        return false
      }
      if (row.code && column.field === 'name') {
        return false
      }
      return true
    }
  },
  checkboxConfig: {
    checkMethod ({ row }) {
      return userStore.userRoleLevel < row.roleLevel
    }
  },
  toolbarConfig: {
    refresh: true,
    zoom: true,
    buttons: [
      { name: '新增', code: 'insert_edit', status: 'primary', icon: 'vxe-icon-add', permissionCode: 'userManageActionInsert' },
      { name: '标记/删除', code: 'mark_cancel', status: 'error', icon: 'vxe-icon-delete', permissionCode: 'userManageActionDelete' },
      { name: '保存', code: 'save', status: 'success', icon: 'vxe-icon-save', permissionCode: 'userManageActionInsert|userManageActionDelete|userManageActionUpdate' }
    ]
  },
  editRules: {
    username: [
      { required: true, message: '请输入用户名' }
    ],
    roleCodes: [
      { required: true, type: 'array', message: '至少需要授权一个角色' }
    ]
  },
  formConfig: {
    titleWidth: 80,
    titleAlign: 'right',
    items: [
      { field: 'username', title: '用户名', span: 6, itemRender: { name: 'VxeInput', props: { clearable: true } } },
      { field: 'nickname', title: '昵称', span: 6, itemRender: { name: 'VxeInput', props: { clearable: true } } },
      { field: 'email', title: '邮箱', span: 6, itemRender: { name: 'VxeInput', props: { clearable: true } } },
      { field: 'roleCodes', title: '关联角色', span: 6, itemRender: roleCodesItemRender },
      { field: 'roleCode', title: '默认角色', span: 6, folding: true, itemRender: roleCodeItemRender },
      { field: 'startDate', title: '开始时间', span: 6, folding: true, itemRender: { name: 'VxeDatePicker', props: { clearable: true } } },
      { field: 'endDate', title: '结束时间', span: 6, folding: true, itemRender: { name: 'VxeDatePicker', props: { clearable: true } } },
      { span: 24, align: 'center', collapseNode: true, itemRender: { name: 'ListSearchBtn' } }
    ]
  },
  pagerConfig: {},
  columns: [
    { type: 'checkbox', width: 60 },
    { type: 'seq', width: 70 },
    { field: 'id', title: '用户编码', width: 300, visible: false },
    { field: 'username', title: '用户名', minWidth: 160, sortable: true, editRender: { name: 'VxeInput' }, slots: { edit: 'editName' } },
    { field: 'role', title: '关联角色', minWidth: 300, editRender: roleCodeEditRender },
    { field: 'createdAt', title: '注册时间', width: 160, formatter: 'FormatDateTime', sortable: true },
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
          roleCodes: form.roleCodes ? form.roleCodes.join(',') : '',
          orderBy: sorts.map(item => `${item.field}|${item.order}`).join(',')
        }
        return getPubAdminUserListPage(params).then(res => {
          console.log('用户数据原始响应:', res)
          
          // 处理roleCodes数据格式
          if (res.data && res.data.list) {
            res.data.list.forEach((item: any) => {
              // 如果roleCodes是字符串格式的JSON，转换为数组
              if (item.roleCodes && typeof item.roleCodes === 'string') {
                try {
                  item.roleCodes = JSON.parse(item.roleCodes)
                } catch (error) {
                  console.warn('解析roleCodes失败:', item.roleCodes, error)
                  item.roleCodes = []
                }
              } else if (!item.roleCodes) {
                item.roleCodes = []
              }
            })
          }
          
          console.log('处理后的用户数据:', res)
          return res
        })
      },
      save ({ body }) {
        console.log('保存用户数据:', body)
        
        // 在保存前处理数据格式
        if (body.insertRecords) {
          body.insertRecords.forEach((item: any) => {
            if (item.roleCodes && Array.isArray(item.roleCodes)) {
              item.roleCodes = JSON.stringify(item.roleCodes)
            }
          })
        }
        
        if (body.updateRecords) {
          body.updateRecords.forEach((item: any) => {
            if (item.roleCodes && Array.isArray(item.roleCodes)) {
              item.roleCodes = JSON.stringify(item.roleCodes)
            }
          })
        }
        console.log("body", body)
        return postPubAdminUserSaveBatch(body)
      }
    }
  }
})

const removeRow = async (row: UserVO) => {
  const $grid = gridRef.value
  if ($grid && $grid.isInsertByRow(row)) {
    $grid.remove(row)
    return
  }
  const type = await VxeUI.modal.confirm({
    content: `请确认是否删除 " ${row.username} "？`
  })
  if (type === 'confirm') {
    deletePubAdminUserDelete({ _id: row._id }).then(() => {
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
  editDisabled ({ row }) {
    if (userStore.userRoleLevel >= row.roleLevel) {
      VxeUI.modal.message({
        id: 'noPermissionEdit',
        content: '无法编辑，权限不够！',
        status: 'warning'
      })
    }
  }
}

getPubAdminRoleOptions().then(res => {
  console.log("RoleOptions", res)
  roleCodeEditRender.options = res.data.list
  //roleCodesEditRender.options = res.data.list
  roleCodeItemRender.options = res.data.list
  roleCodesItemRender.options = res.data.list
})
</script>
