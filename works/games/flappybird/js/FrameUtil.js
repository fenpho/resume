(function(){
    //֡�����ࡣ�ṩ��ǰ��֡�����ṩ��ǰ����ʵfps��
    window.FrameUtil = Class.extend({
        //��ʼ��
        init : function(){
            //��ǰ֡���
            this.currentFrame = 0;

            //��ʼ֡������ͳ��FPS��
            this.sFrame = 0;
            this.sTime = new Date();

            //��ʵfps
            this.realFps = 0;
        },
        //���£����������mainloopÿִ֡��
        update : function(){
            //��ǰ֡�������1
            this.currentFrame++;
            //�ж��Ƿ���sTime+1000
            var t = new Date();
            if(t - this.sTime >= 1000){
                //����1000���������֡��ŵ�����
                this.realFps = this.currentFrame - this.sFrame;
                //��ǰ��֡��ţ������µ�����־֡
                this.sFrame = this.currentFrame;
                //��ǰ֡�ķ���ʱ�䣬�����µı�־֡ʱ��
                this.sTime = t;
            }
        }
    });
})();