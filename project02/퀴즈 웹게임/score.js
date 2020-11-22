var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var pathname = url.parse(_url, true).pathname;

    if(pathname == '/stage1') {
        var stage1 = `
        <html>

        <head>
            <title>퀴즈 게임(다형식 동영상)</title>
            <meta charset="utf-8">
            <style>
                .thing {
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    border: 2px;
                    border-style: double;
                    background-color: white;
                    margin: 5px;
                    padding: 5px;
                }

                #vid {
                    position: absolute;
                    visibility: hidden;
                    z-index: 0;
                }
            </style>

            <script type="text/javascript">
                var facts = [
                    ["중국", "베이징", false],
                    ["인도", "뉴 델리", false],
                    ["유럽 연합", "브뤼셀", false],
                    ["미국", "워싱톤, DC", false],
                    ["인도네시아", "자카르타", false],
                    ["브라질", "브라질리아", false],
                    ["러시아", "모스크바", false],
                    ["일본", "도쿄", false],
                    ["멕시코", "멕시코 시티", false],
                    ["독일", "베를린", false],
                    ["터키", "앙카라", false],
                    ["프랑스", "파리", false],
                    ["영국", "런던", false],
                    ["이탈리아", "로마", false],
                    ["남아프리카", "프레토리아", false],
                    ["대한민국", "서울", false],
                    ["아르헨티나", "부에노스 아이레스", false],
                    ["캐나다", "오타와", false],
                    ["사우디 아라비아", "리야드", false],
                    ["호주", "캔버라", false]
                ];

                var thingelem;
                var nq = 4;  // 총 몇 개의 게임슬롯 구성하는지 설정
                var elementinmotion;
                var makingmove = false;
                var inbetween = 300;
                var col1 = 20;
                var row1 = 200;
                var rowsize = 50;
                var slots = new Array(nq); // 내가 선택한 정답 1슬롯

                function init() { // 초기
                    setupgame();
                }

                function setupgame() {  // 게임세팅
                    var i;
                    var c;
                    var s;
                    var mx = col1;
                    var my = row1;
                    var d;
                    var uniqueid;
                    // mark all faces as not being used.
                    for (i = 0; i < facts.length; i++) {
                        facts[i][2] = false;
                    }
                    for (i = 0; i < nq; i++) {
                        slots[i] = -100;
                    }
                    for (i = 0; i < nq; i++) {
                        do { c = Math.floor(Math.random() * facts.length); } // 랜덤으로 게임뽑음
                        while (facts[c][2] == true)
                        // country 국가 세팅
                        facts[c][2] = true;
                        uniqueid = "c" + String(c);
                        d = document.createElement('country');
                        d.innerHTML = (
                            "<div class='thing' id='" + uniqueid + "'>placeholder</div>"); // 랜덤으로 뽑힘 게임
                        document.body.appendChild(d);
                        thingelem = document.getElementById(uniqueid);
                        thingelem.textContent = facts[c][0]; // 왼쪽
                        thingelem.style.top = String(my) + "px"; // 이동하기전
                        thingelem.style.left = String(mx) + "px";
                        thingelem.addEventListener('click', pickelement, false); // 클릭하면 pickelement 이벤트
                        // cap 수도
                        uniqueid = "p" + String(c);
                        d = document.createElement('cap');
                        d.innerHTML = (
                            "<div class='thing' id='" + uniqueid + "'>placeholder</div>");
                        document.body.appendChild(d);
                        thingelem = document.getElementById(uniqueid);
                        thingelem.textContent = facts[c][1]; // 오른쪽
                        // put this thing in random choice from empty slots
                        do { s = Math.floor(Math.random() * nq); }
                        while (slots[s] >= 0)
                        slots[s] = c;
                        thingelem.style.top = String(row1 + s * rowsize) + "px"; // 이동한 후
                        thingelem.style.left = String(col1 + inbetween) + "px";
                        thingelem.addEventListener('click', pickelement, false); // 클릭하면 pickelement 이벤트
                        my += rowsize;
                    }
                    document.f.score.value = "0";
                    return false;
                }

                function pickelement(ev) { // 결과출력(정답일때 오답일때)
                    var thisx;
                    var thisxn;
                    var sc;
                    if (makingmove) { // 안누르면 = false
                        if (this == elementinmotion) { 
                            elementinmotion.style.backgroundColor = "white";
                            makingmove = false;
                            return;
                        }
                        thisx = this.style.left;
                        thisx = thisx.substring(0, thisx.length - 2);  //remove the px
                        thisxn = Number(thisx) + 115;
                        elementinmotion.style.left = String(thisxn) + "px";
                        elementinmotion.style.top = this.style.top;
                        makingmove = false;
                        if (this.id.substring(1) == elementinmotion.id.substring(1)) {  // 정답이면
                            elementinmotion.style.backgroundColor = "gold";
                            this.style.backgroundColor = "gold";
                            document.f.out.value = "정답";
                            sc = 10 + Number(document.f.score.value);
                            document.f.score.value = String(sc);
                            if (sc == nq * 10) { // 전부 정답이면
                                v = document.getElementById("vid");
                                v.style.visibility = "visible";
                                v.style.zIndex = "10000";
                                v.play();
                                alert("축하드립니다! 다음스테이지로 이동합니다.");
                                
                                location.href = "quizmultiple2.html"//해당 주소로 이동하는방법
                            }
                        }
                        else { // 오답이면
                            document.f.out.value = "오답";
                            sc = -10 + Number(document.f.score.value);
                            elementinmotion.style.backgroundColor = "white";
                            alert("땡! 처음부터 다시 시작합니다");
                            window.location.reload(true);
                        }
                    }
                    else { //누르면 true
                        makingmove = true;
                        elementinmotion = this;
                        elementinmotion.style.backgroundColor = "tan";
                    }
                }
            </script>
        </head>

        <body onLoad="init();">
            <h1>G20 국가와 수도</h1> <br />

            국가와 그에 맞는 수도를 차례로 클릭하세요(클릭 순서 무관)
            <p>
                게임을 새로 시작하려면 페이지를 새로고침 하세요.
                <form name="f">
                    결과: <input name="out" type="text" value="정답이냐 오답이냐" />
                    점수: <input name="score" type="text" value="0" />
                </form>
            </p>

            <video id="vid" controls="controls" preload="auto">
                <source src="shortfireworks.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
                <source src="shortfireworks.theora.ogv" type='video/ogg; codecs="theora, vorbis"'>
                <source src="shortfireworks.webmvp8.webm" type="video/webm; codec=" vp8, vorbis"'">
                이 브라우저는 video 태그를 인식하지 못 합니다.
            </video>
        </body>

        </html>
        `;
    response.writeHead(200);
    response.end(stage1);    
    } 
    else if(pathname == '/stage2'){
        var stage2 =`
        <html>

        <head>
            <title>퀴즈 게임(다형식 동영상)</title>
            <meta charset ="utf-8">
            <style>
                .thing {
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    border: 2px;
                    border-style: double;
                    background-color: white;
                    margin: 5px;
                    padding: 5px;
                }

                #vid {
                    position: absolute;
                    visibility: hidden;
                    z-index: 0;
                }
            </style>

            <script type="text/javascript">
                var facts = [
                    ["중국", "베이징", false],
                    ["인도", "뉴 델리", false],
                    ["유럽 연합", "브뤼셀", false],
                    ["미국", "워싱톤, DC", false],
                    ["인도네시아", "자카르타", false],
                    ["브라질", "브라질리아", false],
                    ["러시아", "모스크바", false],
                    ["일본", "도쿄", false],
                    ["멕시코", "멕시코 시티", false],
                    ["독일", "베를린", false],
                    ["터키", "앙카라", false],
                    ["프랑스", "파리", false],
                    ["영국", "런던", false],
                    ["이탈리아", "로마", false],
                    ["남아프리카", "프레토리아", false],
                    ["대한민국", "서울", false],
                    ["아르헨티나", "부에노스 아이레스", false],
                    ["캐나다", "오타와", false],
                    ["사우디 아라비아", "리야드", false],
                    ["호주", "캔버라", false]
                ];

                var thingelem;
                var nq = 4;  // 총 몇 개의 게임슬롯 구성하는지 설정
                var elementinmotion;
                var makingmove = false;
                var inbetween = 300;
                var col1 = 20;
                var row1 = 200;
                var rowsize = 50;
                var slots = new Array(nq); // 내가 선택한 정답 1슬롯

                function init() { // 초기
                    setupgame();
                }

                function setupgame() {  // 게임세팅
                    var i;
                    var c;
                    var s;
                    var mx = col1;
                    var my = row1;
                    var d;
                    var uniqueid;
                    // mark all faces as not being used.
                    for (i = 0; i < facts.length; i++) {
                        facts[i][2] = false;
                    }
                    for (i = 0; i < nq; i++) {
                        slots[i] = -100;
                    }
                    for (i = 0; i < nq; i++) {
                        do { c = Math.floor(Math.random() * facts.length); } // 랜덤으로 게임뽑음
                        while (facts[c][2] == true)
                        // country 국가 세팅
                        facts[c][2] = true;
                        uniqueid = "c" + String(c);
                        d = document.createElement('country');
                        d.innerHTML = (
                            "<div class='thing' id='" + uniqueid + "'>placeholder</div>"); // 랜덤으로 뽑힘 게임
                        document.body.appendChild(d);
                        thingelem = document.getElementById(uniqueid);
                        thingelem.textContent = facts[c][0]; // 왼쪽
                        thingelem.style.top = String(my) + "px"; // 이동하기전
                        thingelem.style.left = String(mx) + "px";
                        thingelem.addEventListener('click', pickelement, false); // 클릭하면 pickelement 이벤트
                        // cap 수도
                        uniqueid = "p" + String(c);
                        d = document.createElement('cap');
                        d.innerHTML = (
                            "<div class='thing' id='" + uniqueid + "'>placeholder</div>");
                        document.body.appendChild(d);
                        thingelem = document.getElementById(uniqueid);
                        thingelem.textContent = facts[c][1]; // 오른쪽
                        // put this thing in random choice from empty slots
                        do { s = Math.floor(Math.random() * nq); }
                        while (slots[s] >= 0)
                        slots[s] = c;
                        thingelem.style.top = String(row1 + s * rowsize) + "px"; // 이동한 후
                        thingelem.style.left = String(col1 + inbetween) + "px";
                        thingelem.addEventListener('click', pickelement, false); // 클릭하면 pickelement 이벤트
                        my += rowsize;
                    }
                    document.f.score.value = "40";
                    return false;
                }

                function pickelement(ev) { // 결과출력(정답일때 오답일때)
                    var thisx;
                    var thisxn;
                    var sc;
                    if (makingmove) { // 안누르면 = false
                        if (this == elementinmotion) { 
                            elementinmotion.style.backgroundColor = "white";
                            makingmove = false;
                            return;
                        }
                        thisx = this.style.left;
                        thisx = thisx.substring(0, thisx.length - 2);  //remove the px
                        thisxn = Number(thisx) + 115;
                        elementinmotion.style.left = String(thisxn) + "px";
                        elementinmotion.style.top = this.style.top;
                        makingmove = false;
                        if (this.id.substring(1) == elementinmotion.id.substring(1)) {  // 정답이면
                            elementinmotion.style.backgroundColor = "gold";
                            this.style.backgroundColor = "gold";
                            document.f.out.value = "정답";
                            sc = 10 + Number(document.f.score.value);
                            document.f.score.value = String(sc);
                            if (sc == nq * 10) { // 전부 정답이면
                                v = document.getElementById("vid");
                                v.style.visibility = "visible";
                                v.style.zIndex = "10000";
                                v.play();
                                alert("축하드립니다! 다음스테이지로 이동합니다.");
                                
                            }
                        }
                        else { // 오답이면
                            document.f.out.value = "오답";
                            sc = -10 + Number(document.f.score.value);
                            elementinmotion.style.backgroundColor = "white";
                            alert("땡! 처음부터 다시 시작합니다");
                            location.href = "quizmultiple.html";
                        }
                    }
                    else { //누르면 true
                        makingmove = true;
                        elementinmotion = this;
                        elementinmotion.style.backgroundColor = "tan";
                    }
                }
            </script>
        </head>

        <body onLoad="init();">
            <h1>G20 국가와 수도</h1> <br />

            국가와 그에 맞는 수도를 차례로 클릭하세요(클릭 순서 무관)
            <p>
                게임을 새로 시작하려면 페이지를 새로고침 하세요.
                <form name="f">
                    결과: <input name="out" type="text" value="정답이냐 오답이냐" />
                    점수: <input name="score" type="text" value="0" />
                </form>
            </p>

            <video id="vid" controls="controls" preload="auto">
                <source src="shortfireworks.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
                <source src="shortfireworks.theora.ogv" type='video/ogg; codecs="theora, vorbis"'>
                <source src="shortfireworks.webmvp8.webm" type="video/webm; codec=" vp8, vorbis"'">
                이 브라우저는 video 태그를 인식하지 못 합니다.
            </video>
        </body>

        </html>
        `
        response.writeHead(200);
        response.end(stage2);    
    }

    else if(pathname == '/score') {
        fs.readFile('score.txt', 'utf8', function (err, data) {
            console.log(data);
            var template = `
            <!doctype html>
            <html>
            <head>
            <title>score</title>
            <meta charset="utf-8">
            </head>
            <body>
                <h1>명예의 전당</h1>
                ${data}
            </body>
            `;
        response.writeHead(200);    
        response.end(template);
        })
    }

});
app.listen(3001);
