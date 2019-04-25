(function(){
    window.Racket = Class.extend({
        init : function(){
            //λ����Ļ����
            this.x = game.canvas.width / 2 - 90;
            this.y = 500;
            //�󶨼���
            this.bindListener();
        },
        render : function(){
            game.ctx.drawImage(game.images.racket,this.x,this.y);
        },
        //��������
        bindListener : function(){
            var self = this;
            //����ƶ����¼�����
            game.canvas.addEventListener("mousemove",function(event){
                console.log(event.offsetX);
                self.x = event.offsetX;
                //���ܳ����ұ߽�
                if(self.x > game.canvas.width - 179){
                    self.x = game.canvas.width - 179;
                }
                //���ܳ�����߽�
                if(self.x < 0){
                    self.x = 0;
                }


            });

            //�����¼�����
            game.canvas.addEventListener("mousedown",function(event){
                //��Ϸ״̬�ı�
                game.state = 1;
            });
        }
    });
})();