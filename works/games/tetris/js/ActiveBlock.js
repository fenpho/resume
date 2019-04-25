/**
 * Created by Fenpho on 2017��1��14��08:29:15
 */
(function(){
    var allType = {
        "I" : [["0010","0010","0010","0010"],
               ["0000","1111","0000","0000"]],
        "L" : [ ["0200","0200","0220","0000"],
                ["0000","2220","2000","0000"],
                ["2200","0200","0200","0000"],
                ["0020","2220","0000","0000"]],
        "J" : [["0300","0300","3300","0000"],
               ["3000","3330","0000","0000"],
               ["0330","0300","0300","0000"],
               ["0000","3330","0030","0000"]],
        "Z" : [["0000","4400","0440","0000"],
            ["0400","4400","4000","0000"]],
        "T" : [["0000","5550","0500","0000"],
            ["0500","5500","0500","0000"],
            ["0500","5550","0000","0000"],
            ["0500","0550","0500","0000"]],
        "O" : [["0660","0660","0000","0000"]],
        "S" : [["0770","7700","0000","0000"],
               ["7000","7700","0700","0000"]]
    };

    //�������
    //���������Ҫ�ģ�Я��4*4С����
    window.ActiveBlock = Class.extend({
        init : function(row,col){
            //���У����Ͻ��Ǹ�������С���
            this.row = 0;
            this.col = 4;
            //���ѡȡһ����ĸ
            var typechar = "ILJZTOS";
            this.randomChar = typechar.substr(parseInt(Math.random() * 7),1);
            //��ǰ��̬�ķ�������
            this.directionAmount = allType[this.randomChar].length;
            //���ѡȡһ������
            this.direction = parseInt(Math.random() * this.directionAmount);
            //4*4С�����ͼ�����ǳ���ģ�
            this.fourfourMap = allType[this.randomChar][this.direction];
            //��ʵ������ݵľ���
            this.fourfourBlocks = [
                [null,null,null,null],
                [null,null,null,null],
                [null,null,null,null],
                [null,null,null,null]
            ];

            //�󶨼���
            this.bindListener();
        },
        // ���ݵ�ͼ���޸����ķ������
        createFFBlocksByMap : function(){
            //����4*4��map
            for(var r = 0 ; r < 4 ; r++){
                for(var c = 0 ; c < 4 ; c++){
                    //��λ����ɫ
                    var color = this.fourfourMap[r].substr(c,1);
                    //��Ԫ��֤
                    //ϸ�������λ�ã��Ǹ��ݵ�ǰ������������λ�ã���������
                    this.fourfourBlocks[r][c] = this.color != "0" ? new CellBlock(this.row + r, this.col + c , color) : null;
                }
            }
        },
        goLeft : function(){
            //Ҫ�����Ƿ��ܹ�����һ�е��ж�
            //��ô����Ҫ��һ����������С�ĵĴ�existBlockMap�У���ȡ
            //���һ�е�4*4Ƭ�Σ�Ȼ���뵱ǰ��activeBlock������бȽϡ�
            var qiepian = [];
            for(var r = this.row ; r < this.row + 4 ; r++){
                qiepian.push(game.map.existBlockMap[r].substr(this.col + 3 - 1 , 4));
            }

            //��һ��
            if(checkTwoFF(qiepian,this.fourfourMap)) {
                this.col--;
                this.createFFBlocksByMap();
            }
        },
        goRight : function(){
            //Ҫ�����Ƿ��ܹ�����һ�е��ж�
            //��ô����Ҫ��һ����������С�ĵĴ�existBlockMap�У���ȡ
            //�ұ�һ�е�4*4Ƭ�Σ�Ȼ���뵱ǰ��activeBlock������бȽϡ�
            var qiepian = [];
            for(var r = this.row ; r < this.row + 4 ; r++){
                qiepian.push(game.map.existBlockMap[r].substr(this.col + 3 + 1 , 4));
            }

            //��һ��
            if(checkTwoFF(qiepian,this.fourfourMap)) {
                this.col++;
                this.createFFBlocksByMap();
            }
        },
        //��һ��
        goDown : function(){
            //Ҫ�����Ƿ��ܹ�����һ�е��ж�
            //��ô����Ҫ��һ����������С�ĵĴ�existBlockMap�У���ȡ
            //��һ�е�4*4Ƭ�Σ�Ȼ���뵱ǰ��activeBlock������бȽϡ�
            var qiepian = [];
            for(var r = this.row + 1 ; r < this.row + 5 ; r++){
                qiepian.push(game.map.existBlockMap[r].substr(this.col + 3,4));
            }
            //���ˣ���������������4*4�����ˣ�
            //һ������qiepian��һ������this.fourfourMap
            //���ڵĹ��������ǱȽ�qiepian��this.fourfourMap�Ƿ���λ�ò�����0
            if(checkTwoFF(qiepian,this.fourfourMap)){
                this.row++;
                this.createFFBlocksByMap();
            }else{
                //�����½��ˣ����������ں�
                game.map.addFourFourIntoMyMap(this);
                //new�����µ�
                game.activeBlock = new ActiveBlock();
                //�����ж�
                game.map.xiaohang();
                game.goDown = 0
            }

        },
        //�ı��Լ��ķ���
        changeDirection : function(){
            //���µõ�һ���Լ���44����,������ת������дһ��test�ȴ�����
            var testfourfourMap = allType[this.randomChar][(this.direction + 1) % this.directionAmount];

            //���ڽ��У��ܷ���ת����֤
            //��ô����Ҫ��һ����������С�ĵĴ�existBlockMap�У���ȡ
            //��ǰ�е�4*4Ƭ�Σ�Ȼ���뵱ǰ��activeBlock������бȽϡ�
            var qiepian = [];
            for(var r = this.row ; r < this.row + 4 ; r++){
                qiepian.push(game.map.existBlockMap[r].substr(this.col + 3,4));
            }
            if(checkTwoFF(testfourfourMap,qiepian)){
                this.fourfourMap = testfourfourMap; //ͨ������
                //��������44��ʵ�������
                this.createFFBlocksByMap();
                this.direction++;   //�����1
            }
        },
        //��Ⱦ�������飬��������ʵ�����Ǻܶ�cellBlock������壬����
        //��Ⱦ�������飬ʵ���Ͼ�����Ⱦ��ЩСcellBlock
        render : function(){
            //����fourfourBlocks����
            for(var r = 0 ; r < 4 ; r++){
                for(var c = 0 ; c < 4 ; c++){
                    //��·
                    this.fourfourBlocks[r][c] && this.fourfourBlocks[r][c].render();
                }
            }
        },
        //�󶨼���
        bindListener : function(){
            var self = this;
            document.onkeydown = function(event){
                if(event.keyCode == 37){
                    //���
                    self.goLeft();
                }else if(event.keyCode == 38){
                    //�ϱ�
                    self.changeDirection();
                }else if(event.keyCode == 39){
                    //�ұ�
                    self.goRight();
                }else if(event.keyCode == 40){
                    //�±�
                    while(game.goDown){
                        self.goDown();
                    }
                    game.goDown=1;
                }
            }
        }
    });

    //������������A��B���������Ƿ�����Ŀλ���ϵ��غϡ�
    //����true��ʾû���غϡ�  ����false��ʾ���غ�
    function checkTwoFF(A,B){
        for(var r = 0 ;  r < 4 ; r++){
            for(var c = 0 ; c < 4 ; c++){
                var Achar = A[r].substr(c,1);
                var Bchar = B[r].substr(c,1);
                if(Achar != "0" && Bchar != "0"){
                    return false;
                }
            }
        }
        return true;
    }
})();