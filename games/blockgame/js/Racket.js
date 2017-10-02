(function(){
    window.Racket = Class.extend({
        init : function(){
            //位于屏幕中心
            this.x = game.canvas.width / 2 - 90;
            this.y = 500;
            //绑定监听
            this.bindListener();
        },
        render : function(){
            game.ctx.drawImage(game.images.racket,this.x,this.y);
        },
        //绑定鼠标监听
        bindListener : function(){
            var self = this;
            //鼠标移动的事件监听
            game.canvas.addEventListener("mousemove",function(event){
                console.log(event.offsetX);
                self.x = event.offsetX;
                //不能超过右边界
                if(self.x > game.canvas.width - 179){
                    self.x = game.canvas.width - 179;
                }
                //不能超过左边界
                if(self.x < 0){
                    self.x = 0;
                }


            });

            //单击事件监听
            game.canvas.addEventListener("mousedown",function(event){
                //游戏状态改变
                game.state = 1;
            });
        }
    });
})();