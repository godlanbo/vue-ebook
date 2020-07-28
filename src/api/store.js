import request from '../utils/request'
import axios from 'axios'
import book from '../store/modules/book'
// 47.99.166.157:3000
export function home() {
  return request({
    url: '/book/home'
  })
}

export function detail(book) {
  return axios({
    method: 'GET',
    url: 'http://47.99.166.157:3000/book/detail',
    params: {
      fileName: book.fileName
    }
  })
}

export function list() {
  return request({
    url: '/book/list'
  })
}
