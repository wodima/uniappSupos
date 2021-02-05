//封装请求：GET POST http://47.99.150.21:8083/xfwms/  url: 'pdasql/execute.do',
// data: {
// 	"type": "selectList",
// 	"sql": "select ESID,ESFILENAME from BMS_ELECTRONIC_SIGNATURE where ESFILENAME = 'JH201909270005'"
// }

//GET 请求
let doGet = function(url,data) {
	return new Promise((resolve, reject) => {
		uni.request({
				url: url,
				data:data,
				method: 'GET',
			})
			.then((res) => {
				resolve(res)
			})
			.catch((err) => {
				reject(err)
			})
	})
}
// POST
let doPost = function(url,data) {
	return new Promise((resolve, reject) => {
		uni.request({
				url: url,
				data:data,
				method: 'POST',
			})
			.then((res) => {
				resolve(res)
			})
			.catch((err) => {
				reject(err)
			})
	})
}

export {
	doGet,doPost
}
