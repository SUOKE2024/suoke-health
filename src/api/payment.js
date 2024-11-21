import request from '@/utils/request'

// 创建支付订单
export function createPayment(data) {
  return request({
    url: '/payment/create',
    method: 'post',
    data
  })
}

// 查询支付状态
export function queryPaymentStatus(orderNo) {
  return request({
    url: `/payment/status/${orderNo}`,
    method: 'get'
  })
}

// 获取支付记录
export function getPaymentRecords(params) {
  return request({
    url: '/payment/records',
    method: 'get',
    params
  })
}

// 申请退款
export function applyRefund(data) {
  return request({
    url: '/payment/refund',
    method: 'post',
    data
  })
}

// 查询退款状态
export function queryRefundStatus(refundNo) {
  return request({
    url: `/payment/refund/status/${refundNo}`,
    method: 'get'
  })
}
