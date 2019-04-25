(function(){
    window.BlockManager = Class.extend({
        //��ʼ��
        init : function(){
            //�����ͼ�ġ�
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

            //��ʵת��
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

            //���ú���
            this.creatBlocksByMyMap();
        },
        // ���ݵ�ͼ����ש�顣
        creatBlocksByMyMap : function(){
            //ѭ������map������map��new�����ܶ�block���󣬷���blocks��������
            for(var r = 0 ; r < 9 ; r++){
                for(var c = 0 ; c < 8 ; c++){
                    //�������䣬��һ����·�㷨��
                    //���this.map[r][c]����0����ôִ�к������䣺
                    this.map[r][c] && (this.blocks[r][c] = new Block(r,c,this.map[r][c]));
                }
            }
        },
        //�������з���
        updateAllBlocks : function(){
            for(var r = 0 ; r < 9 ; r++){
                for(var c = 0 ; c < 8 ; c++){
                    //�������䣬��һ����·�㷨��
                    //���this.map[r][c]����0����ôִ�к������䣺
                    this.blocks[r][c] && this.blocks[r][c].update();
                }
            }
        },
        //��Ⱦ���з���
        renderAllBlocks : function(){
            for(var r = 0 ; r < 9 ; r++){
                for(var c = 0 ; c < 8 ; c++){
                    //�������䣬��һ����·�㷨��
                    //���this.map[r][c]����0����ôִ�к������䣺
                    this.blocks[r][c] && this.blocks[r][c].render();
                }
            }
        }
    });
})();