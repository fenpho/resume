(function(){
    /**
     * ϸ��������
     * ���С��С���ɫ���ԡ�����Ⱦ������
     * */
    window.CellBlock = Class.extend({
        //�Ϸ�ֵ��row��0~23   col��0~11    color��1~7
        init : function(row,col,color){
            this.row = row;
            this.col = col;
            this.color = color;
        },
        render : function(){
            //��Ⱦcontext.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
            game.ctx.drawImage(game.images.cellBlock,20 * (this.color - 1),0,20,20,this.col * 20,this.row * 20,20,20);
        }
    });
})();