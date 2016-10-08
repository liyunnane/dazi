$(function(){
    var baochun=$("img",".vita");
	function Typename(){
		this.num=3;
		this.letterObj={};
		this.play();
		this.goal=0;
		this.stage=1;
		this.vita=5;
	}
	Typename.prototype={
		createLetter:function(){
			var that=this;
			do{
				var randomcode=Math.round(Math.random()*25+65);
				var randomLetter=String.fromCharCode(randomcode);
			}while(this.letterObj[randomLetter]);
			do{
				var randomLeft=Math.round(Math.random()*800);
			}while(this.checkLetter(randomLeft));
			var randomTop=-Math.round(Math.random()*200);

			var ele=$("<div></div>").css({width:84,height:96,background:"url(image/"+randomLetter+".png)",color:"#fff",fontSize:"0px",textAlign:"center",position:"fixed",left:randomLeft,top:randomTop}).appendTo("body")
            .animate({top:$(window).height()},10000,"linear",function(){
     				    that.vita--;
     					if(that.vita<=0){
     						that.vita=0;
     						$.each(that.letterObj,function(index,element){
     							element.el.remove().stop();
     						});                           
     						that.letterObj={};
     						$(".fail").show();
     						$("img",".vita").detach();

     						return;
     					}
     				    $("img",".vita").last().remove();
     				    that.createLetter();
     			})//在css内部设置样式可以省略单位
     			this.letterObj[randomLetter]={startL:randomLeft-50,endL:randomLeft+50,el:ele,tops:randomTop}
     		
		},
		play:function(){
     			for (var i = this.num - 1; i >= 0; i--) {
     				this.createLetter()
     			};
     			this.keyDown();
     		},
     		checkLetter:function(newLetter){
     			var flag=false;
               	$.each(this.letterObj,function(index,obj){//each的另一种使用方法
               		if(newLetter>obj.startL&&newLetter<obj.endL){
               			flag=true;
               			return;
               		}
               	})
               	return flag;
     		},
     		keyDown:function(){
     			var that=this;
     			$(document).keydown(function(e){
     				var ev=e||window.event;
     				var code=ev.keyCode;
     				var keychar=String.fromCharCode(code);
                    $(".gun")
                    .css({right:60,bottom:-50})
                    .animate({right:85,bottom:-60})
     				if(that.letterObj[keychar]){//判断this.letterObj里有没有keychar属性
                        var objs=that.letterObj[keychar];
                      
                        var zdanl=parseInt(objs.el[0].offsetLeft)
                        var zdant=parseInt(objs.el[0].offsetTop);
                        $("<div></div>").addClass("zdan").appendTo("body")
                        .animate({right:($(window).width()-zdanl-68),bottom:($(window).height()-zdant)-65},50)
                        .queue(function(){$(".zdan").dequeue().remove();
                        })
     					objs.el.remove().stop();//删除jQuery对象
     					delete that.letterObj[keychar];//删除对象属性
     					that.createLetter();
                        
                        
     					//得分
     					that.goal++;
     					$(".goal").html("得分:"+that.goal)
     					//关卡
     					if(that.stage*10<=that.goal){
     						if($(".zdan")){
                                $(".zdan").remove();
                            }
     						that.num++;
     						$.each(that.letterObj,function(index,element){
     							element.el.remove().stop();
     						})
     						that.letterObj={};
     						$(".pass").show();
                            if(that.vita>=1){
                               $("<img src='image/xing2.png'>").css({width:55,height:56,position:"absolute",left:35,top:106,zIndex:1,opacity:"0"}).appendTo(".pass").end().animate({opacity:"1"},500,"easeInOutBounce");
                            }
                            if(that.vita>=2){
                               $("<img src='image/xing3.png'>").css({width:69,height:69,position:"absolute",left:69,top:78,zIndex:2,opacity:"0"}).appendTo(".pass").end().animate({opacity:"1"},700,"easeInOutBounce");
                            }
                            if(that.vita>=3){
                               $("<img src='image/xing4.png'>").css({width:78,height:74,position:"absolute",left:112,top:56,zIndex:3,opacity:"0"}).appendTo(".pass").end().animate({opacity:"1"},900,"easeInOutBounce");
                            }
                            if(that.vita>=4){
                               $("<img src='image/xing5.png'>").css({width:69,height:69,position:"absolute",left:163,top:80,zIndex:2,opacity:"0"}).appendTo(".pass").end().animate({opacity:"1"},1100,"easeInOutBounce");
                            }
                            if(that.vita==5){
                               $("<img src='image/xing6.png'>").css({width:55,height:56,position:"absolute",left:210,top:108,zIndex:1,opacity:"0"}).appendTo(".pass").animate({opacity:"1"},1300,"easeInOutBounce");
                            }

     					}

     				}
     			})
     		}
     	}
     	var start=new Typename();
     	$(".btn",$(".pass")).click(function(){
     		start.stage++;
     		start.goal=0;
     		$(".goal").html("得分:"+start.goal)
            $(".stage").html("关卡:"+start.stage);
            $("img",".pass").remove();
            baochun.appendTo(".vita").css({width:26,height:22,lineHeight:73,margin:"0 5px"});
            $(".pass").hide();
            start.play();
        });
     	$(".btn",$(".fail")).click(function(){
     		 start.stage=1;
     		 start.goal=0;
     		 start.vita=5;
     		 start.num=3;
     		 $(".goal").html("得分:"+start.goal)
             $(".stage").html("关卡:"+start.stage);

             baochun.appendTo(".vita").css({width:26,height:22,lineHeight:73,margin:"0 5px"});
             $(".fail").hide();
             start.play();
     	})
        setInterval(function(){
            $(".by1").animate({left:"100%"},18000,"linear").animate({left:0},16000);
            $(".by2").animate({left:0},10000,"linear").animate({left:710},16000);  
            $(".by3").animate({left:810},10000,"linear").animate({left:-121},16000); 
            $(".by4").animate({left:0},18000,"linear").animate({left:710},16000); 
        },34000)
        $(".by1").animate({left:"100%"},18000,"linear").animate({left:0},16000);
        $(".by2").animate({left:0},10000,"linear").animate({left:710},16000);  
        $(".by3").animate({left:810},10000,"linear").animate({left:-121},16000); 
        $(".by4").animate({left:0},18000,"linear").animate({left:710},16000); 

})