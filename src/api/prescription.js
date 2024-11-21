import request from '@/utils/request'

// 获取处方列表
export function getPrescriptions(params) {
  return request({
    url: '/prescriptions',
    method: 'get',
    params
  })
}

// 获取处方详情
export function getPrescriptionDetail(id) {
  return request({
    url: `/prescriptions/${id}`,
    method: 'get'
  })
}

// 创建处方
export function createPrescription(data) {
  return request({
    url: '/prescriptions',
    method: 'post',
    data
  })
}

// 更新处方状态
export function updatePrescriptionStatus(id, status) {
  return request({
    url: `/prescriptions/${id}/status`,
    method: 'put',
    data: { status }
  })
}

// 下载处方
export function downloadPrescription(id) {
  return request({
    url: `/prescriptions/${id}/download`,
    method: 'get',
    responseType: 'blob'
  })
}

// 验证处方
export function verifyPrescription(code) {
  return request({
    url: '/prescriptions/verify',
    method: 'post',
    data: { code }
  })
}
