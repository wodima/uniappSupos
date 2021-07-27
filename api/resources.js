/**
 * 值班值守
 */
import request from '../common/request.js'

export function getInfo(objName,name) {
  return request({
    url: '/objects/v1/properties/' + objName + '/services/' + name,
    method: 'POST'
  })
}