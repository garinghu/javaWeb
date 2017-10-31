function testAnim(x) {
    var xx = $('#animationSandbox').attr("class");
    var y = x + ' animated';
    console.log(xx);
  $('#animationSandbox').removeClass(y).addClass(y).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){

      $(this).removeClass(y);
    }).addClass(xx);

};

function sendToast(text) {
    console.log(text);
    var stage = document.body;
    var toast = document.getElementById('toast');
    toast && stage.removeChild(toast);
    var html = "<div id='toast' class='fadeInDown'>" + text + "</div>";
    stage.innerHTML += html;
    setTimeout(function () {
        toast = document.getElementById('toast');
        toast && stage.removeChild(toast);
    },2000);
}
document.onreadystatechange = subSomething;
    function subSomething() 
    { 
            $(".loading").css({"display":"none"});
    } 


$(function(){
     
    
    var $loginBtn = $(".login-btn"),
        $registBtn = $(".regist-btn"),
        $gameStart = $(".game-start"),
        $listBtn = $(".list-btn"),
        audio = $("audio").get(0);
    var carouselindex = 0,
        listControll = false,
        gamecontroll = false,
        carouselcontroll = false,
        musicControll = false,
        tiptext = ["上下左右键进行移动，初始技能是X","在受到攻击时会有三秒的无敌时间，只能进行移动","游戏中会出现不同的风向，会影响角色的移动","按P复活","复活后积分会减半","想加入我们？可联系:18845893435"];
    var tipindex = 1;
    

    
    
    setInterval(function(){
        $('.tips').animate({
            opacity: 0
          }, 3000, function() {
            if(tipindex == tiptext.length){
                tipindex = 0;
            }
            $(".tip").html(tiptext[tipindex]);
            tipindex++;
          }).animate({
            opacity: 1
          }, 3000, function() {
            
          });
    },6000)
    
    $("#controllers>button").on("mouseenter",function(){
        console.log(123123);
        $(this).attr("id","animationSandbox");
        testAnim("fadeInRight");
        $(this).removeAttr("id");
    })
    
    $('.musiccontroll').on("click",function(){
        if(audio.paused){
            audio.play();
            $('.musiccontroll').removeClass('pause')
        } else{
            audio.pause();
            $('.musiccontroll').addClass('pause')
        }
    })
    
    
     function checkCookie(){
        console.log($.cookie("username"),$.cookie("password"));
        if($.cookie("username")){
        gamecontroll = true;
        $.ajax({  
                type : "post",
                xhrFields:{ withCredentials:true },
                crossDomain: true,
                headers:{
                    'Content-Type':'application/json'
                },
                url : "http://106.15.228.215:8080/game/game/login",  
                dataType : "json",
                data:JSON.stringify({
                    "name":$.cookie("username"),
                    "password":$.cookie("password")
                }),
                success : function(data){
                 console.log(data);
                     $.ajax({  
                            type : "get",
                            xhrFields:{ withCredentials:true },
                            crossDomain: true,
                            headers:{
                                'Content-Type':'application/json'
                            },
                            url : "http://106.15.228.215:8080/game/game/time",  
                            dataType : "json",
                            success : function(data){  
                               $.cookie("time",data.data); $("#userinfo>.time").html(data.data);
                            },  
                            error:function(){  
                                alert('fail');  
                            }  
                        });
                         $.ajax({  
                            type : "get",
                             xhrFields:{ withCredentials:true},
                            crossDomain: true,
                            headers:{
                                'Content-Type':'application/json'
                            },
                            url : "http://106.15.228.215:8080/game/game/topGrades",  
                            dataType : "json",
                            success : function(data){  
                               $.cookie("maxcount",data.data); $("#userinfo>.maxcount").html(data.data);
                            },  
                            error:function(){  
                                alert('fail');  
                            }  
                        });   
                    
                },  
                error:function(){  
                    alert('fail');  
                }  
         });   
         $("#userinfo>.username").html($.cookie("username"));
         $("#userinfo>.time").html($.cookie("time"));
         $("#userinfo>.maxcount").html($.cookie("maxcount"));
        }
    }
    checkCookie();
    $(".minisize").on("click",function(){
        audio.src = "lib/background2.mp3";
        $("#dark").css({display:"none"});
        $(".game").css({display:"none"});
        $(".game-start").html("继续游戏");
    })
    
    
    $(".carousel-control").on("click",function(){
        carouselindex++;
        if(carouselindex == 4){
            $("#myCarousel").css({display:"none"});
            $(".game").css({display:"block"});
        }
    })
    
    $(".finishOut").on("click",function(){
        audio.src = "lib/background2.mp3";
        $("#dark").css({display:"none"});
        $(".game").css({display:"none"});
        $("#successIn").css({display:"none"});
        $(".game-start").html("开始游戏");
    })
    $(".finishAgain").on("click",function(){
        $("#successIn").css({display:"none"});
    })
    
    
    
    $listBtn.on("click",function(){
        if(!listControll){
            $.ajax({  
                type : "get",
                xhrFields:{ withCredentials:true },
                crossDomain: true,
                headers:{
                    'Content-Type':'application/json'
                },
                url : "http://106.15.228.215:8080/game/game/grades/list",  
                dataType : "json",
                success : function(data){

                    var item = '',
                        i = 0,
                        ii = i+1;
                    var timer = setInterval(function(){
                        if(i == data.data.length){
                            clearInterval(timer);
                        }else{
                             item = "<tr id='animationSandbox'><td>"+ii+"</td><td>"+data.data[i].name+"</td><td>"+data.data[i].grade+"</td></tr>";
                            $('#list>table>tbody').append(item);
                            testAnim("fadeInRight");
                            $("tr").removeAttr("id");
                            i++;
                            ii++;
                        }
                       
                    },200);
                    //$('#list>table>tbody').append(items);
                    listControll = true;
                },  
                error:function(){  
                    alert('fail');  
                }  
            });   
        }
        
    })
    
    
    $gameStart.on("click",function(){
        audio.src = "lib/battle.mp3";
        if(gamecontroll){
            if(carouselindex == 4){
                $("#dark").css({display:"block"});
                $(".game").css({display:"block"});
            }else{
                console.log(carouselindex);
                $("#dark").css({display:"block"});
                $("#myCarousel").css({display:"block"});
            }
             
        }else{
            sendToast("您还未登陆");
        }
       
    })
    
    

    $(".loginusername").on("blur",function(){
        console.log(123);
        if(this.value.length < 7){
            $(".login-username-error").html("您输入的用户名不足七位");
        }else{
            $(".login-username-error").html("");
        }
    })
    $(".loginpassword").on("blur",function(){
        if(this.value.length == 0){
            $(".login-password-error").html("请输入密码");
        }else{
            $(".login-password-error").html("");
        }
    })
    $(".logincontroll").on("click",function(){
        if($(".loginusername").val().length >=7 && $(".loginpassword").val().length != 0){
            var loginusername = $(".loginusername").val();
            var loginpassword = $(".loginpassword").val();
            $.ajax({  
                type : "post",
                xhrFields:{ withCredentials:true },
                crossDomain: true,
                headers:{
                    'Content-Type':'application/json'
                },
                url : "http://106.15.228.215:8080/game/game/login",  
                dataType : "json",
                data:JSON.stringify({
                    "name":$(".loginusername").val(),
                    "password":$(".loginpassword").val()
                }),
                success : function(data){
                   console.log(data); $.cookie("username",$(".loginusername").val());
                    $.cookie("password",$(".loginpassword").val());
                    
                    gamecontroll = true;
                    if(data.id == 1){ $("#userinfo>.username").html(loginusername);
                        $.ajax({  
                            type : "get",
                            xhrFields:{ withCredentials:true },
                            crossDomain: true,
                            headers:{
                                'Content-Type':'application/json'
                            },
                            url : "http://106.15.228.215:8080/game/game/time",  
                            dataType : "json",
                            success : function(data){  
                               $.cookie("time",data.data); $("#userinfo>.time").html(data.data);
                            },  
                            error:function(){  
                                alert('fail');  
                            }  
                        });
                         $.ajax({  
                            type : "get",
                             xhrFields:{ withCredentials:true},
                            crossDomain: true,
                            headers:{
                                'Content-Type':'application/json'
                            },
                            url : "http://106.15.228.215:8080/game/game/topGrades",  
                            dataType : "json",
                            success : function(data){  
                               $.cookie("maxcount",data.data); $("#userinfo>.maxcount").html(data.data);
                            },  
                            error:function(){  
                                alert('fail');  
                            }  
                        });   
//                        $("#dark").css({display:"none"});
//                        $(".login").css({display:"none"});
                    }else if(data.id == 4){
                        alert("密码错误");
                        
                    }else if(data.id == 3){
                        alert("用户名错误");
                    }
                    
                },  
                error:function(){  
                    alert('fail');  
                }  
            });   
        }
    })
    
    
    
//    $registBtn.on("click",function(){
//        $("#dark").css({display:"block"});
//        $(".regist").css({display:"block"});
//    })
//    $(".regist>.close").on("click",function(){
//        $("#dark").css({display:"none"});
//        $(".regist").css({display:"none"});
//    })
//    $listBtn.on("click",function(){
//        $("#dark").css({display:"block"});
//        $(".list").css({display:"block"});
//    })
//    $(".list>.close").on("click",function(){
//        $("#dark").css({display:"none"});
//        $(".list").css({display:"none"});
//    })
    $(".registusername").on("keyup",function(){
        if(this.value.length < 7){
            $(".regist-username-error").html("您输入的用户名不足七位");
        }else{
            $(".regist-username-error").html("");
        }
    })
    $(".reregistpassword").on("blur",function(){
        if(this.value != $('.registpassword').val()){
            $(".reregist-password-error").html("请确认密码");
        }else{
            $(".reregist-password-error").html("");
        }
    })
    $(".registcontroll").on("click",function(){
        if($(".registusername").val().length >=7 && $(".registpassword").val().length != 0){
            $.ajax({  
                type : "post",  
                headers:{
                    'Content-Type':'application/json'
                },
                url : "http://106.15.228.215:8080/game/game/registration",  
                dataType : "json",
                data:JSON.stringify({
                    "name":$(".registusername").val(),
                    "password":$(".registpassword").val()
                }),
                success : function(data){
                    console.log(data);
                    if(data.id == 2){
                        alert("用户名重复");
                    }else{
                        alert("注册成功");
                    }
                    
//                    $("#dark").css({display:"none"});
//                    $(".regist").css({display:"none"});
                },  
                error:function(){  
                    alert('fail');  
                }  
            });   
        }               
    })    
})