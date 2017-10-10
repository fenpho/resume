/**
 * Huxi函数，用来制作呼吸轮播
 * @param ID : 最大盒子的ID
 * @param autoPlay : 自动轮播的间隔时间
 * @param animateTime : 动画运动的时间
 **/
(function(){
	if(!$){
		throw new Error("组件依赖jQuery，请引用jQuery");
	}
	//构造函数
	var Huxi = window.Huxi = function(argsJSON){
		//得到元素
		this.$carousel = $("#" + argsJSON.ID);
		this.$leftBtn = this.$carousel.find(".leftBtn");
		this.$rightBtn = this.$carousel.find(".rightBtn");
		this.$imageListLis = this.$carousel.find(".imageList ul li");
		this.$circlesLis = this.$carousel.find(".circles ol li");

		this.imageAmount = this.$imageListLis.length;

		//动画时间
		this.animateTime = argsJSON.animateTime || 400;
		this.autoPlay = argsJSON.autoPlay || 1500;
		this.idx = 0;

		//绑定监听
		this.bindEvent();

		//定时器自动轮播
		if(argsJSON.autoPlay){
			this.autoPlay = argsJSON.autoPlay;
			this.auto();
		}
	}
	//呼吸的方式显示下一张
	Huxi.prototype.next = function(){
		//函数截流
		if(this.$imageListLis.is(":animated")) return;
		//老图淡出
		this.$imageListLis.eq(this.idx).fadeOut(this.animateTime);
		this.idx ++;
		if(this.idx > this.imageAmount - 1){
			this.idx = 0;
		}
		//新图淡入
		this.$imageListLis.eq(this.idx).fadeIn(this.animateTime);
		//改变小圆点
		this.changeCircle();
	}

	//呼吸的方式显示上一张
	Huxi.prototype.prev = function(){
		//函数截流
		if(this.$imageListLis.is(":animated")) return;
		//老图淡出
		this.$imageListLis.eq(this.idx).fadeOut(this.animateTime);
		this.idx --;
		if(this.idx < 0){
			this.idx = this.imageAmount - 1;
		}
		//新图淡入
		this.$imageListLis.eq(this.idx).fadeIn(this.animateTime);
		//改变小圆点
		this.changeCircle();
	}

	Huxi.prototype.goto = function(num){
		//函数截流
		if(this.$imageListLis.is(":animated")) return;
		//老图淡出
		this.$imageListLis.eq(this.idx).fadeOut(this.animateTime);
		//信号量改变
		this.idx = num;
		//新图淡入
		this.$imageListLis.eq(this.idx).fadeIn(this.animateTime);
		//改变小圆点
		this.changeCircle();
	}
	//改变小圆点，让信号量那个小圆点有cur
	Huxi.prototype.changeCircle = function(){
		this.$circlesLis.eq(this.idx).addClass("cur").siblings().removeClass("cur");
	}
	//绑定监听
	Huxi.prototype.bindEvent = function(){
		var self = this;
		//按钮
		//如果按钮存在
		if(this.$rightBtn.length > 0){
			this.$rightBtn.click(function(){
				self.next();
			});
		}
			
		if(this.$leftBtn.length > 0){
			this.$leftBtn.click(function(){
				self.prev();
			});
		}

		//小圆点
		this.$circlesLis.click(function(){
			self.goto($(this).index());
		});

		//鼠标进入、离开
		this.$carousel.mouseenter(function(){
			clearInterval(self.timer);
		});

		this.$carousel.mouseleave(function(){
			self.auto();
		});
	}

	// 自动轮播
	Huxi.prototype.auto = function(){
		//备份
		var self = this;
		//定时器
		clearInterval(this.timer);	//设表先关
		this.timer = setInterval(function(){
			self.next();
		},this.autoPlay);
	}
})();