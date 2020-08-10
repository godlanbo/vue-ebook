import request from '../utils/request'
import axios from 'axios'
import { setLocalForage } from '../utils/localForage'
// import book from '../store/modules/book'
// 47.99.166.157:3000

export function flatList() {
  return request({
    url: `/book/flat-list`
  })
}

export function home() {
  return request({
    url: '/book/home'
  })
}

export function shelf() {
  return request({
    url: '/book/shelf'
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

export function download(book, onSucess, onError, onProgress) {
  if (onProgress == null) {
    onProgress = onError
    onError = null
  }
  return axios.create({
    baseURL: process.env.VUE_APP_RES_BASE_URL,
    method: 'get',
    responseType: 'blob',
    timeout: 180 * 1000,
    onDownloadProgress: progressEvent => {
      if (onProgress) onProgress(progressEvent)
    }
  }).get(`/epub/${book.categoryText}/${book.fileName}.epub`)
    .then(res => {
      const blob = new Blob([res.data])
      setLocalForage(book.fileName, blob,
        () => onSucess(book),
        err => onError(err))
    }).catch(err => {
      if (onError) onError(err)
    })
}
