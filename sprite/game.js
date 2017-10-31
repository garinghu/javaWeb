(function () {
    var imgs = document.getElementsByTagName('img');
    var startBtn = document.getElementById('start');
    var loadWord = document.getElementsByClassName('loadTitle')[0];
    var toolbar = document.getElementById('tool-bar');
    var stop = document.getElementById('stop-label');
    var flag = false;
    var skillReg = /\bcooling\b/;
    var msg = [];
    window.onload = function () {
        setTimeout(function () {
            loadWord.innerHTML = 'SUCCESS'
        },1000);
    };
    startBtn.onclick = function () {
        if(loadWord.innerHTML == 'SUCCESS'){
            startGames();
            toolbar.style.display = 'flex';
            sendToast('前方妖怪出没，准备战斗吧!');
            setTimeout(function () {
                sendToast('天气预报：偏北风 8-9级！小心飞行，小心碰壁！');
            },1000);
        }
    };
    function sendToast(text) {
        console.log(text);
        var stage = document.getElementById('stage');
        var toast = document.getElementById('toast');
        toast && stage.removeChild(toast);
        var html = "<div id='toast' class='fadeInDown'>" + text + "</div>";
        stage.innerHTML += html;
        setTimeout(function () {
            toast = document.getElementById('toast');
            toast && stage.removeChild(toast);
        },2000);
    }
    function startGames() {
        var shouldHide = document.getElementById('shouldHide');
        shouldHide.style.display = 'none';
        build();
    }
    function build() {
        var canvas = document.getElementById('canvas');
        canvas.style.display = 'block';
        var context = canvas.getContext('2d');
        var img = document.getElementsByClassName('rain');
        var cloud = document.getElementsByClassName('cloud');
        var boss = document.getElementById('boss');
        var lastAdvance22 = 0;
        var f = 0;
        var lifevalue = 10;
        var energy = 0;
        var lastTime = 0;
        var Enemys = [];
        var keybuf = {};
        var discs = [];
        var balls = [];
        var cloudx = 0;
        var paos = [];
        var score = 0;
        var resurrection = 1;
        var bigpaos = [];
        var difficulty = 5;
        var protect = -1;
        var ballfires = [];
        var Lasers = [];
        const colors=["#33CC66","#0066FF","#FF9933","#FF0033","yellow","#CC00FF"];
        for(var i=0; i< 6; i++){
            var disc = {
                x: Math.pow(-1,Math.ceil(Math.random()*100))*Math.ceil(Math.random()*100),
                y: Math.pow(-1,Math.ceil(Math.random()*100))*Math.ceil(Math.random()*50),
                velocityX: Math.pow(-1,Math.ceil(Math.random()*100))*.1 + .1*Math.random(),
                velocityY: -.1*Math.random(),
                ximg: cloud[Math.floor(Math.random()*3)]
            }
            discs.push(disc);
        }
        var ghostattack = [
            { left: 0, top: 0, width: 51, height: 57 },
            { left: 121, top: 0, width: 53, height: 54 },
            { left: 183, top: 183, width: 53, height: 56 },
            { left: 127, top: 63, width: 43, height: 56 },
            { left: 9, top: 63, width: 42, height: 56 },
            { left: 127, top: 123, width: 49, height: 51 },
            { left: 122, top: 184, width: 59, height: 57 }

        ];
        var bigadds = false;
        var ghostCells = [
            { left: 0, top: 0, width: 51, height: 57 },
            { left: 121, top: 0, width: 53, height: 54 },
            { left: 184, top: 122, width: 49, height: 49 },
            { left: 183, top: 183, width: 53, height: 56 }
        ];
        var ghostup = [
            { left: 127, top: 63, width: 43, height: 56 },
            { left: 184, top: 122, width: 49, height: 49 },
            { left: 67, top: 0, width: 53, height: 59 },
            { left: 67, top: 63, width: 43, height: 56 }
        ];
        var ghostdie = [
            { left: 185, top: 63, width: 55, height: 57 },
            { left: 180, top: 0, width: 59,height: 59 }
        ];
        var ghostright = [
            { left: 0, top: 0, width: 51, height: 57 },
            { left: 127, top: 63, width: 43, height: 56 },
            { left: 127, top: 123, width: 49, height: 51 },
            { left: 122, top: 184, width: 59, height: 57 }
        ];
        var ghostdown = [
            { left: 0, top: 0, width: 51, height: 57 },
            { left: 121, top: 0, width: 53, height: 54 },
            { left: 127, top: 63, width: 43, height: 56 },
            { left: 9, top: 63, width: 42, height: 56 }
        ];
        var paofly = [
            { left: 4, top: 367, width: 8,height: 25},
            { left: 26, top: 367, width: 15,height: 25},
            { left: 47, top: 367, width: 24,height: 25},
            { left: 83, top: 367, width: 27,height: 25},
            { left: 120, top: 367, width: 32,height: 25},
            { left: 163, top: 367, width: 38,height: 25},
            { left: 120, top: 367, width: 32,height: 25},
            { left: 163, top: 367, width: 38,height: 25},
            { left: 120, top: 367, width: 32,height: 25},
            { left: 163, top: 367, width: 38,height: 25},
            { left: 120, top: 367, width: 32,height: 25},
            { left: 163, top: 367, width: 38,height: 25},
            { left: 216, top: 367, width: 40,height: 25},
            { left: 265, top: 367, width: 36,height: 25},
            { left: 216, top: 367, width: 40,height: 25},
            { left: 265, top: 367, width: 36,height: 25},
            { left: 216, top: 367, width: 40,height: 25},
            { left: 265, top: 367, width: 36,height: 25}
        ];
        var personlive = [
            { left: 16, top: 9, width: 22,height: 42},
            { left: 42, top: 9, width: 30,height: 42},
            { left: 77, top: 9, width: 30,height: 42},
            { left: 110, top: 9, width: 30,height: 42},
            { left: 144, top: 9, width: 30,height: 42},
            { left: 178, top: 9, width: 30,height: 42},
            { left: 212, top: 9, width: 30,height: 42}
        ];
        var persondown = [
            { left: 336, top: 206, width: 20,height: 36},
            { left: 76, top: 68, width: 23,height: 41},
        ];
        var personup = [
            { left: 4, top: 112, width: 30,height: 46},
            { left: 34, top: 112, width: 25,height: 46},
            { left: 60, top: 112, width: 27,height: 46},
            { left: 87, top: 112, width: 30,height: 46},
            { left: 119, top: 112, width: 31,height: 46},
            { left: 151, top: 112, width: 30,height: 46}
        ];
        var personattack = [
            { left: 470, top: 117, width: 30,height: 45},
            { left: 500, top: 117, width: 30,height: 45},
            { left: 530, top: 117, width: 30,height: 45},
            { left: 560, top: 117, width: 30,height: 45},
            { left: 597, top: 117, width: 35,height: 45}
        ]
        var personright = [
//			{ left: 4, top: 112, width: 30,height: 46},
//			{ left: 34, top: 112, width: 25,height: 46},
//			{ left: 60, top: 112, width: 27,height: 46},
            { left: 151, top: 112, width: 30,height: 46},
            { left: 287, top: 112, width: 28,height: 32},
            { left: 318, top: 126, width: 38,height: 32},
            { left: 366, top: 126, width: 38,height: 32},
            { left: 410, top: 126, width: 50,height: 32}
        ];
        var persondie = [
            { left: 9, top: 308, width: 26,height: 49},
            { left: 38, top: 308, width: 29,height: 49},
            { left: 71, top: 308, width: 29,height: 49},
            { left: 103, top: 308, width: 33,height: 49},
            { left: 138, top: 308, width: 28,height: 49},
            { left: 171, top: 308, width: 34,height: 49},
            { left: 205, top: 308, width: 30,height: 49},
            { left: 239, top: 308, width: 33,height: 49},
            { left: 274, top: 308, width: 29,height: 49},
            { left: 38, top: 308, width: 29,height: 49},
            { left: 9, top: 308, width: 26,height: 49}
        ];
        var personleft = [
            { left: 10, top: 257, width: 32,height: 44},
            { left: 44, top: 257, width: 32,height: 44},
            { left: 83, top: 257, width: 32,height: 44},
            { left: 119, top: 257, width: 32,height: 44},
            { left: 150, top: 257, width: 35,height: 44}
        ];
        var bigpaofly = [
            { left: 0, top: 1055, width: 27,height: 28},
            { left: 36, top: 1055, width: 36,height: 28},
            { left: 76, top: 1055, width: 36,height: 28},
            { left: 119, top: 1055, width: 36,height: 28},
            { left: 164, top: 1055, width: 36,height: 28},
            { left: 211, top: 1055, width: 35,height: 28},
            { left: 255, top: 1055, width: 36,height: 28}
        ];
        var fireball = [
//			{ left: 0, top: 2253, width: 20,height: 43},
//			{ left: 20, top: 2253, width: 22,height: 43},
//			{ left: 42, top: 2253, width: 35,height: 43},
//			{ left: 81, top: 2253, width: 45,height: 43},
//			{ left: 131, top: 2253, width: 57,height: 43},
            { left: 216, top: 2253, width: 60,height: 43},
            { left: 281, top: 2253, width: 57,height: 43},
            { left: 342, top: 2253, width: 61,height: 43},
            { left: 409, top: 2253, width: 57,height: 43},
            { left: 470, top: 2253, width: 60,height: 43},
            { left: 536, top: 2253, width: 59,height: 43}
        ];
        var Laserfly = [
            { left: 0, top: 405, width: 1031,height: 131},
            { left: 0, top: 269, width: 1031,height: 131},
            { left: 0, top: 405, width: 1031,height: 131},
            { left: 0, top: 269, width: 1031,height: 131},
            { left: 0, top: 405, width: 1031,height: 131},
            { left: 0, top: 269, width: 1031,height: 131},
            { left: 0, top: 0, width: 1031,height: 131},
            { left: 0, top: 138, width: 1031,height: 131},
        ];
        var	LaserInPlace = {
            lastAdvance: 0,
            pageflip_interval: 100,
            execute: function(sprite, context, now){
                if(now - this.lastAdvance > this.pageflip_interval){
                    for(var i = 0; i < Lasers.length;i++)
                        Lasers[i].painter.advance(0);
                    this.lastAdvance = now;
                }
            }

        };
        var secondPlace = {
            lastAdvance: 0,
            pageflip_interval: 1000,
            execute: function(sprite, context, now){
                if(now - this.lastAdvance > this.pageflip_interval){
//					addfireball();
                    if(protect > 0){
                        protect -- ;
                    }
                    this.lastAdvance = now;
                }
            }
        };

        var	runInPlace = {
            lastAdvance: 0,
            pageflip_interval: 100,
            execute: function(sprite, context, now){
                ghost.left = ghost.velocityX + ghost.left;
                    ghost.top = ghost.velocityY + ghost.top;
                    ghost.velocityY = Math.min(10,ghost.velocityY + ghost.gravity);
                    ghost.velocityX = Math.min(5,ghost.velocityX - .2*ghost.gravity);
                ghost.width = ghost.painter.cells[ghost.painter.cellIndex].width;
                ghost.height = ghost.painter.cells[ghost.painter.cellIndex].height;
                paoDetection();
                collisionDetection();
                if(ghost.left + ghost.width >= context.canvas.width){
                    ghost.left = context.canvas.width - ghost.width;
                    ghost.velocityX = -.5*ghost.velocityX;
                    persondies();
                }
                if(ghost.left <= 0){
                    ghost.left = 0;
                    ghost.velocityX = -.5*ghost.velocityX;
                    persondies();
                }
                if(ghost.top <= 0){
                    ghost.top = 0;
                    ghost.velocityY = -.5*ghost.velocityY;
                    persondies();
                }
                if(ghost.top + ghost.height >= context.canvas.height){
                    ghost.top = context.canvas.height - ghost.height;
                    ghost.velocityY = -.5*ghost.velocityY;
                    persondies();
                }
                if(now - this.lastAdvance > this.pageflip_interval){
                    addEnemy();
                    if(bigadds == true)
                        addpaos(ghost.left + 28,ghost.top + 8);
                    if(ghost.painter.cells != persondie){
                        ghost.painter.advance(0);
                    }else{
                        ghost.painter.advance(1);
                    }
                    this.lastAdvance = now;
                }

            }
        };
        var	EnemyInPlace = {
            lastAdvance: 0,
            pageflip_interval: 100,
            execute: function(sprite, context, now){
                if(now - this.lastAdvance > this.pageflip_interval){
                    for(var i = 0;i < Enemys.length; i++)
                        Enemys[i].painter.advance(1);
                    this.lastAdvance = now;
                }

            }
        };
        function protectperson(){
            protect = 2;
            if(ghost.painter.cells != persondie)
                ghost.painter = new SpriteSheetPainter(persondie);
        }
        function persondies(){
            if(protect > 0)
                return;
            if(ghost.die)
                return;
            protectperson();
            ghost.lifeValue --;

            if(ghost.lifeValue == 0){
                if(ghost.painter.cells != persondie)
                    ghost.painter = new SpriteSheetPainter(persondie);
                ghost.velocityX = 0;
                ghost.velocityY = 0;
                ghost.gravity = 0;
                ghost.die = true;
                if(resurrection <= 0){
                    var alert = document.getElementById('dialog');
                    alert.style.display = 'block';

                }else{
                    sendToast('你死了..按P可复活');
                }
            }
        }
        function IncreaseDifficulty(){
            if(score <= 50 && score >= 10){
                difficulty = 10;
                msg['A'] == null && sendToast('加大难度啦！');
                if(msg['A'] == null)
                    msg['A'] = 1;
            }else if(score <= 100 && score > 50){
                difficulty = 15;
                if(msg['B'] == null){
                    sendToast('再接再厉！您的武器获得了升级 z键触发');
                    var skillBtn = document.getElementsByClassName('skill');
                    if(skillReg.test(skillBtn[1].className)){
                        skillBtn[1].className = skillBtn[1].className.replace(skillReg,'');
                    }
                }
                if(msg['B'] == null)
                    msg['B'] = 1;
            }else if(score <= 150 && score > 100){
                difficulty = 30;
                if(msg['C'] == null){
                    sendToast('地狱模式！开启大招强化 R键触发 ———— BOSS正在靠近');
                    var skillBtn = document.getElementsByClassName('skill');
                    if(skillReg.test(skillBtn[2].className)){
                        skillBtn[2].className = skillBtn[2].className.replace(skillReg,'');
                    }
                }
                if(msg['C'] == null)
                    msg['C'] = 1;
            }else if(score <= 200 && score > 150){
                difficulty = 40;
                if(msg['D'] == null){
                    sendToast(' ———— BOSS还在靠近 500m  给点火吧！');
                    var skillBtn = document.getElementsByClassName('skill');
                    if(skillReg.test(skillBtn[3].className)){
                        skillBtn[3].className = skillBtn[3].className.replace(skillReg,'');
                    }
                    addfireball();
                }
                if(msg['D'] == null)
                    msg['D'] = 1;
            }
        }

        function threeadds(){
            addpaos(ghost.left ,ghost.top + 8,5,1);
            addbig(ghost.left + 28,ghost.top + 0);
            addpaos(ghost.left + 28,ghost.top + 20,5,-1);
        }
        function addEnemy(a=1000,b= -3.5,c=0){
            var Enemy = new Sprite('Enemy', new SpriteSheetPainter(ghostCells),[EnemyInPlace,secondEnemy]);
            Enemy.spritesheet.src = './img/ren.png';
            Enemy.left = a;
            Enemy.top = Math.ceil(Math.random()*400);
            Enemy.velocityX = b;
            Enemy.velocityY = c;

            Enemys.push(Enemy);
        }
        function paintEnemy(context,time){
            for(var i = 0;i < Enemys.length;i++){
                Enemys[i].left = Enemys[i].left + Enemys[i].velocityX;
                Enemys[i].top = Enemys[i].top + Enemys[i].velocityY;
                Enemys[i].width = Enemys[i].painter.cells[Enemys[i].painter.cellIndex].width;
                Enemys[i].height = Enemys[i].painter.cells[Enemys[i].painter.cellIndex].height;
                Enemys[i].update(context , time);
                Enemys[i].paint(context);
                if(Math.floor(i*Math.random()*50) == 5){
                    addballs(Enemys[i].left,Enemys[i].top + 25);
                }
            }
            var cnt=0;
            for(var i = 0;i<Enemys.length;i++){
                if(Enemys[i].left + Enemys[i].width  > 0 && Enemys[i].left  < context.canvas.width && Enemys[i].top <  context.canvas.height)
                    Enemys[cnt++] = Enemys[i];
            }
            while(Enemys.length > Math.min(difficulty,cnt)){
                Enemys.pop();
            }
        }
        function lifecalue(){
            var str = "";
            for(var i = 0;i < ghost.lifeValue; i++)
                str += '●';
            if(ghost.lifeValue == 0)
                str = '⊙﹏⊙';
            return str;
        }
        var ghost = new Sprite('ghost', new SpriteSheetPainter(personlive),[runInPlace,secondPlace]);
        ghost.lifeValue = lifevalue;
        function calculateFps(){
            var now = (+new Date),
                fps = 1000 / (now - lastTime);
            lastTime = now;
            return fps;
        }
        function collisionDetection(){
            for(var i = 0;i < Enemys.length;i++){
                var distance = Math.sqrt(Math.pow((ghost.left + .5*ghost.width) - (Enemys[i].left + .5*Enemys[i].width),2) + Math.pow((ghost.top + .5*ghost.height) - (Enemys[i].top + .5*Enemys[i].height),2));
                if(distance <= 40 && !Enemys[i].die)
                    persondies();
            }
            for(var i = 0;i < balls.length;i++){
                var distance = Math.sqrt(Math.pow((ghost.left + .5*ghost.width) - balls[i].x,2) + Math.pow((ghost.top + .5*ghost.height) - balls[i].y,2));
                if(distance <= 30){
                    persondies();
                    balls.splice(i,1);
                }
            }
        }

        var secondEnemy = {
            lastAdvance: 0,
            pageflip_interval: 1000,
            execute: function(sprite, context, now){
                if(now - this.lastAdvance > this.pageflip_interval){
                    this.lastAdvance = now;
                }
            }
        };
        function paoDetection(){
            if(ghost.die)
                return;
            for(var j = 0;j < paos.length; j++){
                for(var i = 0;i < Enemys.length;i++){
                    var distance = Math.sqrt(Math.pow((paos[j].left) - (Enemys[i].left + .5*Enemys[i].width),2) + Math.pow(paos[j].top - (Enemys[i].top + .5*Enemys[i].height),2));
                    if(distance <= 31 && !Enemys[i].die)
                    {
                        score++;
                        Enemys[i].die = true;
                        Enemys[i].velocityY = 5;
                        Enemys[i].painter = new SpriteSheetPainter(ghostdie);
                        paos.splice(j,1);
                        break;
                    }

                }
            }
            for(var j = 0;j < Lasers.length; j++){
                for(var i = 0;i < Enemys.length;i++){
                    if(Enemys[i].top + Enemys[i].height >= Lasers[j].top + 24 && Enemys[i].top <= Lasers[j].top + 100 && Enemys[i].left + Enemys[i].width >= Lasers[j].left && !Enemys[i].die)
                    {
                        score = score + 1;
                        Enemys[i].die = true;
                        Enemys[i].velocityY = 5;
                        Enemys[i].painter = new SpriteSheetPainter(ghostdie);
                        break;
                    }
                }
            }
            for(var j = 0;j < Lasers.length; j++){
                for(var i = 0;i < balls.length;i++){
                    if(balls[i].y + balls[i].radius >= Lasers[j].top + 24 && balls[i].y <= Lasers[j].top + 100 && balls[i].x + balls[i].radius >= Lasers[j].left ){
                        score++;
                        balls.splice(i,1);
                        break;
                    }
                }
            }
            for(var j = 0;j < bigpaos.length; j++){
                for(var i = 0;i < Enemys.length;i++){
                    var distance = Math.sqrt(Math.pow((bigpaos[j].left) - (Enemys[i].left + .5*Enemys[i].width),2) + Math.pow(bigpaos[j].top - (Enemys[i].top + .5*Enemys[i].height),2));
                    if(distance <= 40  && !Enemys[i].die)
                    {
                        score = score + 1;
                        Enemys[i].die = true;
                        Enemys[i].velocityY = 5;
                        Enemys[i].painter = new SpriteSheetPainter(ghostdie);
                        bigpaos.splice(j,1);
                        break;
                    }

                }
            }
            for(var j = 0;j < ballfires.length; j++){
                for(var i = 0;i < Enemys.length;i++){
                    var distance = Math.sqrt(Math.pow((ballfires[j].left) - (Enemys[i].left + .5*Enemys[i].width),2) + Math.pow(ballfires[j].top - (Enemys[i].top + .5*Enemys[i].height),2));
                    if(distance <= 40  && !Enemys[i].die)
                    {
                        score = score +5;
                        Enemys[i].die = true;
                        Enemys[i].velocityY = 5;
                        Enemys[i].painter = new SpriteSheetPainter(ghostdie);
                        ballfires.splice(j,1);
                        break;
                    }

                }
            }
        }

        window.addEventListener('keydown', doKeyDown, true);
        window.addEventListener('keyup', doKeyup, true);
        function doKeyup(e) {
            e.preventDefault();
            keybuf[e.keyCode] = false;
            if(ghost.die)
                return;
            ghost.gravity = .1;
            if(ghost.painter.cells != personup && protect <= 0)
                ghost.painter = new SpriteSheetPainter(personup);
        }
        function doKeyDown(e) {
            e.preventDefault();
            keybuf[e.keyCode] = true;
            var keyID = "";
            for (k in keybuf) {
                if (keybuf[k] == true) {
                    keyID += k + " ";
                }
            }
            if(keyID.indexOf('82') != -1 ) {
                if(ghost.die || score < 100)
                    return;
                if(ghost.painter.cells != personleft && protect <= 0)
                    ghost.painter = new SpriteSheetPainter(personleft);
                if(protect <= 0){
                    addLaser(ghost.left + 22,ghost.top - 46);
                    ghost.velocityX = 0;
                    ghost.velocityY = 0;
                    ghost.gravity = 0;
                }
            }
            if(keyID.indexOf('82') != -1)
                return;
            if(keyID.indexOf('80') != -1) {
                if(!ghost.die || resurrection <= 0)
                    return;
                if(ghost.painter.cells != personlive && protect <= 0)
                    ghost.painter = new SpriteSheetPainter(personlive);
                score = Math.floor(score * 1/2);
                ghost.lifeValue = lifevalue;
                ghost.left = 200;
                ghost.top = 200;
                ghost.velocityX = 0;
                ghost.velocityY = 0;
                ghost.gravity = .1;
                ghost.die = false;
                for(var i = 0; i < Enemys.length; i ++){
                    Enemys[i].die = true;
                    Enemys[i].velocityY = 5;
                    Enemys[i].painter = new SpriteSheetPainter(ghostdie);
                }
                resurrection --;
                sendToast('复活后拥有3秒的保护时间，起来战斗吧！');
            }

            if(ghost.die)
                return;
            if(keyID.indexOf('65') != -1 && keyID.indexOf('38') != -1) {
                if(ghost.die || score < 200)
                    return;
                if(ghost.painter.cells != personattack && protect <= 0)
                    ghost.painter = new SpriteSheetPainter(personattack);
                if(protect <= 0)
                    addfireball();
            }
            if(keyID.indexOf('88') != -1) {
                if(ghost.painter.cells != personattack && protect <= 0)
                    ghost.painter = new SpriteSheetPainter(personattack);
                if(protect <= 0)
                    addpaos(ghost.left + 28,ghost.top + 8);
            }
            if(keyID.indexOf('90') != -1) {
                if(score < 50)
                    return;
                if(ghost.painter.cells != personattack && protect <= 0)
                    ghost.painter = new SpriteSheetPainter(personattack);
                if(protect <= 0)
                    addbig(ghost.left + 28,ghost.top + 8);
            }
//				if(keyID.indexOf('32') != -1) {
////					if(score <= 20){
////						return;
////					}
////					if(bigadds == true)
////						bigadds = false;
////					else
////						bigadds = true;
//					threeadds();
//				}

            if(keyID.indexOf('38') != -1)  { // up arrow and W
                ghost.velocityY = Math.min(4,.3 * ghost.velocityY - 4);
                if(ghost.painter.cells != persondown && protect <= 0)
                    ghost.painter = new SpriteSheetPainter(persondown);

            }
            if(keyID.indexOf('39') != -1)  { // right arrow and D
                ghost.velocityX = Math.min(4,ghost.velocityX + 1.3);
                if(ghost.painter.cells != personright && protect <= 0)
                    ghost.painter = new SpriteSheetPainter(personright);
            }
            if(keyID.indexOf('40') != -1)  { // down arrow and S
                ghost.velocityY = Math.min(4,Math.abs(ghost.velocityY + .1*ghost.velocityY));
                if(ghost.painter.cells != persondown && protect <= 0)
                    ghost.painter = new SpriteSheetPainter(persondown);
            }
            if(keyID.indexOf('37') != -1)  { // left arrow and A
                ghost.velocityX = Math.min(1,.3 * ghost.velocityX - 2);
                if(ghost.painter.cells != personleft && protect <= 0)
                    ghost.painter = new SpriteSheetPainter(personleft);
            }
        }
        function drawbackground(now){

            var pageflip_interval = 100;
            if(now - lastAdvance22 > pageflip_interval){
                if(f == img.length-1)
                    f = 0;
                else
                    f ++;
                lastAdvance22 = now;
            }
            context.drawImage(img[f], 0, 0);

        }
        function addballs(a,b){
            if(ghost.die)
                return;
            var ball = {
                x: a ,
                y: b ,
                lastX: a + 48,
                lastY: b + 51,
                velocityX: -8,
                velocityY: 0,
                gravity: .1,
                radius: 5,
                color:colors[Math.floor(Math.random()*colors.length)],
            }

            balls.push(ball);
        }
        function ballsrun(context){
            for(var i=0; i < balls.length; i++){
                if(balls[i].y >= 500){
                    balls[i].y = 500;
                    balls[i].velocityY = -balls[i].velocityY;
                }
                balls[i].x = balls[i].x + balls[i].velocityX;
                balls[i].y = balls[i].y + balls[i].velocityY;
                balls[i].velocityY = balls[i].velocityY + balls[i].gravity;
                context.save();
                context.beginPath();
                context.arc(balls[i].x, balls[i].y, balls[i].radius, 0, 2 * Math.PI);
                context.fillStyle = balls[i].color;
                context.fill();
                context.restore();
            }

            var cnt=0;
            for(var i=0;i<balls.length;i++){
                if(balls[i].x + balls[i].radius > 0 && balls[i].x - balls[i].radius < context.canvas.width)
                    balls[cnt++] = balls[i];
            }
            while(balls.length > Math.min(100,cnt)){
                balls.pop();
            }
        }
        function cloudrun(context){
            for(var i=0; i < discs.length; i++){
                if(discs[i].x > 1400 || discs[i].x < -400 ){
                    discs[i].velocityX = -discs[i].velocityX;
                }
                if(discs[i].y > 700 || discs[i].y < -200){
                    discs[i].velocityY = -discs[i].velocityY;
                }
                discs[i].x = discs[i].x + discs[i].velocityX;
                discs[i].y = discs[i].y + discs[i].velocityY;
                context.drawImage(discs[i].ximg, discs[i].x, discs[i].y);
            }
        }
        var	paoInPlace = {
            lastAdvance: 0,
            pageflip_interval: 200,
            execute: function(sprite, context, now){
                if(now - this.lastAdvance > this.pageflip_interval){
                    for(var i = 0;i < paos.length; i++)
                        paos[i].painter.advance(0);
                    this.lastAdvance = now;
                }

            }
        };
        var	bigpaoInPlace = {
            lastAdvance: 0,
            pageflip_interval: 100,
            execute: function(sprite, context, now){
                if(now - this.lastAdvance > this.pageflip_interval){
                    for(var i = 0;i < bigpaos.length; i++)
                        bigpaos[i].painter.advance(1);
                    this.lastAdvance = now;
                }

            }
        };
        function addpaos(a,b,c = 5,d = 0){
            if(ghost.die)
                return;
            var pao = new Sprite('pao', new SpriteSheetPainter(paofly),[paoInPlace]);
            pao.spritesheet.src = 'img/pao.png';
            pao.left = a;
            pao.top = b;
            pao.velocityX = c;
            pao.velocityY = d;
            paos.push(pao);
        }
        function paosrun(context,time){
            for(var i = 0;i < paos.length; i++){
                paos[i].left = paos[i].left +paos[i].velocityX;
                paos[i].top = paos[i].top +paos[i].velocityY;
                paos[i].update(context, time);
                paos[i].paint(context);
            }
            var cnt=0;
            for(var i = 0;i<paos.length;i++){
                if(paos[i].left  > 0 && paos[i].left  < context.canvas.width)
                    paos[cnt++] = paos[i];
            }
            while(paos.length > Math.min(100,cnt)){
                paos.pop();
            }
        }
        var	ballfireInPlace = {
            lastAdvance: 0,
            pageflip_interval: 100,
            execute: function(sprite, context, now){
                if(now - this.lastAdvance > this.pageflip_interval){
                    for(var i = 0;i < ballfires.length; i++)
                        ballfires[i].painter.advance(1);
                    this.lastAdvance = now;
                }

            }
        };
        function addfireball(){
            if(ghost.fireTime == null){
                ghost.fireTime = new Date().getTime();
            }else{
                var nowTime = new Date().getTime();
                var timestamp = nowTime - ghost.fireTime;
                if(timestamp > 3000){
                    ghost.fireTime = nowTime;
                }else{
                    sendToast('技能cd中..');
                    return;
                }
            }
            for(var i = 10; i< Math.max(30,Math.ceil(Math.random()*50)); i++){
                var ballfire = new Sprite('ballfire', new SpriteSheetPainter(fireball),[ballfireInPlace]);
                ballfire.spritesheet.src ='img/Sasuke.png';
                ballfire.left = Math.ceil(Math.random()*980);
                ballfire.top = -20;
                ballfire.velocityX = Math.random()*5;
                ballfire.velocityY = Math.random()*5;
                ballfires.push(ballfire);
            }
        }
        function paintballfire(context, time){
            for(var i = 0;i < ballfires.length;i++){
                ballfires[i].left = ballfires[i].left + ballfires[i].velocityX;
                ballfires[i].top = ballfires[i].top + ballfires[i].velocityY;
                ballfires[i].width = ballfires[i].painter.cells[ballfires[i].painter.cellIndex].width;
                ballfires[i].height = ballfires[i].painter.cells[ballfires[i].painter.cellIndex].height;
                ballfires[i].update(context , time);
                ballfires[i].paint(context);
            }
            var cnt = 0;
            for(var i = 0;i < ballfires.length;i++){
                if(ballfires[i].left  > 0 && ballfires[i].left  < context.canvas.width && ballfires[i].top < context.canvas.height)
                    ballfires[cnt++] = ballfires[i];
            }
            while(ballfires.length > Math.min(100,cnt)){
                ballfires.pop();
            }
        }
        function addbig(a,b,c = 8,d = Math.pow(-1,Math.ceil(Math.random()*100))){
            if(ghost.die)
                return;
            var bigpao = new Sprite('bigpao', new SpriteSheetPainter(bigpaofly),[bigpaoInPlace]);
            bigpao.spritesheet.src ='img/Sasuke.png';
            bigpao.left = a;
            bigpao.top = b;
            bigpao.velocityX = c;
            bigpao.velocityY = d;
            bigpaos.push(bigpao);
        }
        function bigpaosrun(context,time){
            for(var i = 0;i < bigpaos.length; i++){
                bigpaos[i].left = bigpaos[i].left +bigpaos[i].velocityX;
                bigpaos[i].top = bigpaos[i].top +bigpaos[i].velocityY;
                bigpaos[i].update(context, time);
                bigpaos[i].paint(context);
            }
            var cnt = 0;
            for(var i = 0;i < bigpaos.length;i++){
                if(bigpaos[i].left  > 0 && bigpaos[i].left  < context.canvas.width)
                    bigpaos[cnt++] = bigpaos[i];
            }
            while(bigpaos.length > Math.min(5,cnt)){
                bigpaos.pop();
            }
        }
        function addLaser(a,b){
            if(ghost.die)
                return;
            if(ghost.laserTime == null){
                ghost.laserTime = new Date().getTime();
            }else{
                var nowTime = new Date().getTime();
                var timestamp = nowTime - ghost.laserTime;
                if(timestamp > 3000){
                    ghost.laserTime = nowTime;
                }else{
                    sendToast('技能cd中..');
                    return;
                }
            }
            var Laser = new Sprite('Laser', new SpriteSheetPainter(Laserfly),[LaserInPlace]);
            Laser.spritesheet.src ='img/Laser.png';
            Laser.left = a;
            Laser.top = b;
            Lasers.push(Laser);

        }
        function paintLaser(context,time){
            for(var i = 0; i < Lasers.length;i++){
                Lasers[i].update(context, time);
                Lasers[i].paint(context);
                if(Lasers[i].painter.cellIndex == Laserfly.length-1)
                    Lasers.splice(i,1);
            }
        }
        ghost.spritesheet.src = 'img/pao.png';
        ghost.left = 200;
        ghost.top = 200;
        ghost.velocityX = 0;
        ghost.velocityY = 0;

        function mainCycle(time) {
            IncreaseDifficulty();
            ghost.update(context, time);
            paintEnemy(context,time);
            ballsrun(context);
            context.fillStyle = "white";
            context.fillText(calculateFps().toFixed() + 'fps', 20, 80);
            context.fillText( '得分:'+ score, 20, 40);
            context.fillText( '复活次数:'+ resurrection, 20, 60);
            context.fillText( '生命值:'+ lifecalue(), 20, 20);
            drawbackground(time);
            cloudrun(context);
            paintballfire(context ,time);
            ghost.paint(context);
            paosrun(context, time);
            bigpaosrun(context, time);
            paintLaser(context,time);
        }
        function animate(time){
            if(flag)
                return;
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            mainCycle(time);
            window.requestAnimationFrame(animate);
        }
        window.requestAnimationFrame(animate);
        document.onclick = function (e) {
            if(e.target.id != 'stop')
                return;
            console.log(e.target.checked);
            flag = e.target.checked;
            flag || window.requestAnimationFrame(animate);
        };
    };
})();