(function(){
    /**
     * 细胞方块类
     * 有行、列、颜色属性。有渲染方法。
     * */
    window.CellBlock = Class.extend({
        //合法值，row：0~23   col：0~11    color：1~7
        init : function(row,col,color){
            this.row = row;
            this.col = col;
            this.color = color;
        },
        render : function(){
            //渲染context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
            game.ctx.drawImage(game.images.cellBlock,20 * (this.color - 1),0,20,20,this.col * 20,this.row * 20,20,20);
        }
    });
})();