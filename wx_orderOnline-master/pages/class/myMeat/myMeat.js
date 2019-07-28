// pages/orderFood/orderFood.js
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		//scrollview 高度
		windowHeight: 0,
		currentTab: 0,
		cart: [],
		cartTotal: 0,
		cartTotalPrice: 0,
		foodList: [
			{
				id: 0,
				name: '火锅肉片'
			},
			{
				id: 1,
				name: '羊肉'
			},
			{
				id: 2,
				name: '牛肉'
			},
			{
				id: 3,
				name: '牛排'
			},
			{
				id: 4,
				name: '猪肉'
			}
		],

	},

	/**
	 * 生命周期函数--监听页面加载
	 */

	//改变当前导航
	changeNav: function (event) {
		this.setData({
			currentTab: event.target.dataset.currentab,
		})
	},
	//添加菜品操作
	ordinInCart: function (event) {
		console.log(event);
		let id = event.currentTarget.dataset.id;
		let stock = event.currentTarget.dataset.stock;
		if (stock) {
			this.changes(id);
		} else {		
		}
	},
	//改变按钮，购物车操作
	changes: function (id) {
		var carts = app.globalData.carts;
		
		
		for (let key of this.data.classifyList) {
			key.forEach((item) => {
				if (item.id == id  && item.stock) {
					if (!item.selected) {
						console.log("addsuccess");
						carts.push(item);
						app.globalData.cartTotal++;
						app.globalData.cartTotalPrice += item.price;
						item.selected = true;
					}else if(item.selected){
						app.globalData.carts = carts.filter((cartItem)=>{   //filter返回新数组，所以不能用carts接受，
																			//不然app.globalData.carts不能改变
						 	return cartItem.id !=id;
						 }); 
						console.log("deletesuccess");
						app.globalData.cartTotal--;
						app.globalData.cartTotalPrice -= item.price;
						item.selected = false;
					}
				}
			});
		}
		// app.globalData.cartTotal += this.data.cartTotal;
		// app.globalData.cartTotalPrice += this.data.cartTotalPrice;
		this.setData({
			cart : app.globalData.carts,
			cartTotal: app.globalData.cartTotal,
			cartTotalPrice : app.globalData.cartTotalPrice,
			classifyList: this.data.classifyList,
		});
		app.globalData.classifyList.myMeat=this.data.classifyList;
		   //将信息加入全局的购物车中
		console.log(app.globalData.carts);
	},

	onLoad: function (options) {
		
		console.log(options);
		wx.getSystemInfo({
			success: (res) => {
				console.log(res);
			  this.setData({
				windowHeight: res.windowHeight
			  })
			  console.log(`屏幕高度：${res.windowHeight}`);
			}
      })
      this.setData({
        cart : app.globalData.carts,
        cartTotal: app.globalData.cartTotal,
        cartTotalPrice : app.globalData.cartTotalPrice,
        classifyList: app.globalData.classifyList.myMeat,
	  });
	  console.log(this.data.classifyList);
	  console.log("ss");
	},
	gotoCart:function(){
		wx.switchTab({
			url: `/pages/myCart/myCart`,
		  })
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		this.setData({
			cart : app.globalData.carts,
			cartTotal: app.globalData.cartTotal,
			cartTotalPrice : app.globalData.cartTotalPrice,
			classifyList: app.globalData.classifyList.myMeat,
		  });
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})