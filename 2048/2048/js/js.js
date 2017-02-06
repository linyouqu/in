/**
 * Created by Administrator on 2016/08/25.
 */
var box=document.getElementById("box");
var boxUl=document.getElementById("box-ul");
var soanWidth=105;
var soanBorder=16;

/*布局*/
var arr=[];
function start(){
    var frag=document.createDocumentFragment()
    for(var i=0;i<4;i++){
        arr[i]=[]
        for( var j=0;j<4;j++){
            arr[i][j]=0;
            var lis=document.createElement("li");
            frag.appendChild(lis)
        }
    }
    boxUl.appendChild(frag);
    var list=boxUl.getElementsByTagName("li");
    /*初始化*/
    for(var i=0;i<2;i++){
        var liNum=Math.floor(Math.random()*16);
        var x=Math.floor(liNum/4);
        var y=liNum%4;
        if(arr[x][y]!=0)i--;
        else {
            arr[x][y]=Math.floor(Math.random()*1.3+1)*2;
            var span=document.createElement("span");
            span.innerHTML=arr[x][y]
            span.className="span"+ arr[x][y];

            span.style.left=x*(soanWidth+soanBorder)+"px"
            span.style.top=y*(soanWidth+soanBorder)+"px"

            frag.appendChild(span)
            span.style.transform="scale(0.6,0.6)";

        }
    }
    box.appendChild(frag)
    setTimeout(function(){
        var spanStyle=box.getElementsByTagName("span")
        for(var i=0;i<spanStyle.length;i++){
            spanStyle[i].style.transform="scale(1,1)";}},0)

}
start();/*初始化结束*/
/*移动一次后随机出现一个数字*/
function chuangJ(){

    for(var i=0;i<1;i++){
        var frag=document.createDocumentFragment()
        var liNum=Math.floor(Math.random()*16);
        var x=Math.floor(liNum/4);
        var y=liNum%4;
        if(arr[x][y]!=0)i--;
        else {
            arr[x][y]=Math.floor(Math.random()*1.3+1)*2;
            var span=document.createElement("span");
            span.innerHTML=arr[x][y]
            span.className="span"+ arr[x][y];
            span.style.left=x*(soanWidth+soanBorder)+"px"
            span.style.top=y*(soanWidth+soanBorder)+"px"

            frag.appendChild(span)
            span.style.transform="scale(0.6,0.6)";
        }
    }
    box.appendChild(frag)
    setTimeout(function(){
        var spanStyle=box.getElementsByTagName("span")
        for(var i=0;i<spanStyle.length;i++){
            spanStyle[i].style.transform="scale(1,1)";}},0)
}
//chuangJ()
if(document.addEventListener){//判断是否支持此方法
    var startX,startY,endX,endY;
    document.addEventListener("touchstart",function(event){
        event.preventDefault();// 阻止浏览器默认事件，重要
        //console.log(event,1);
        var touch = event.targetTouches[0];
        startX=touch.pageX;//手指所在的坐标x
        startY=touch.pageY;//手指所在的坐标y
    });
    document.addEventListener("touchmove",function(e){

    });
    document.addEventListener("touchend",function(event){
        //console.log(event,2);
        var touch = event.changedTouches[0];
        endX=touch.pageX;//手指所在的坐标x
        endY=touch.pageY;//手指所在的坐标Y

        var x=Math.abs(startX-endX);
        var y=Math.abs(startY-endY);
        //上:38;下:40;左：37；右39
        if(x-y>0)
        {
            if(startX-endX>10){//向左
                keyDownFun(37);
            }
            else if(startX-endX<-10)//向右
            {
                keyDownFun(39);
            }
        }
        else{
            if(startY-endY>10){//向上
                keyDownFun(38);
            }
            else if(startY-endY<-10)//向下
            {
                keyDownFun(40);
            }
        }
    });
}



/*按方向上*/

document.onkeydown=function(e){
    var event=window.event || e;
    var keyCode=event.keyCode || event.which;
    //alert(keyCode);//上:38;下:40;左：37；右39

    keyDownFun(keyCode);
}

