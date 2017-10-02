/**
 * Created by Fenpho on 2017年1月12日12:24:35
 */
(function(){
    //中介者模式
    window.Game = Class.extend({
        // 初始化
        init : function(params){
            //画布、上下文，都是game的属性
            this.canvas = document.getElementById(params.canvasid);
            //创建一个二维渲染上下文对象
            this.ctx = this.canvas.getContext("2d");
            //帧率
            this.fps = params.fps;
            this.goDown = 1;
            //静态资源管理
            var sr = new StaticResoucesUtil();
            //这个对象里面，存放着所有图片
            this.images = null;
            var self = this;
            sr.loadImages("r.json",function(alreayNum,allNum,images){
                //这个函数，将执行1次（因为一共有1张图片）
                self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
                self.ctx.font = "20px 微软雅黑";
                self.ctx.fillText("正在加载图片资源，当前" + alreayNum + " / " + allNum,20,40);
                //当全部图片已经加载完毕，那么开始游戏
                if(alreayNum == allNum){
                    self.run();
                    self.images = images;
                }
            });
            //自己的帧管理器
            this.frameUtil = new FrameUtil();
        },
        //开始
        run : function(){
            //自己的地图
            this.map = new Map();
            //调用自己地图的方法
            this.map.creatBlocksByMap();
            //当前活动方块
            this.activeBlock = new ActiveBlock();
            //调用自己活动方块的方法，命令活动方块里面的4*4矩阵根据地图来new细胞
            this.activeBlock.createFFBlocksByMap();

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
            //让自己的帧管理器更新
            this.frameUtil.update();
            //打印帧编号
            this.ctx.fillText(this.frameUtil.currentFrame,300,20);
            //渲染所有的已经存在的方块（方块的尸体）
            this.map.renderAllExistBlocks();
            //调用自己活动方块的方法，命令活动方块渲染
            this.activeBlock.render();


            //转块下落
            if(this.frameUtil.currentFrame % 10 == 0){
                this.activeBlock.goDown();
            }
        },
        stop : function(){
            clearInterval(this.timer);
        }
    });
})();