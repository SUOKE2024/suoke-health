import request from '@/utils/request'

export function getPinnedChats() {
  return request({
    url: '/chats/pinned',
    method: 'get'
  })
}

export function getRecentChats() {
  return request({
    url: '/chats/recent',
    method: 'get'
  })
}

export function createChat(data) {
  return request({
    url: '/chats',
    method: 'post',
    data
  })
}

export function pinChat(chatId) {
  return request({
    url: `/chats/${chatId}/pin`,
    method: 'put'
  })
}
