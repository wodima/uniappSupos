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
	return uni.request({
	    url: 'http://220.180.192.175:8081/openapi/objects/v1/properties/accidentReport/services/getTableData', //仅为示例，并非真实接口地址。
	    data: {},
		params: {
			  "objName": "accidentReport",
			  "propName": "getTableData"
		},
	    method:"GET",//method 有效值默认为get
	    header: {
	    	 accept: 'application/json', //自定义请求头信息
			 Content-Type:'application/json',
			 Authorization:this.token
	    },
		
	    success: (res) => {
			console.log(res)
	    }
	});
}
