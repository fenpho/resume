(function () {
    //����
    window.Bird = Class.extend({
        init: function () {
            this.x = (game.canvas.width - 85) / 2;
            this.y = 100;
            this.w = 85;
            this.h = 60;
            //�����̬���Ϸ�ֵ0��1��2
            this.swing = 0;
            //y�ı仯ֵ
            this.dY = 1;
            //��ʼ�����֡��
            this.dropStatFram = game.frameUtil.currentFrame;
            //��ķ���
            this.ro = 0;
            //��Ӽ���
            this.bindClickListener();
            //С���״̬
            this.state = 0; //0�����½���1������
            //
            this.deltaY = 1;
            //���ɿ���ٶ�
            this.swingSpeed = 5;
            //�Ƿ��Ѿ�����
            this.die = false;
            //����Ѫ������
            this.dieAnimate = 0;
        },
        // ���Ϸ�
        fly : function(){
            // �ı�״̬
            this.state = 1;
            // �ı�Ƕ�
            this.ro = -25;
            // ���Ե�ÿ֡�ƶ��ľ���
            this.deltaY = 1;
            // �ı����ٶ�
            this.swingSpeed = 2;
        },
        //ÿ֡��Ҫִ��
        update: function () {
            //���С������
            if(this.die){
                this.dieAnimate ++;
                if(this.dieAnimate == 30){
                    game.pause();
                }
                return;
            }
            //����ɿ��
            //�����ǰ��֡�����5�ı�������ô�����
            if (game.frameUtil.currentFrame % this.swingSpeed == 0) {
                this.swing++;
                if (this.swing > 2) {
                    this.swing = 0;
                }
            }

            //�����ǰС��״̬��0
            if(this.state == 0) {
                this.swingSpeed = 5;
                //dY�ٱ仯������Խ��Խ��
                this.dY = 0.010 * Math.pow(game.frameUtil.currentFrame - this.dropStatFram, 2);
                //��ת�ĸı�
                this.ro++;
            }else if(this.state == 1){
                //С������
                this.deltaY += 1;
                this.dY = -14 + this.deltaY;

                //С�������ļ��ޣ�����������һ˲�䣬����120px
                if(this.dY > 0){
                    //���䣺
                    this.state = 0;
                    this.dropStatFram = game.frameUtil.currentFrame;
                }
            }
            //y�ĸı�
            this.y += this.dY;

            //����
            if(this.y < 0){
                this.y = 0;
            }
            //���ذ�
            if(this.y > game.canvas.height - 50 - this.h){
                game.gameover();
            }
        },
        render: function () {
            //���С���Ѿ�����
            if(this.die){
                var row = parseInt(this.dieAnimate / 5);
                var col = this.dieAnimate % 5;
                game.ctx.drawImage(game.images.blood,325 * col , 138*row,325,138,this.x - 155,this.y + 50,325,138)
                return;
            }
            // ��ת��ʽ
            game.ctx.save();
            game.ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
            game.ctx.rotate((Math.PI / 180) * this.ro);
            game.ctx.translate(-(this.x + this.w / 2 ), -( this.y + this.h / 2));
            game.ctx.drawImage(game.images.bird, this.swing * this.w, 0, this.w, this.h, this.x, this.y, this.w, this.h);
            game.ctx.restore();
        },
        //�󶨼���
        bindClickListener : function(){
            var self = this;
            game.canvas.addEventListener("mousedown",function(){
                self.fly();
            });

            game.canvas.addEventListener("touchstart",function(e){
                e.preventDefault();
                self.fly();
            });
        }
    });
})();