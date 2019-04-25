/**
 * carousel函数，用来制作传统轮播
 * @param ID : 最大盒子的ID
 * @param autoPlay : 自动轮播的间隔时间
 * @param animateTime : 动画运动的时间
 **/
(function(){
	if(!$){
		throw new Error("组件依赖jQuery，请引用jQuery");
	}
	//构造函数
	var Carousel = window.Carousel = function(argsJSON){
		//得到元素
		this.$carousel = $("#" + argsJSON.ID);
		this.$leftBtn = this.$carousel.find(".leftBtn");
		this.$rightBtn = this.$carousel.find(".rightBtn");
		this.$imageListLis = this.$carousel.find(".m_unit");
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
	Carousel.prototype.next = function(){
		//函数截流
		if(this.$imageListLis.is(":animated")) return;
		//左移动
		this.idx ++;
		this.$imageListLis.eq(this.idx).animate({"left" : -1000 * this.idx},300,function(){
			if(this.idx > this.imageAmount - 1){
				this.idx = 0;
			}
		});
		//改变小圆点
		this.changeCircle();
	}

	//呼吸的方式显示上一张
	Carousel.prototype.prev = function(){
		//函数截流
		if(this.$imageListLis.is(":animated")) return;
		//老图右移动
		this.idx --;
		if(this.idx < 0){
			this.idx = this.imageAmount - 1;
		}
		this.$imageListLis.eq(this.idx).animate({"left" : 1000 * this.idx},300);

		//改变小圆点
		this.changeCircle();
	}

	Carousel.prototype.goto = function(num){
		//函数截流
		if(this.$imageListLis.is(":animated")) return;
		this.$imageListLis.eq(this.idx).animate({"left" : 1000 * this.idx},300).fadeOut(1);
		this.idx = num;
		this.$imageListLis.eq(this.idx).fadeIn(1).animate({"left" : 1000 * this.idx},300);
		//改变小圆点
		this.changeCircle();
	}
	//改变小圆点，让信号量那个小圆点有cur
	Carousel.prototype.changeCircle = function(){
		this.$circlesLis.eq(this.idx).addClass("cur").siblings().removeClass("cur");
	}
	//绑定监听
	Carousel.prototype.bindEvent = function(){
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
	Carousel.prototype.auto = function(){
		//备份
		var self = this;
		//定时器
		clearInterval(this.timer);	//设表先关
		this.timer = setInterval(function(){
			self.next();
		},this.autoPlay);
	}
})();