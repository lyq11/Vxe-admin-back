import { requestAjax } from './http'

export interface PermissionsVO {
  id: string
  name: string
  code: string
  parentCode?: string
  routeCodes?: string[] | string
  updateTime?: string
  createTime?: string
}

export function getPubAdminPermissionsListAll (params?: any) {
  return requestAjax({
    url: '/pub/admin/permissions/list/all',
    method: 'get',
    params
  })
}

export function postPubAdminPermissionsSaveBatch (data?: any) {
  return requestAjax({
    url: '/pub/admin/permissions/save/batch',
    method: 'post',
    data
  })
}

export function deletePubAdminPermissionsDelete (data?: any) {
  return requestAjax({
    url: '/pub/admin/permissions/delete',
    method: 'delete',
    data
  })
}
