function run() {
    var tempNode = document.createDocumentFragment("div");
    tempNode.className = "slide";
    var tempUl = document.createElement("ul");
    tempUl.className = "tab-wrapper";
    tempUl.style.border = "1px solid #333";
    tempUl.style.display = "inline-block";
    var tempUl2 = tempUl.cloneNode(true);
    tempUl2.style.display = "block";
    tempUl2.className = "content-wrapper";
    function init() {
        list = [
            ['tabA', 'this is tabA'],
            ['tabB', 'this is tabB'],
            ['tabC', 'this is tabC'],
            ['tabD', 'this is tabD'],
            ['tabE', 'this is tabE'],
            ['tabF', 'this is tabF']
        ];
        for (var i in list) {
            buildDom(i, tempUl, tempUl2);
        }
        /*初始化*/
        tempUl.firstChild.style.border = "1px solid #ff0000";
        tempUl2.firstChild.style.display = "block";
        var arr1 = [].slice.call(tempUl.childNodes);
        var arr2 = [].slice.call(tempUl2.childNodes);
        tempUl.addEventListener("click", function (event) {
            var target = event.target;
            if (target.nodeName === "LI") {
                arr1.forEach(function (ele) {
                    ele.style.border = "none";
                })
                arr2.forEach(function (ele) {
                    ele.style.display = "none";
                })
                var index = arr1.indexOf(target);
                target.style.border = "1px solid #ff0000";
                arr2[index].style.display = "block";
            }
        }, false)
        tempNode.appendChild(tempUl);
        tempNode.appendChild(tempUl2);
        document.getElementsByClassName("content")[0].appendChild(tempNode);
    }
    function buildDom(i) {
        buildTab(list[i][0]);
        buildContent(list[i][1]);
        function buildTab(str) {
            var templi = document.createElement("li");
            templi.innerHTML = str;
            templi.style.display = "inline-block";
            templi.style.padding = "10px";
            tempUl.appendChild(templi);
        }
        function buildContent(str) {
            var templi = document.createElement("li");
            templi.style.display = "none";
            templi.innerHTML = str;
            tempUl2.appendChild(templi);
        }
    }
    init();
}  

function badRun() {
    var lists =  [
        ['tabA', 'this is tabA'],
        ['tabB', 'this is tabB'],
        ['tabC', 'this is tabC'],
        ['tabD', 'this is tabD'],
        ['tabE', 'this is tabE'],
        ['tabF', 'this is tabF']
    ]
    var tapEle = $("<ul>");
    tapEle.addClass("tab-wrapper");
    tapEle.css({
        "border": "1px solid #333"
    })
    var conEle = $("<ul>");
    conEle.addClass("content-wrapper");
    conEle.css({
        "border": "1px solid #333"
    })
    for(var i = 0; i < lists.length; i++) {
        var ali = $("<li>");
        ali.css({
            "display": "inline-block",
            "padding": "10px"
        }).text(lists[i][0]);
        tapEle.append(ali);

        var bli = $("<li>");
        bli.css({
            "display": "none",
            "padding": "10px"
        }).text(lists[i][1]);
        conEle.append(bli);

        if(i === 0) {
            ali.css({
                "border": "1px solid #ff0000",
                "display": "inline-block"
            })
            bli.css({
                display: "block"
            })
        }

        ali.click(function(event) {
            var alis = $(this).parent().children();
            var index = $(this).index();
            var blis = bli.parent().find("li");
            alis.css({
                "border": "none"
            })
            blis.css({
                "display": "none"
            })
            alis.eq(index).css({
                "border": "1px solid #ff0000"
            })
            blis.eq(index).css({
                "display": "block"
            })
        })
    }
    $("body").append(tapEle).append(conEle);
}