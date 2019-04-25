(function(){
    window.BlockManager = Class.extend({
        //初始化
        init : function(){
            //抽象地图的。
            this.map = [
                [0,1,0,0,0,0,1,0],
                [1,0,0,0,0,0,0,1],
                [0,4,4,4,4,4,4,0],
                [0,3,3,3,3,3,3,0],
                [0,2,2,2,2,2,2,0],
                [0,1,1,1,1,1,1,0],
                [1,0,0,0,0,0,0,1],
                [0,1,0,0,0,0,1,0],
                [0,0,0,0,0,0,0,0]
            ];

            //真实转块
            this.blocks = [
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null]
            ];

            //调用函数
            this.creatBlocksByMyMap();
        },
        // 根据地图创建砖块。
        creatBlocksByMyMap : function(){
            //循环遍历map，根据map，new出来很多block对象，放入blocks数组里面
            for(var r = 0 ; r < 9 ; r++){
                for(var c = 0 ; c < 8 ; c++){
                    //下面的语句，是一个短路算法，
                    //如果this.map[r][c]不是0，那么执行后面的语句：
                    this.map[r][c] && (this.blocks[r][c] = new Block(r,c,this.map[r][c]));
                }
            }
        },
        //更新所有方块
        updateAllBlocks : function(){
            for(var r = 0 ; r < 9 ; r++){
                for(var c = 0 ; c < 8 ; c++){
                    //下面的语句，是一个短路算法，
                    //如果this.map[r][c]不是0，那么执行后面的语句：
                    this.blocks[r][c] && this.blocks[r][c].update();
                }
            }
        },
        //渲染所有方块
        renderAllBlocks : function(){
            for(var r = 0 ; r < 9 ; r++){
                for(var c = 0 ; c < 8 ; c++){
                    //下面的语句，是一个短路算法，
                    //如果this.map[r][c]不是0，那么执行后面的语句：
                    this.blocks[r][c] && this.blocks[r][c].render();
                }
            }
        }
    });
})();