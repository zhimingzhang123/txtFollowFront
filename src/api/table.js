import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}


export function getMy() {
  return {
    dev: true
  }
}

export function getNew() {
  return {}
}
