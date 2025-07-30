import { requestAjax } from './http'

export function getPubAdminLoginInfo (params?: any) {
  return requestAjax({
    url: '/user/info',
    method: 'get',
    params
  })
}

export function postPubAdminLoginValid (data?: any) {
  console.log('发送登录请求到:', '/api/login', '数据:', data)
  return requestAjax({
    url: '/login',
    method: 'post',
    data
  })
}

export function postPubAdminLoginRegister (data?: any) {
  return requestAjax({
    url: '/api/pub/admin/login/register',
    method: 'post',
    data
  })
}

export function postPubAdminLogout (data?: any) {
  return requestAjax({
    url: '/api/logout',
    method: 'post',
    data
  })
}
