(function(){
    //�����
    window.ScoreManager = Class.extend({
        init : function(){
            this.score = 0;
        },
        addPoint : function(){
            this.score++;
        },
        update : function(){

        },
        render : function(){
            //������ǰ�ķ����м�λ
            var weishu = this.score.toString().length;

            //�ж�λ������������ż��
            //����
            //��׼λ�þ��ǵ�һ�����ֵ�xֵ
            var jizhunwei = game.canvas.width / 2 - (40 * weishu) / 2;

            //ѭ����䣬ѭ������ÿһλ
            for(var i = 0 ; i < weishu ; i++){
                var zheyiwei = parseInt(this.score.toString().substr(i,1));
                render1weishu(zheyiwei,jizhunwei + i * 40 ,100);
            }
        }
    });

    //��Ⱦһλ����
    function render1weishu(num,x,y){
        game.ctx.drawImage(game.images.number,40 * num , 0, 40,57,x,y,40,57);
    }
})();