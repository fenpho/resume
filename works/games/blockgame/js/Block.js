(function(){
    //����������
    window.Block = Class.extend({
        //���캯����row�кţ�col�кţ�color��ɫ
        //col�ĺϷ�ֵΪ0~7
        //row�ĺϷ�ֵ0~8
        //color�ĺϷ�ֵΪ1~5
        init : function(row,col,color){
            this.row = row;
            this.col = col;
            this.color = color;
            this.x = 100 + this.col * 99;
            this.y = 50 + this.row * 40;
        },
        //ÿִ֡��
        update : function(){
            //��ײ���
            //�Լ���û�б�С��ײ���������ײ���ˣ�����blockManager�����blocks����
            //��Ӧλ�ø�Ϊnull
            //����Ƿ��������С����Ķ��ߡ��ױ�
            if((game.ball.x > this.x - 14) && (game.ball.x < this.x + 94 + 14)){
                if(game.ball.y > this.y + 36 && game.ball.y < this.y + 36 + 14 || game.ball.y > this.y - 14 && game.ball.y < this.y){
                    //�����˶��ߡ����������˵ױ�
                    game.bm.blocks[this.row][this.col] = null;
                    //����
                    game.ball.angle = 360 - game.ball.angle;
                }
            }

            //����Ƿ��������С�������ߡ��ұ�
            if(game.ball.y > this.y && game.ball.y < this.y + 36){
                if(game.ball.x > this.x - 14 && game.ball.x < this.x || game.ball.x > this.x + 94 && game.ball.x < this.x + 94 + 14){
                    //��������ߡ��ұ�
                    game.bm.blocks[this.row][this.col] = null;
                    //����
                    game.ball.angle = 180 - game.ball.angle;
                }
            }
        },
        render : function(){
            game.ctx.drawImage(game.images.block,(this.color - 1) * 97,0,94,36,this.x,this.y,94,36);
        }
    });
})();