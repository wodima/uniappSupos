// 接口共用地址
const BASE_URL = 'dev/openapi/'
// 获取储存的token 设置token请求头
const token = 'Bearer ' + uni.getStorageSync('token')

export const myRequest = (options) => {
	// 调接口加载
	uni.showLoading({
		title: "加载中",
		mask: true,
	});
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			//默认参数
			data: options.data || {},
			// 配置请求头参数-例如token
			header: {
				Authorization: 'Bearer ' + uni.getStorageSync('token')
			},
			method: options.method || 'GET',
			// sslVerify: true,

			// 接口请求成功
			success: (res) => {
				// 关闭加载
				uni.hideLoading();
				// console.log('接口所有参数', res);
				if (res.statusCode !== 200) {
					// 不同报错信息的提示和配置
					if (res.statusCode == 500) {
						return uni.showToast({
							title: '服务器重启中...',
							icon: "none",
							mask: true,
						})
					} else if (res.statusCode == 401) {
						doRequest()
						return uni.showToast({
							title: '身份验证过期,请刷新界面!',
							icon: "none",
							mask: true,
						})
					} else {
						return uni.showToast({
							title: '获取数据失败',
							icon: "none",
							mask: true,
						})
					}
				}
				// 调用成功且有数据 返回数据  组件内通过 .then() 或者async await 接受异步返回数据
				//resolve(res.data)
				//在接口200 调用成功后 才能进行判断接口内的状态码 return_code 以此判定作何操作和提示

				const {
					statusCode,
					data
				} = res
				let return_code = res.data.return_code
				let return_message = res.data.errMsg
				resolve(res.data)
			},

			// 接口接口失败
			fail: (error) => {
				// 关闭加载
				uni.hideLoading();
				console.log(2, error);
				uni.showToast({
					title: '请求接口失败',
					icon: "none",
					mask: true,
				})
				// 失败数据
				reject(error)
			}
		})
	})
}

function doRequest(options){
	uni.request({
		url: 'http://220.180.192.175:8081/oauth2/client/v1/accessToken', //仅为示例，并非真实接口地址。
		data: {
			grantType: 'client_credential',
			appid: 'App_d3802f8e8fd04eeeab757f2e95963b0f',
			secret: '9bcc6e68b4aa6ea9cffa0fb68386648e'
		},
		method: "GET", //method 有效值默认为get
		header: {
			'custom-header': 'hello' //自定义请求头信息
		},
		success: (res) => {
			// debugger
			// this.$root.token = res.data.accessToken
			console.log(res);
			uni.setStorageSync('token', res.data.accessToken)
		}
	});
}