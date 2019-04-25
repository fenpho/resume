/*
 主页面的js文件
*/
$(document).scroll(function(){
	if($(document).scrollTop() > 0){
		$(".navbar").addClass("fixed");
	}else{
		$(".navbar").removeClass("fixed");
	}
});

// 设置轮播图的宽度
$("#carousel").css({
		"width":$(window).width(),
		"height":$(window).width()*0.26042
});
$(window).resize(function(){
	$("#carousel").css({
		"width":$(window).width(),
		"height":$(window).width()*0.26042
	});
});

//轮播图代码
//图片li
var $imageLis = $(".imageslist li");
//图片列表
var $images = $(".imageslist li img");

//猫腻
var $boom = $(".boom");
//信号量
var idx = 0;

//防流氓
var lock = true;
var timer = setInterval(RightHandle,2500);
$("#carousel").mouseover(function(){
	clearInterval(timer);
});
$("#carousel").mouseout(function(){
	timer = setInterval(RightHandle,2500);
});

//右按钮添加事件监听
$("#rightBtn").click(function(){
	RightHandle();
})
function RightHandle(){
	if(!lock) return;
	//点击右按钮之后
	//第一步，要生成猫腻元素生成横向10个，纵向6个。6行10列。
	//每个碎片宽度，高度
	var boom_width =  $imageLis.width() / 10;
	var boom_height =  $imageLis.height() / 6;
	for(var row = 0 ; row < 6 ; row++){
		for(var col = 0 ; col < 10 ; col++){
			$("<div></div>")
			.css({
				"left" : col * boom_width,
				"top" : row * boom_height,
				"width" : boom_width,
				"height" : boom_height,
				"background-image" : "url(" + $images.eq(idx).attr("src") + ")",
				"background-position" : -col * boom_width + "px " + (-row * boom_height) + "px"
			})
			.appendTo($boom);
		}
	}

	//第二步，让生成的猫腻瞬间飞走。
	//transition需要准备时间，所以就需要给1毫秒之后给父亲加fei类
	setTimeout(function(){
		$boom.find("div").each(function(i){
			$(this).css({
				"transform":"rotateX(" + (Math.random() * 360 - 180) + "deg) rotateY(" +  (Math.random() * 360 - 180) + "deg) translateZ(900px)",
				"opacity" : 0
			});
		})
	},1);
		
	// //第三步骤，换图
	idx++;
	if(idx > $imageLis.length - 1){
		idx = 0;
	}
	$imageLis.eq(idx).addClass("cur").siblings().removeClass("cur");
	$(".circles ol li").eq(idx).addClass("cur").siblings().removeClass("cur");


	lock = false;
	//第四步骤，猫腻div没有用了，杀掉他们
	//没有回调函数，所以我们只能用setTimeout()模拟回调函数
	setTimeout(function(){
		$boom.html("");
		lock = true;
	},1000)
}

//左按钮添加事件监听
$("#leftBtn").click(function(){
	if(!lock) return;
	//点击右按钮之后
	//第一步，要生成猫腻元素生成横向10个，纵向6个。6行10列。
	//每个碎片宽度，高度
	var boom_width =  $imageLis.width() / 10;
	var boom_height =  $imageLis.height() / 6;
	for(var row = 0 ; row < 6 ; row++){
		for(var col = 0 ; col < 10 ; col++){
			$("<div></div>")
			.css({
				"left" : col * boom_width,
				"top" : row * boom_height,
				"width" : boom_width,
				"height" : boom_height,
				"background-image" : "url(" + $images.eq(idx).attr("src") + ")",
				"background-position" : -col * boom_width + "px " + (-row * boom_height) + "px"
			})
			.appendTo($boom);
		}
	}

	//第二步，让生成的猫腻瞬间飞走。
	//transition需要准备时间，所以就需要给1毫秒之后给父亲加fei类
	setTimeout(function(){
		$boom.find("div").each(function(i){
			$(this).css({
				"transform":"rotateX(" + (Math.random() * 360 - 180) + "deg) rotateY(" +  (Math.random() * 360 - 180) + "deg) translateZ(900px)",
				"opacity" : 0
			});
		})
	},1);
		
	// //第三步骤，换图
	idx--;
	if(idx < 0){
		idx = $imageLis.length - 1;
	}
	$imageLis.eq(idx).addClass("cur").siblings().removeClass("cur");
	$(".circles ol li").eq(idx).addClass("cur").siblings().removeClass("cur");


	lock = false;
	//第四步骤，猫腻div没有用了，杀掉他们
	//没有回调函数，所以我们只能用setTimeout()模拟回调函数
	setTimeout(function(){
		$boom.html("");
		lock = true;
	},1000)
});
//小圆点监听
$(".circles ol li").click(function(){
	if(!lock) return;
	//点击右按钮之后
	//第一步，要生成猫腻元素生成横向10个，纵向6个。6行10列。
	//每个碎片宽度，高度
	var boom_width =  $imageLis.width() / 10;
	var boom_height =  $imageLis.height() / 6;
	for(var row = 0 ; row < 6 ; row++){
		for(var col = 0 ; col < 10 ; col++){
			$("<div></div>")
			.css({
				"left" : col * boom_width,
				"top" : row * boom_height,
				"width" : boom_width,
				"height" : boom_height,
				"background-image" : "url(" + $images.eq(idx).attr("src") + ")",
				"background-position" : -col * boom_width + "px " + (-row * boom_height) + "px"
			})
			.appendTo($boom);
		}
	}

	//第二步，让生成的猫腻瞬间飞走。
	//transition需要准备时间，所以就需要给1毫秒之后给父亲加fei类
	setTimeout(function(){
		$boom.find("div").each(function(i){
			$(this).css({
				"transform":"rotateX(" + (Math.random() * 360 - 180) + "deg) rotateY(" +  (Math.random() * 360 - 180) + "deg) translateZ(900px)",
				"opacity" : 0
			});
		})
	},1);
		
	// //第三步骤，换图
	idx = $(this).index();
	console.log(idx);
	$imageLis.eq(idx).addClass("cur").siblings().removeClass("cur");
	$(this).addClass("cur").siblings().removeClass("cur");
	lock = false;

	//第四步骤，猫腻div没有用了，杀掉他们
	//没有回调函数，所以我们只能用setTimeout()模拟回调函数
	setTimeout(function(){
		$boom.html("");
		lock = true;
	},1000)
});



		