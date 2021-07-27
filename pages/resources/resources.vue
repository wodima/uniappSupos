<template>
	<view>
		<!-- 设置圆角 -->
		<view class="uni-flex uni-row">
			<view class="flex-item uni-bg-red" @click="onclick('SUP')">物资资源</view>
			<view class="flex-item uni-bg-green" @click="onclick('EX')">应急专家</view>
			<view class="flex-item uni-bg-red" @click="onclick('PERSON')">机构人员</view>
			<view class="flex-item uni-bg-green" @click="onclick('OBJ')">保护对象</view>

		</view>
		<view class="uni-flex uni-row">
			<view class="flex-item2 uni-bg-red" @click="onclick('TEAM')">救援队伍</view>
			<view class="flex-item2 uni-bg-green" @click="onclick('REF')">避难场所</view>
			<view class="flex-item2 uni-bg-red" @click="onclick('BO')">应急广播</view>

		</view>
		<mescroll-body v-if="flag == 'SUP' " ref="mescrollRef" @init="mescrollInit" :down="downOption"
			@down="downCallback" @up="upCallback">
			<view class="news-li" v-for="(news,index) in dataList" :key="index">
				<!-- 一般用法 -->
				<uni-card :is-shadow="true">
					<view class="listcontent">
						<view class="textcontent">
							<view>
								<text class="texttitle">物资名称：</text>
								<text class="text">{{news.equName}}</text>
							</view>
							<view>
								<text class="texttitle">所属单位：</text>
								<text class="text">{{news.company}}</text>
							</view>
							<view>
								<text class="texttitle">存放位置：</text>
								<text class="text">{{news.storageLocation}}</text>
							</view>
							<view>
								<text class="texttitle">数量：</text>
								<text class="text">{{news.number}}</text>
							</view>
							<view>
								<text class="texttitle">是否可用：</text>
								<text class="text">{{news.isUse}}</text>
							</view>
							<view>
								<text class="texttitle">是否脱检：</text>
								<text class="text">{{news.isCheckout}}</text>
							</view>
						</view>
					</view>

				</uni-card>
			</view>
		</mescroll-body>
		<mescroll-body v-if="flag == 'EX' " ref="mescrollRef" @init="mescrollInit" :down="downOption"
			@down="downCallback" @up="upRightCallback">
			<view class="news-li" v-for="(news,index) in dataList" :key="index">
				<!-- 一般用法 -->
				<uni-card :is-shadow="true">
					<view class="listcontent">
						<view class="textcontent">
							<view>
								<text class="texttitle">姓名：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">所属单位：</text>
								<text class="text">{{news.currentUnit}}</text>
							</view>
							<view>
								<text class="texttitle">职务：</text>
								<text class="text">{{news.position}}</text>
							</view>
							<view>
								<text class="texttitle">专业领域：</text>
								<text class="text">{{news.professionalField}}</text>
							</view>
							<view>
								<text class="texttitle">联系电话：</text>
								<text class="text">{{news.phoneNumber}}</text>
							</view>
						</view>
					</view>

				</uni-card>
			</view>
		</mescroll-body>

		<view v-if="flag == 'PERSON'">
			<scroll-view class="tabs-wrapper" id="tabsWrapper" :scroll-x="true"
				:scroll-into-view="`tabItem${selectedIndex}`" :scroll-with-animation="true">
				<view class="tabs-wrap">
					<view class="tabs-item" :class="{ selected: selectedIndex == index }" :id="`tabItem${index}`"
						v-for="(tab, index) in dataList" :key="index" @tap.stop="onTapTab(tab.organizationName)">
						<text>{{ tab.organizationName }}</text>
					</view>
				</view>
			</scroll-view>
			<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback"
				@up="upRightCallback">
				<view class="news-li" v-for="(news,index) in dataList2" :key="index">
					<!-- 一般用法 -->
					<uni-card :is-shadow="true">
						<view class="listcontent">
							<view class="textcontent">
								<view>
									<text class="texttitle">姓名：</text>
									<text class="text">{{news.name}}</text>
								</view>
								<view>
									<text class="texttitle">所属机构：</text>
									<text class="text">{{news.Affiliation}}</text>
								</view>
								<view>
									<text class="texttitle">专业：</text>
									<text class="text">{{news.profession}}</text>
								</view>
								<view>
									<text class="texttitle">联系电话：</text>
									<text class="text">{{news.phoneNumber}}</text>
								</view>
								<view>
									<text class="texttitle">职责：</text>
									<text class="text">{{news.duty}}</text>
								</view>
							</view>
						</view>

					</uni-card>
				</view>
			</mescroll-body>
		</view>
		<mescroll-body v-if="flag == 'OBJ' " ref="mescrollRef" @init="mescrollInit" :down="downOption"
			@down="downCallback" @up="upRightCallback">
			<view class="news-li" v-for="(news,index) in dataList" :key="index">
				<!-- 一般用法 -->
				<uni-card :is-shadow="true">
					<view class="listcontent">
						<view class="textcontent">
							<view>
								<text class="texttitle">对象名称：</text>
								<text class="text">{{news.objName}}</text>
							</view>
							<view>
								<text class="texttitle">所属单位：</text>
								<text class="text">{{news.name}}</text>
							</view>
							<view>
								<text class="texttitle">对象类型：</text>
								<text class="text">{{news.objType}}</text>
							</view>
							<view>
								<text class="texttitle">规模：</text>
								<text class="text">{{news.scale}}</text>
							</view>
							<view>
								<text class="texttitle">地址：</text>
								<text class="text">{{news.address}}</text>
							</view>
						</view>
					</view>

				</uni-card>
			</view>
		</mescroll-body>
		<mescroll-body v-if="flag == 'TEAM' " ref="mescrollRef" @init="mescrollInit" :down="downOption"
			@down="downCallback" @up="upRightCallback">
			<view class="news-li" v-for="(news,index) in dataList" :key="index">
				<!-- 一般用法 -->
				<uni-card :is-shadow="true">
					<view class="listcontent">
						<view class="textcontent">
							<view>
								<text class="texttitle">队伍名称：</text>
								<text class="text">{{news.teamName}}</text>
							</view>
							<view>
								<text class="texttitle">行政区划：</text>
								<text class="text">{{news.dedicatedArea}}</text>
							</view>
							<view>
								<text class="texttitle">队伍行政：</text>
								<text class="text">{{news.teamNature}}</text>
							</view>
							<view>
								<text class="texttitle">总人数：</text>
								<text class="text">{{news.teamNum}}</text>
							</view>

						</view>
					</view>

				</uni-card>
			</view>
		</mescroll-body>
		<mescroll-body v-if="flag == 'REF' " ref="mescrollRef" @init="mescrollInit" :down="downOption"
			@down="downCallback" @up="upRightCallback">
			<view class="news-li" v-for="(news,index) in dataList" :key="index">
				<!-- 一般用法 -->
				<uni-card :is-shadow="true">
					<view class="listcontent">
						<view class="textcontent">
							<view>
								<text class="texttitle">场所名称：</text>
								<text class="text">{{news.shelterName}}</text>
							</view>
							<view>
								<text class="texttitle">所属机构：</text>
								<text class="text">{{news.organization}}</text>
							</view>
							<view>
								<text class="texttitle">负责人：</text>
								<text class="text">{{news.principal}}</text>
							</view>
							<view>
								<text class="texttitle">联系电话：</text>
								<text class="text">{{news.phone}}</text>
							</view>
							<view>
								<text class="texttitle">容纳人数：</text>
								<text class="text">{{news.galleryful}}</text>
							</view>
							<view>
								<text class="texttitle">具体地址：</text>
								<text class="text">{{news.address}}</text>
							</view>
						</view>
					</view>

				</uni-card>
			</view>
		</mescroll-body>
		<mescroll-body v-if="flag == 'BO' " ref="mescrollRef" @init="mescrollInit" :down="downOption"
			@down="downCallback" @up="upRightCallback">
			<view class="news-li" v-for="(news,index) in dataList" :key="index">
				<!-- 一般用法 -->
				<uni-card :is-shadow="true">
					<view class="listcontent">
						<view class="textcontent">
							<view>
								<text class="texttitle">广播编号：</text>
								<text class="text">{{news.broadcastNo}}</text>
							</view>
							<view>
								<text class="texttitle">具体位置：</text>
								<text class="text">{{news.location}}</text>
							</view>
							<view>
								<text class="texttitle">覆盖区域：</text>
								<text class="text">{{news.coverageArea}}</text>
							</view>
							<view>
								<text class="texttitle">是否可用：</text>
								<text class="text">{{news.enableFlag}}</text>
							</view>
							<view>
								<text class="texttitle">负责人：</text>
								<text class="text">{{news.principal}}</text>
							</view>
							<view>
								<text class="texttitle">联系电话：</text>
								<text class="text">{{news.phoneNumber}}</text>
							</view>
						</view>
					</view>

				</uni-card>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";

	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
				downOption: {
					auto: true
				}, //是否在初始化后,自动执行downCallback; 默认true
				// 当前选中的下标，默认为0
				selectedIndex: 0,
				dataList: [],
				dataList2: [],
				flag: "SUP",
				number: 1,
				pageSize: 5,
				type: '',
			}
		},
		onLoad() {
			console.log("页面加载onLoad")
			// this.getdata()
		},
		methods: {
			onclick(res) {
				this.flag = res
				this.getInfo();
				// debugger
			},
			//搜索
			search(res) {
				console.log("输入的值" + res.value)
			},
			/*下拉刷新的回调 */
			downCallback() {
				this.getInfo();
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				switch (this.flag) {
					case "SUP": {
						// getInfo('equipment', 'equipmentInfo').then(data => {
						// 	console.log(data);
						// })
					}
				}
			},
			onTapTab(Affiliation) {
				this.$myRequest({
					url: 'objects/v1/properties/EmergencyPersonnel/services/selectInfo',
					method: 'POST',
					data: {
						"Affiliation": Affiliation,
						"page": 1,
						"per_page": 10
					},
				}).then(res => {
					this.dataList2 = res.result.list
					this.mescroll.endSuccess();
					this.type = Affiliation;
					// console.log(res);
				})
			},
			getInfo() {
				var url = '';
				//联网加载数据
				this.number = 1;
				switch (this.flag) {
					case "SUP": {
						url = 'objects/v1/properties/equipment/services/equipmentInfo';
						break;
					}
					case "EX": {
						url = 'objects/v1/properties/EmergencyExpert/services/selectInfo';
						break;
					}
					case "PERSON": {
						url = 'objects/v1/properties/organization/services/selectInfo';
						this.$myRequest({
							url: 'objects/v1/properties/EmergencyPersonnel/services/selectInfo',
							method: 'POST',
							data: {},
						}).then(res => {
							this.dataList2 = res.result.list
							// console.log(res);
						});
						break;
					}
					case "OBJ": {
						url = 'objects/v1/properties/ProtectedObjects/services/selectData';
						break;
					}
					case "TEAM": {
						url = 'objects/v1/properties/rescueTeams/services/selectInfo';
						break;
					}
					case "REF": {
						url = 'objects/v1/properties/shelter/services/selectData';
						break;
					}
					case "BO": {
						url = 'objects/v1/properties/broadcast/services/getTableData';
						break;
					}
				}
				// console.log(this.flag);
				this.$myRequest({
					url: url,
					method: 'POST',
					data: {
						"page": 1,
						"per_page": 10
					},
				}).then(res => {
					this.dataList = res.result.list
					this.mescroll.endSuccess();
					// console.log(res);
				})
			},
			/*右边下拉刷新的回调 */
			downRightCallback() {
				//联网加载数据
				// getRightInfo({
				// 		ID: Date.now()
				// 	}, {})
				// 	.then(res => {
				// 		this.mescroll.endSuccess();
				// 		//设置列表数据
				// 		this.dataList.unshift(res.data.data);
				// 	})
				// 	.catch(err => {
				// 		//联网失败的回调,隐藏下拉刷新的状态
				// 		this.mescroll.endErr();
				// 	});
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upRightCallback() {
				var url = '';
				this.number += 1;
				if (this.flag == "PERSON") {
					this.$myRequest({
						url: 'objects/v1/properties/EmergencyPersonnel/services/selectInfo',
						method: 'POST',
						data: {
							"Affiliation": this.type,
							"page": this.number,
							"per_page": 10
						},
					}).then(res => {
						this.dataList2 = this.dataList2.concat(res.result.list)
						this.mescroll.endSuccess();
						this.mescroll.endBySize(res.result.pagination.pageSize, res.result.pagination
							.total); //必传参数(当前页的数据个数, 总页数)
					})
				}else if(this.flag == "REF"){
					this.mescroll.endBySize(0,0);
				}else if(this.flag == "BO"){
					this.mescroll.endBySize(0,0);
				} else {
					switch (this.flag) {
						case "SUP": {
							url = 'objects/v1/properties/equipment/services/equipmentInfo';
							break;
						}
						case "EX": {
							url = 'objects/v1/properties/EmergencyExpert/services/selectInfo';
							break;
						}
						case "OBJ": {
							url = 'objects/v1/properties/ProtectedObjects/services/selectData';
							break;
						}
						case "TEAM": {
							url = 'objects/v1/properties/rescueTeams/services/selectInfo';
							break;
						}
						case "REF": {
							url = 'objects/v1/properties/shelter/services/selectData';
							break;
						}
						case "BO": {
							url = 'objects/v1/properties/broadcast/services/getTableData';
							break;
						}
					}

					this.$myRequest({
						url: url,
						method: 'POST',
						data: {
							"page": this.number,
							"per_page": 10
						},
					}).then(res => {
						if (this.flag == "PERSON") {
							this.dataList2 = this.dataList2.concat(res.result.list)
						} else {
							this.dataList = this.dataList.concat(res.result.list)
						}
						this.mescroll.endSuccess();
						this.mescroll.endBySize(res.result.pagination.pageSize, res.result.pagination
							.total); //必传参数(当前页的数据个数, 总页数)
					})
				}
				// getRightInfo({
				// 		ID: Date.now()
				// 	}, {
				// 		pages: page.num,
				// 		size: page.size
				// 	})
				// 	.then(curPageData => {
				// 		console.log(curPageData.data.data);
				// 		//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
				// 		//mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;

				// 		//方法一(推荐): 后台接口有返回列表的总页数 totalPage
				// 		//this.mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)

				// 		//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
				// 		//this.mescroll.endBySize(curPageData.length, totalSize); //必传参数(当前页的数据个数, 总数据量)

				// 		//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
				// 		//this.mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)

				// 		//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据.
				// 		this.mescroll.endSuccess(curPageData.length);

				// 		//设置列表数据
				// 		this.dataList = this.dataList.concat(curPageData.data.data);
				// 	})
				// 	.catch(err => {
				// 		//联网失败, 结束加载
				// 		this.mescroll.endErr();
				// 	});
			},
		}
	}
</script>

<style>
	.flex-item {
		width: 25%;
		height: 120rpx;

		text-align: center;
		line-height: 120rpx;
		margin: 10rpx;
		background-color: #007AFF;
		border-radius: 10rpx;
	}

	.flex-item2 {
		width: 25%;
		height: 120rpx;

		text-align: center;
		line-height: 120rpx;
		margin: 10rpx;
		background-color: #007AFF;
		border-radius: 10rpx;
	}

	.listcontent {
		width: 100%;
		display: flex;

	}

	.textcontent {
		text-align: left;
	}

	.texttitle {
		font-size: 26rpx;
		font-weight: bold;
		color: #000000;
	}

	.text {
		font-size: 24rpx;
		color: #000000;
	}

	.per_left {
		width: 30%;
	}

	.tabs-wrapper {
		height: 80upx;
		width: 100%;
		flex-shrink: 0;
	}

	.tabs-wrap {
		height: 100%;
		display: flex;
		flex-wrap: nowrap;
	}

	.tabs-item {
		font-size: 26upx;
		color: #050505;
		height: 100%;
		padding: 0 30upx;
		word-wrap: normal;
		white-space: nowrap;
		display: flex;
		align-items: center;

		&.selected {
			color: #ff9900;
		}
	}
</style>
