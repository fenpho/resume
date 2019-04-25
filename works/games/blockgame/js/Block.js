(function(){
    //独立方块类
    window.Block = Class.extend({
        //构造函数，row行号，col列号，color颜色
        //col的合法值为0~7
        //row的合法值0~8
        //color的合法值为1~5
        init : function(row,col,color){
            this.row = row;
            this.col = col;
            this.color = color;
            this.x = 100 + this.col * 99;
            this.y = 50 + this.row * 40;
        },
        //每帧执行
        update : function(){
            //碰撞检测
            //自己有没有被小球撞到，如果被撞到了，将把blockManager里面的blocks矩阵
            //对应位置改为null
            //检测是否碰到这个小方格的顶边、底边
            if((game.ball.x > this.x - 14) && (game.ball.x < this.x + 94 + 14)){
                if(game.ball.y > this.y + 36 && game.ball.y < this.y + 36 + 14 || game.ball.y > this.y - 14 && game.ball.y < this.y){
                    //碰到了顶边、或者碰到了底边
                    game.bm.blocks[this.row][this.col] = null;
                    //反弹
                    game.ball.angle = 360 - game.ball.angle;
                }
            }

            //检测是否碰到这个小方格的左边、右边
            if(game.ball.y > this.y && game.ball.y < this.y + 36){
                if(game.ball.x > this.x - 14 && game.ball.x < this.x || game.ball.x > this.x + 94 && game.ball.x < this.x + 94 + 14){
                    //碰到了左边、右边
                    game.bm.blocks[this.row][this.col] = null;
                    //反弹
                    game.ball.angle = 180 - game.ball.angle;
                }
            }
        },
        render : function(){
            game.ctx.drawImage(game.images.block,(this.color - 1) * 97,0,94,36,this.x,this.y,94,36);
        }
    });
})();