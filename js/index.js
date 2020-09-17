window.addEventListener('load', function () {
    var bt1 = document.querySelector('#btleft');
    var bt2 = document.querySelector('#btright');
    var box1 = document.querySelector('.box1');
    var box1Width = box1.offsetWidth;
    var num = 0;
    //控制小圆圈
    var circle = 0;
    //鼠标经过显示隐藏按钮
    box1.addEventListener('mouseenter', function () {
        bt1.style.display = 'block';
        bt2.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    box1.addEventListener('mouseleave', function () {
        bt1.style.display = 'none';
        bt2.style.display = 'none';
        timer = setInterval(function () {
            bt2.click();
        }, 2000);
    })
    //动态生成小圆圈
    var ul = box1.querySelector('ul');
    var ol = box1.querySelector('ol');
    //console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        //创建圆圈
        li = document.createElement('li');
        //插入
        ol.appendChild(li);
        //设置属性
        li.setAttribute('data-index', i);
        //排他思想，绑定点击事件
        li.addEventListener('click', function () {
            for (var j = 0; j < ol.children.length; j++) {
                //清空所有留下自己
                ol.children[j].className = '';
            }
            this.className = 'current';
            //点击小圆圈移动ul

            var index = this.getAttribute('data-index');
            circle = index;
            num = index;
            animate(ul, -box1Width * index);
        })
    }
    ol.children[0].className = 'current';
    //克隆第一张图片放到最后
    var firstli = ul.children[0].cloneNode(true);
    ul.appendChild(firstli);
    //节流阀
    var flag = true;
    //节流阀开启函数
    function openf() {
        flag = true;
    }
    //右侧按钮
    bt2.addEventListener('click', function () {
        //num++;
        //第一种方法，快速从尾到头
        //animate(ul,-((box1Width * num) % (box1Width * ol.children.length)));
        //第二张方法，无缝切换，在最后加一张第一张图片
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * box1Width,openf);
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            // for(var j = 0;j < ol.children.length;j++){
            //     //清空所有留下自己
            //     ol.children[j].className = '';
            // }

            // ol.children[circle].className = 'current';
            circleChange();
        }

    })

    //左侧按钮
    bt1.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * box1Width + 'px';
                //num = ul.children.length - 1;
            }
            num--;
            animate(ul, -num * box1Width,openf);
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }

            // for(var j = 0;j < ol.children.length;j++){
            //     //清空所有留下自己
            //     ol.children[j].className = '';
            // }

            // ol.children[circle].className = 'current';
            circleChange();
        }

    })

    //将冗余代码封装成函数
    function circleChange() {
        for (var j = 0; j < ol.children.length; j++) {
            //清空所有留下自己
            ol.children[j].className = '';
        }

        ol.children[circle].className = 'current';
    }

    //添加自动播放
    var timer = setInterval(function () {
        bt2.click();
    }, 2000);
})

