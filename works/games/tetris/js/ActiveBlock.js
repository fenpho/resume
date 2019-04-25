/**
 * Created by Fenpho on 2017年1月14日08:29:15
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

    //活动方块类
    //这个类最重要的，携带4*4小矩阵
    window.ActiveBlock = Class.extend({
        init : function(row,col){
            //行列，左上角那个方块的行、列
            this.row = 0;
            this.col = 4;
            //随机选取一个字母
            var typechar = "ILJZTOS";
            this.randomChar = typechar.substr(parseInt(Math.random() * 7),1);
            //当前形态的方向总数
            this.directionAmount = allType[this.randomChar].length;
            //随机选取一个方向
            this.direction = parseInt(Math.random() * this.directionAmount);
            //4*4小矩阵地图。这是抽象的：
            this.fourfourMap = allType[this.randomChar][this.direction];
            //真实存放数据的矩阵
            this.fourfourBlocks = [
                [null,null,null,null],
                [null,null,null,null],
                [null,null,null,null],
                [null,null,null,null]
            ];

            //绑定监听
            this.bindListener();
        },
        // 根据地图，修改四四方块矩阵
        createFFBlocksByMap : function(){
            //遍历4*4的map
            for(var r = 0 ; r < 4 ; r++){
                for(var c = 0 ; c < 4 ; c++){
                    //这位的颜色
                    var color = this.fourfourMap[r].substr(c,1);
                    //三元验证
                    //细胞方块的位置，是根据当前这个活动方块整体位置，进行修正
                    this.fourfourBlocks[r][c] = this.color != "0" ? new CellBlock(this.row + r, this.col + c , color) : null;
                }
            }
        },
        goLeft : function(){
            //要进行是否能够左移一列的判断
            //那么，需要拿一个手术刀，小心的从existBlockMap中，截取
            //左边一列的4*4片段，然后与当前的activeBlock矩阵进行比较。
            var qiepian = [];
            for(var r = this.row ; r < this.row + 4 ; r++){
                qiepian.push(game.map.existBlockMap[r].substr(this.col + 3 - 1 , 4));
            }

            //左一列
            if(checkTwoFF(qiepian,this.fourfourMap)) {
                this.col--;
                this.createFFBlocksByMap();
            }
        },
        goRight : function(){
            //要进行是否能够右移一列的判断
            //那么，需要拿一个手术刀，小心的从existBlockMap中，截取
            //右边一列的4*4片段，然后与当前的activeBlock矩阵进行比较。
            var qiepian = [];
            for(var r = this.row ; r < this.row + 4 ; r++){
                qiepian.push(game.map.existBlockMap[r].substr(this.col + 3 + 1 , 4));
            }

            //右一列
            if(checkTwoFF(qiepian,this.fourfourMap)) {
                this.col++;
                this.createFFBlocksByMap();
            }
        },
        //下一行
        goDown : function(){
            //要进行是否能够下移一行的判断
            //那么，需要拿一个手术刀，小心的从existBlockMap中，截取
            //下一行的4*4片段，然后与当前的activeBlock矩阵进行比较。
            var qiepian = [];
            for(var r = this.row + 1 ; r < this.row + 5 ; r++){
                qiepian.push(game.map.existBlockMap[r].substr(this.col + 3,4));
            }
            //至此，我们手上有两个4*4矩阵了，
            //一个叫做qiepian，一个叫做this.fourfourMap
            //现在的工作，就是比较qiepian和this.fourfourMap是否有位置不都是0
            if(checkTwoFF(qiepian,this.fourfourMap)){
                this.row++;
                this.createFFBlocksByMap();
            }else{
                //不能下降了，进行新老融合
                game.map.addFourFourIntoMyMap(this);
                //new出来新的
                game.activeBlock = new ActiveBlock();
                //消行判定
                game.map.xiaohang();
                game.goDown = 0
            }

        },
        //改变自己的方向
        changeDirection : function(){
            //重新得到一个自己的44矩阵,必须能转，所以写一个test等待验收
            var testfourfourMap = allType[this.randomChar][(this.direction + 1) % this.directionAmount];

            //现在进行，能否旋转的验证
            //那么，需要拿一个手术刀，小心的从existBlockMap中，截取
            //当前行的4*4片段，然后与当前的activeBlock矩阵进行比较。
            var qiepian = [];
            for(var r = this.row ; r < this.row + 4 ; r++){
                qiepian.push(game.map.existBlockMap[r].substr(this.col + 3,4));
            }
            if(checkTwoFF(testfourfourMap,qiepian)){
                this.fourfourMap = testfourfourMap; //通过验收
                //重新生成44真实方块矩阵
                this.createFFBlocksByMap();
                this.direction++;   //方向加1
            }
        },
        //渲染这个活动方块，这个活动方块实际上是很多cellBlock的组合体，所以
        //渲染这个活动方块，实际上就是渲染这些小cellBlock
        render : function(){
            //遍历fourfourBlocks数字
            for(var r = 0 ; r < 4 ; r++){
                for(var c = 0 ; c < 4 ; c++){
                    //短路
                    this.fourfourBlocks[r][c] && this.fourfourBlocks[r][c].render();
                }
            }
        },
        //绑定监听
        bindListener : function(){
            var self = this;
            document.onkeydown = function(event){
                if(event.keyCode == 37){
                    //左边
                    self.goLeft();
                }else if(event.keyCode == 38){
                    //上边
                    self.changeDirection();
                }else if(event.keyCode == 39){
                    //右边
                    self.goRight();
                }else if(event.keyCode == 40){
                    //下边
                    while(game.goDown){
                        self.goDown();
                    }
                    game.goDown=1;
                }
            }
        }
    });

    //这个函数，检查A、B两个矩阵是否有项目位置上的重合。
    //返回true表示没有重合。  返回false表示有重合
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