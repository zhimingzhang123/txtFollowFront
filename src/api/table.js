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

// for vscode
// for update
export function getNew2() {
  // commit 2
  return false
}
