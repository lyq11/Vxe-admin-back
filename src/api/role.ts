import { requestAjax } from './http'

export interface RoleVO {
  id: string
  name: string
  code: string
  level: number
  permissionsCodes?: string[] | string
  remark?: string
  updatedAt?: string
  createdAt?: string
}

export function getPubAdminRoleOptions (params?: any) {
  return requestAjax({
    url: '/pub/admin/role/options',
    method: 'get',
    params
  })
}

export function getPubAdminRoleListPage (params?: any) {
  return requestAjax({
    url: `/pub/admin/role/list/page/${params.pageSize}/${params.currentPage}`,
    method: 'get',
    params
  })
}

export function postPubAdminRoleSaveBatch (data?: any) {
  return requestAjax({
    url: '/pub/admin/role/save/batch',
    method: 'post',
    data
  })
}

export function deletePubAdminRoleDelete (data?: any) {
  return requestAjax({
    url: '/pub/admin/role/delete',
    method: 'delete',
    data
  })
}
