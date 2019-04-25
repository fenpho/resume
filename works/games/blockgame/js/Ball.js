(function(){
    window.Ball = Class.extend({
        init : function(){
            this.x = 400;
            this.y = 100;

            this.speed = 6;
            this.angle = -30;
        },
        // 每帧执行
        update : function(){
            //如果游戏状态是0，那么小球就黏在挡板上
            if(game.state == 0){
                this.x = game.racket.x + 90 - 14;
                this.y = game.racket.y - 27;
            }else if(game.state == 1){
                //小球飞走
                this.x += Math.cos(this.angle * Math.PI / 180) * this.speed;
                this.y += Math.sin(this.angle * Math.PI / 180) * this.speed;


                //判断小球是否撞到了右边、左边
                if(this.x > game.canvas.width - 14 || this.x < 14){
                    this.angle = 180 - this.angle;
                }

                //判断小球是否撞到了顶
                if(this.y < 14){
                    this.angle = 360 - this.angle;
                }

                //判断小球是否撞到了挡板
                if(this.x > game.racket.x - 14 && this.x < game.racket.x + 179 + 14){
                    if(this.y > game.racket.y - 14){
                        this.angle = 360 - this.angle;
                    }
                }

                //检测游戏失败
                if(this.y > game.racket.y + 14){
                    game.state = 0;
                    game.angle = -30;
                }
            }
        },
        // 每帧执行
        render : function(){
            game.ctx.drawImage(game.images.ball,this.x,this.y);
        }
    });
})();