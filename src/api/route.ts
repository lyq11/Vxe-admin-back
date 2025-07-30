import { requestAjax } from './http'

export interface RouteVO {
  id: string
  name: string
  routeName: string
  code: string
  parentCode: string
  icon: string
  type: 'menu' | 'action'
  sort?: number
  updatedAt: string
  createAt: string
  children: RouteVO[]
}

export function getPubAdminRouteListAll (params?: any) {
  return requestAjax({
    url: '/pub/admin/route/list/all',
    method: 'get',
    params
  })
}

export function postPubAdminRouteSaveBatch (data?: any) {
  return requestAjax({
    url: '/pub/admin/route/save/batch',
    method: 'post',
    data
  })
}

export function deletePubAdminRouteDelete (data?: any) {
  return requestAjax({
    url: '/pub/admin/route/delete',
    method: 'delete',
    data
  })
}
