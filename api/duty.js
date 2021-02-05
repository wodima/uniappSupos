/**
 * 值班值守
 */
import {
	http
} from '@/api/service.js'

// 通用请求方法middleware 演示。文档：https://www.quanzhan.co/luch-request/guide/3.x/#middleware
/**
 * 查询信息
 * @param {Object} data - 查询数据
 * @param {Object} params - 查询params参数
 */
export const getInfo = (data) => {
	return http.middleware({
		method: 'GET', // 必须大写
		url: 'goods/getGoods',
		data: data,
		params: {
			"type": "selectList"
		},
		custom: {
			auth: true
		}
	})
}
