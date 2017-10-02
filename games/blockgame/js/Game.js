(function(){
    //中介者模式
    window.Game = Class.extend({
        // 初始化
        init : function(params){
            //画布、上下文，都是game的属性
            this.canvas = document.getElementById(params.canvasid);
            this.ctx = this.canvas.getContext("2d");
            //帧率
            this.fps = params.fps;
            //当前游戏状态
            this.state = 0; //0表示黏在挡板上；1表示飞出去

            //静态资源管理
            var sr = new StaticResoucesUtil();
            //这个对象里面，存放着所有图片
            this.images = null;
            var self = this;
            sr.loadImages("r.json",function(alreayNum,allNum,images){
                //这个函数，将执行3次（因为一共有3张图片）
                self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
                self.ctx.font = "20px 微软雅黑";
                self.ctx.fillText("正在加载图片资源，当前" + alreayNum + " / " + allNum,20,40);
                //当全部图片已经加载完毕，那么开始游戏
                if(alreayNum == allNum){
                    self.run();
                    self.images = images;
                }
            });
        },
        //开始
        run : function(){
            //实例化一个砖块管理器
            this.bm = new BlockManager();
            //实例化一个挡板
            this.racket = new Racket();
            //实例化一个球
            this.ball = new Ball();

            //设置主循环
            var self = this;
            this.timer = setInterval(function(){
                self.mainloop();
            },1000 / this.fps);
        },
        // 每帧执行
        mainloop : function(){
            //清除屏幕
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

            //调用BlockManager提供的渲染所有方块方法
            this.bm.updateAllBlocks();
            this.bm.renderAllBlocks();

            //更新、渲染挡板
            this.racket.render();

            //更新、渲染小球
            this.ball.update();
            this.ball.render();
        },
        stop : function(){
            clearInterval(this.timer);
        }
    });
})();