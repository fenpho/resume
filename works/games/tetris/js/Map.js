(function(){
    //��ͼ�ࡣ��ŵ��ǣ��Ѿ����׵���Щ����
    window.Map = Class.extend({
        init : function(){
            //��Ч���С�
            this.colAmount = 12;
            this.rowAmount = 24;

            //��ŵ�ͼ���ǳ�������ݡ�
            this.existBlockMap = [
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx123123100222xxx",
                "xxx123123101231xxx",
                "xxxxxxxxxxxxxxxxxx",
                "xxxxxxxxxxxxxxxxxx",
                "xxxxxxxxxxxxxxxxxx",
                "xxxxxxxxxxxxxxxxxx"
            ];
            //��ŷ��飬����Ĵ��cellBlock�ľ���
            this.existBlock = [
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null]
            ]
        },
        //���ݵ�ͼ���췽�顣
        creatBlocksByMap : function(){
            for(var r = 0 ; r < this.rowAmount ; r++){
                for(var c = 3 ; c < 3 + this.colAmount ; c++){
                    // substr(a,b) ��ʾ��aλ��ʼ����ȡbλ��
                    var thisBlockColor = this.existBlockMap[r].substr(c,1);
                    //��Ԫд������������ɫֵ����0����ônew����һ����
                    //�����0����ô����λд��null
                    this.existBlock[r][c - 3] = thisBlockColor != "0" ? new CellBlock(r,c - 3,thisBlockColor) : null;
                }
            }
        },
        // ��Ⱦ���г��׵ķ���
        renderAllExistBlocks : function(){
            for(var r = 0 ; r < this.rowAmount ; r++){
                for(var c = 0 ; c < this.colAmount ; c++){
                    //��·д���������existBlock�����У������null����ô
                    //�͵��������render
                    this.existBlock[r][c] && this.existBlock[r][c].render();
                 }
            }
        },
        //�����ںϡ���4*4��С�����ںϽ����ǵĵ�ͼ����
        addFourFourIntoMyMap : function(ab){
            for(var r = 0 ; r < 4 ; r++){
                for(var c = 0 ; c < 4 ; c++){
                    var theAbChar = ab.fourfourMap[r].substr(c,1);
                    //���44��һλ����0����ô�滻
                    if(theAbChar != "0") {
                        this.existBlockMap[r + ab.row] = replace(this.existBlockMap[r + ab.row], c + ab.col + 3, theAbChar);
                    }
                }
            }

            //�´���
            this.creatBlocksByMap();
        },
        //����
        xiaohang : function(){
            var fullRowNumber = [];
            //�����һ�п�ʼɸѡ���ҳ���Щ��������
            for(var row = this.rowAmount - 1 ; row > 0; row--){
                var num = 0;    //����0�ĸ���
                //��������ַ���
                for (var col = 3; col < this.colAmount + 3; col++) {
                    //��ȡ1λ
                    var c = this.existBlockMap[row].substr(col, 1);
                    //�����ĳ1λ����0����ô�˳�������
                    if(c == "0"){
                        num++;
                    }
                }
                //�������0�ĸ�����0��˵������
                if(num == 0){
                    fullRowNumber.push(row);
                }
            }

            //�����ж���ʧ
            for(var i = 0 ; i < fullRowNumber.length ; i++){
                this.existBlockMap[fullRowNumber[i]] = "xxx000000000000xxx";
                //��Block����
                this.creatBlocksByMap();
            }

            //������ж�����
            for(var i = fullRowNumber.length - 1 ; i >= 0 ; i--){
                //����һ�п�ʼ������������У�������һ��
                for(var j = fullRowNumber[i]; j > 0 ; j--){
                    this.existBlockMap[j] = this.existBlockMap[j - 1];
                }

                //��Block����
                this.creatBlocksByMap();
            }
        }
    });

    //replace�ܹ����ַ���obj�ĵ�xλ���滻Ϊstr
    function replace(obj,x,str){
        if (x >= obj.length - 1) {
            return obj.slice(0, x) + str
        }else{
            return obj.slice(0, x) + str + obj.slice(x + 1)
        }
    }
})();