import { requestAjax } from './http'

export interface UserVO {
  _id: string
  username: string
  code: string
  nickname: string
  pictureUrl: string
  roleCode: string
  roleCodes: string
  roleLevel: number
}

export interface UserMenuVO {
  title: string
  code: string
  name: string
  parentCode: string
  routeName: string
  icon: string
  type: string
  routerLink: any
  menuType: 'route' | 'form'
}

export interface UserRouteConfigVO {
  name: string
  code: string
  parentCode: string
  routeName: string
  type: 'menu' | 'action'
  icon: string
  sort: number
}

export interface UserFormConfigVO {
  _id: string
  name: string
  code: string
  parentCode: string
  routeName: string
  type: 'group' | 'form' | 'module'
  icon: string
  sort: number
}

export interface UserInfoVO {
  name: string
  nickname: string
  roleCode: string
  roleName: string
  user_role_level: number
  pictureUrl: string
  routeList: UserRouteConfigVO[]
  roleList: {
    label: string
    value: string
  }[]
  formList: UserFormConfigVO[]
}

export function getPubAdminUserListPage (params?: any) {
  console.log('getPubAdminUserListPage 调用，参数:', params)
  return requestAjax({
    url: `/user/list`,
    method: 'get',
    params
  }).then(res => {
    console.log('getPubAdminUserListPage 响应:', res)
    return res
  }).catch(error => {
    console.error('getPubAdminUserListPage 错误:', error)
    throw error
  })
}

export function postPubAdminUserCurrentChangeRole (data?: any) {
  return requestAjax({
    url: '/api/pub/admin/user/current/change/role',
    method: 'post',
    data
  })
}

export function postPubAdminUserSaveBatch (data?: any) {
  return requestAjax({
    url: '/user/batch_update',
    method: 'post',
    data
  })
}

export function deletePubAdminUserDelete (data?: any) {
  return requestAjax({
    url: '/api/pub/admin/user/delete',
    method: 'delete',
    data
  })
}
