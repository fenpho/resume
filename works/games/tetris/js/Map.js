(function(){
    //地图类。存放的是，已经沉底的那些方块
    window.Map = Class.extend({
        init : function(){
            //有效行列。
            this.colAmount = 12;
            this.rowAmount = 24;

            //存放地图，是抽象的数据。
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
            //存放方块，是真的存放cellBlock的矩阵
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
        //根据地图创造方块。
        creatBlocksByMap : function(){
            for(var r = 0 ; r < this.rowAmount ; r++){
                for(var c = 3 ; c < 3 + this.colAmount ; c++){
                    // substr(a,b) 表示从a位开始，截取b位。
                    var thisBlockColor = this.existBlockMap[r].substr(c,1);
                    //三元写法。如果这个颜色值不是0，那么new出来一个。
                    //如果是0，那么把这位写成null
                    this.existBlock[r][c - 3] = thisBlockColor != "0" ? new CellBlock(r,c - 3,thisBlockColor) : null;
                }
            }
        },
        // 渲染所有沉底的方块
        renderAllExistBlocks : function(){
            for(var r = 0 ; r < this.rowAmount ; r++){
                for(var c = 0 ; c < this.colAmount ; c++){
                    //短路写法，如果在existBlock矩阵中，这项不是null。那么
                    //就调用这项的render
                    this.existBlock[r][c] && this.existBlock[r][c].render();
                 }
            }
        },
        //新老融合。让4*4的小矩阵，融合进我们的地图里面
        addFourFourIntoMyMap : function(ab){
            for(var r = 0 ; r < 4 ; r++){
                for(var c = 0 ; c < 4 ; c++){
                    var theAbChar = ab.fourfourMap[r].substr(c,1);
                    //如果44这一位不是0，那么替换
                    if(theAbChar != "0") {
                        this.existBlockMap[r + ab.row] = replace(this.existBlockMap[r + ab.row], c + ab.col + 3, theAbChar);
                    }
                }
            }

            //新创建
            this.creatBlocksByMap();
        },
        //消行
        xiaohang : function(){
            var fullRowNumber = [];
            //从最后一行开始筛选，找出哪些行是满行
            for(var row = this.rowAmount - 1 ; row > 0; row--){
                var num = 0;    //本行0的个数
                //遍历这个字符串
                for (var col = 3; col < this.colAmount + 3; col++) {
                    //读取1位
                    var c = this.existBlockMap[row].substr(col, 1);
                    //如果有某1位等于0，那么退出本函数
                    if(c == "0"){
                        num++;
                    }
                }
                //如果本行0的个数是0，说明满了
                if(num == 0){
                    fullRowNumber.push(row);
                }
            }

            //让满行都消失
            for(var i = 0 ; i < fullRowNumber.length ; i++){
                this.existBlockMap[fullRowNumber[i]] = "xxx000000000000xxx";
                //让Block更改
                this.creatBlocksByMap();
            }

            //上面的行都下移
            for(var i = fullRowNumber.length - 1 ; i >= 0 ; i--){
                //从这一行开始，上面的所有行，都下移一行
                for(var j = fullRowNumber[i]; j > 0 ; j--){
                    this.existBlockMap[j] = this.existBlockMap[j - 1];
                }

                //让Block更改
                this.creatBlocksByMap();
            }
        }
    });

    //replace能够把字符串obj的第x位，替换为str
    function replace(obj,x,str){
        if (x >= obj.length - 1) {
            return obj.slice(0, x) + str
        }else{
            return obj.slice(0, x) + str + obj.slice(x + 1)
        }
    }
})();