function keyDownFun(keyCode){
    var boolGenerate=false;
    if(keyCode==38)//上
    {
        for(var i=0;i<3;i++){//最多移动3次
            for(var x=0;x<4;x++){
                for(var y=0;y<4;y++){
                    if(arr[x][y]!=0)//存在的元素
                    {
                                if(y>0&&arr[x][y-1]==0){
                                arr[x][y-1]=arr[x][y]//上移
                                arr[x][y]=0;
                                    boolGenerate=true;
                                }
                        else if(y>0&&arr[x][y-1]==arr[x][y]){//相等的时候上移
                                    arr[x][y-1]+=arr[x][y]
                                    arr[x][y]=0;
                                    boolGenerate=true;
                                }
                    }

                }
            }
        }

        var boolr=false;

        for(var x=0;x<4;x++) {
            for (var y= 0; y < 4; y++) {
                if(y<3){
                    if(arr[x][y]==arr[x][y+1]){
                        boolr=true;
                    break;}
                }
                if(x<3){
                    if(arr[x][y]==arr[x+1][y]){
                        boolr=true;
                    break;}
                }
                if(arr[x][y]==0)
                    boolr=true;
            }
        }
        console.log(boolr);
        if(boolr==false){
            var max=0;
            for(var x=0;x<4;x++) {
                for (var y= 0; y < 4; y++) {
                    (max<arr[x][y])?max=arr[x][y]: 1;
                }
            }
            alert("你输了,成绩为："+max);
            setTimeout(function(){window.location.reload()},1000);
            return;
        }

    }
    if(keyCode==40)//下
    {
        for(var i=0;i<3;i++){//最多移动3次
            for(var x=3,n=0;x>=0;x--){
                for(var y=3;y>=0;y--,n++){
                    if(arr[x][y]!=0)//存在的元素
                    {
                        if(y<3&&arr[x][y+1]==0){
                            arr[x][y+1]=arr[x][y]
                            arr[x][y]=0;
                            boolGenerate=true;
                        }
                        else if(arr[x][y+1]==arr[x][y]){
                            arr[x][y+1]+=arr[x][y]
                            arr[x][y]=0;
                            boolGenerate=true;
                        }
                    }

                }
            }
        }

        var boolr=false;
        for(var x=0;x<4;x++) {
            for (var y= 0; y < 4; y++) {
                if(y<3){
                    if(arr[x][y]==arr[x][y+1])
                        boolr=true;
                }
                if(x<3){
                    if(arr[x][y]==arr[x+1][y])
                        boolr=true;
                }
                if(arr[x][y]==0)
                    boolr=true;
            }
        }
        if(boolr==false){
            var max=0;
            for(var x=0;x<4;x++) {
                for (var y= 0; y < 4; y++) {
                    (max<arr[x][y])?max=arr[x][y]: 1;
                }
            }
            alert("你输了,成绩为："+max)
            setTimeout(function(){window.location.reload()},1000)
            return;}

    }

    if(keyCode==37)//左
    {
        for(var i=0;i<3;i++){//最多移动3次
            for(var x=0,n=0;x<4;x++){
                for(var y=0;y<4;y++,n++){
                    if(arr[x][y]!=0)//存在的元素
                    {
                        if(x>0&&arr[x-1][y]==0){
                            arr[x-1][y]=arr[x][y]
                            arr[x][y]=0;
                            boolGenerate=true;
                        }
                        else if(x>0&&arr[x-1][y]==arr[x][y]){
                            arr[x-1][y]+=arr[x][y]
                            arr[x][y]=0;
                            boolGenerate=true;
                        }
                    }

                }
            }
        }

        var boolr=false;

        for(var x=0;x<4;x++) {
            for (var y= 0; y < 4; y++) {
                if(y<3){
                    if(arr[x][y]==arr[x][y+1])
                        boolr=true;
                }
                if(x<3){
                    if(arr[x][y]==arr[x+1][y])
                        boolr=true;
                }
                if(arr[x][y]==0)
                    boolr=true;
            }
        }
        if(boolr==false){
            var max=0;
            for(var x=0;x<4;x++) {
                for (var y= 0; y < 4; y++) {
                    (max<arr[x][y])?max=arr[x][y]: 1;
                }
            }
            alert("你输了,成绩为："+max)
            setTimeout(function(){window.location.reload()},1000)
            return;}

    }

    if(keyCode==39)//右
    {
        for(var i=0;i<3;i++){//最多移动3次
            for(var x=3,n=0;x>=0;x--){
                for(var y=3;y>=0;y--,n++){
                    if(arr[x][y]!=0)//存在的元素
                    {
                        if(x<3&&arr[x+1][y]==arr[x][y]){
                        arr[x+1][y]+=arr[x][y]
                        arr[x][y]=0;
                            boolGenerate=true;
                        }
                        else if(x<3&&arr[x+1][y]==0){
                            arr[x+1][y]=arr[x][y]
                            arr[x][y]=0;
                            boolGenerate=true;
                        }
                    }

                }
            }
        }

        var boolr=false;

        for(var x=0;x<4;x++) {
            for (var y= 0; y < 4; y++) {
                if(y<3){
                    if(arr[x][y]==arr[x][y+1])
                        boolr=true;
                }
                if(x<3){
                    if(arr[x][y]==arr[x+1][y])
                        boolr=true;
                }
                if(arr[x][y]==0)
                    boolr=true;
            }
        }
        if(boolr==false){
            var max=0;
            for(var x=0;x<4;x++) {
                for (var y= 0; y < 4; y++) {
                    (max<arr[x][y])?max=arr[x][y]: 1;
                }
            }
            alert("你输了,成绩为："+max)
            setTimeout(function(){window.location.reload()},1000)
            return;}

    }

    console.log(arr);
    var frag=document.createDocumentFragment();
    var spanStyle=box.getElementsByTagName("span");
    for(var x=0;x<4;x++) {
        for (var y= 0; y < 4; y++) {
            if(arr[x][y]!=0){
                var span=document.createElement("span");
                span.innerHTML=arr[x][y];
                span.className="span"+ arr[x][y];
                span.style.left=x*(soanWidth+soanBorder)+"px";
                span.style.top=y*(soanWidth+soanBorder)+"px";

                for(var i=0;i<spanStyle.length;i++){
                        box.removeChild(spanStyle[i]);
                        i--
                }
            frag.appendChild(span)
            }
        }
    }

    box.appendChild(frag);
    for(var x=0;x<4;x++){
        for(var y=0;y<4;y++){
            if(arr[x][y]==0&&boolGenerate){
                chuangJ();
                x+=4;y+=4
            }
                }
    }



    setTimeout(function(){

        for(var i=0;i<spanStyle.length;i++){
            spanStyle[i].style.transform="scale(1,1)";}},0)

}

function keyCodeUpFun(x,y){
    for(var xx=x,yy=y-1;yy>=0;yy--){
        if(arr[yy][xx]!=false && arr[yy][xx]==arr[y][x])//有相邻相等
        {
            arr[yy][xx]+=arr[yy][xx];
            arr[y][x]=false;

        }
        else{//没有数
            arr[yy][xx]=arr[y][x];
            arr[y][x]=false;
            keyCodeUpFun(xx,yy);
        }
    }
}

