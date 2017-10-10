//容器
$container = $(".container");

//信号量，合法的信号量的值是1、2、3、4、5、6、7
var idx = 1;

//函数节流
var lock = true;

//一上来就要调用首屏的进场动画
inArray[1]();	



//导航条的信号量和eq为几的li有cur。对应关系数组。
//信号量为1的时候，第0个li有cur
//信号量为2的时候，第0个li有cur
//信号量为3的时候，第1个li有cur
//信号量为4的时候，第2个li有cur
//信号量为5的时候，第3个li有cur
//信号量为6的时候，第4个li有cur
//信号量为7的时候，第5个li有cur
var arr = [null,0,0,1,2,3,4,5];

//监听鼠标滚轮事件
$(document).mousewheel(function(event,delta){
	if(!lock) return;
	event.preventDefault();
	//备份老的信号量值
	var oldidx = idx;
	//鼠标滚轮向下滚，delta值为-1，但是我们希望页面1→2，所以-(-1)就是加1。
	idx -= delta;
	if(idx < 1){
		idx = 1;
	}else if(idx > 7){
		idx = 7;
	}

	//执行相应的函数
	if(idx != oldidx){
		//调用进场和出场的动画
		inArray[idx]();
		outArray[oldidx]();


		//过河拆桥，把锁锁上，防止动画积累
		lock = false;

		//主要动画语句，让容器进行移动
		$container.animate({"top" : -100 * (idx - 1) + "%"},500,"easieEaseInQuint");
		
		setTimeout(function(){
			lock = true;
		},1500);

		//切换导航条的cur
		$(".nav li").eq(arr[idx]).addClass('cur').siblings().removeClass('cur');
	}
});




//nav的监听
$(".nav ul li a[data-go]").click(function(){
	if(!lock) return;
	//备份老信号量
	var oldidx = idx;

	idx = parseInt($(this).attr("data-go"));

	if(idx != oldidx){
		inArray[idx]();
		outArray[oldidx]();

		$container.animate({"top" : -100 * (idx - 1) + "%"},500,"easieEaseInQuint");

		//切换导航条的cur
		$(this).parent("li").addClass('cur').siblings().removeClass('cur');
	}

	lock = false;
	setTimeout(function(){
		lock = true;
	},1500);
});