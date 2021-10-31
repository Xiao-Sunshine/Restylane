var topTitle = null;
$(function () {
    topTitle = $('.top-title')[0].getBoundingClientRect().top;
    // 上
    // 首页->生成海报
    $('.item1').click(function () {
        $('.index').fadeOut();
        $('.poster').fadeIn();
        $('.popUp').fadeIn();
        $('.rule').fadeIn();
    })
    // 规则说明
    $('.rule-x').click(function () {
        $('.popUp').fadeOut();
        $('.rule').fadeOut();
    })
    $('.poster .rule-interlayer-title').click(function () {
        $('.rule').fadeIn();
        $('.popUp').fadeIn();
    })
    //生成海报 回退
    $('.poster .rule-transmit').click(function () {
        $('.poster').fadeOut();
        $('.index').fadeIn();
    })
    // 上传图片 点击12345切换样式
    $('.uploading ul li').click(function () {
        $(this).siblings().children('.uploading-checked').addClass('dn').siblings().removeClass('dn');
        $(this).children('.uploading-checked').toggleClass('dn').siblings().toggleClass('dn');
        $('.uploading-b').fadeIn();
        var num = $(this).index();
        $('.uploading-border').eq(num).removeClass('dn').siblings().addClass('dn');

    })
    // 生成海报 点击上传图片
    $('.poster .rule-btn').click(function () {
        $('.poster').fadeOut();
        $('.uploading').fadeIn();
    })
    var uploadingH=$('.uploading-box').height();
    var uploadingW=$('.uploading-box').width();
    $('.photograph-input input').change(function () {
        var files = $('.photograph-input input')[0].files;
        if (files.length <= 0) {
            return alert('请选择文件!');
        }

        var fd = new FormData();
        fd.append('avatar', files[0]);

        //用$.ajax发起请求
        $.ajax({
            type: 'post',
            url: 'http://www.liulongbin.top:3006/api/upload/avatar',
            data: fd,
            beforeSend: function () {
                console.log('发起请求之前');
            },
            //不修改 Content-Type 属性，使用 FormData 默认的 Content-Type 值
            contentType: false,
            // 不对 FormData 中的数据进行 url 编码，而是将 FormData 数据原样发送到服务器
            processData: false,
            success: function (res) {
                if (res.status == 200) {
                    $('.uploading-b').fadeIn();
                    // $('.photograph-input').fadeIn();
                    $('.uploading-picture').fadeIn();
                    $('.uploading-picture img').attr('src', 'http://www.liulongbin.top:3006' + res.url);
                    // 确认上传
                    $(".uploading .rule-btn").click(function () {
                        $('.uploading-camera').hide();
                        $('.uploading').fadeOut();
                        $(".shareIage").fadeIn();
                   
                        //合成图片的js代码
                        html2canvas(document.querySelector(".compoundImg"), {
                            useCORS: true,
                            //使用看到的宽高作为图片的宽高
                            width: uploadingW,
                            height: uploadingH,
                        }).then(canvas => {
                            //合成图片放到img中
                            let src = canvas.toDataURL();
                            // console.log(src);
                            $('.result-img').prop('src', src)
                        });
                    })
                } else {
                    console.log("添加文件失败!");
                }
            }
        })

    })
    // 上传图片 拖拽
    $('.uploading-picture').on('touchstart', function (e) {
        var startY = e.targetTouches[0].pageY;
        var startX = e.targetTouches[0].pageX;
        var sonX = $(this).children().offset().left;
        var sonY = $(this).children().offset().top;
        $('.uploading-picture img').on('touchmove', function (e) {
            var moveX = e.targetTouches[0].pageX - startX;
            var moveY = e.targetTouches[0].pageY - startY;
            $(this).offset({
                left: sonX + moveX,
                top: sonY + moveY
            })
        })
    })

    // 排行样式
    $('.share-ranking').click(function () {
        $('.shareIage').fadeOut();
        $('.ranking').fadeIn();
        $('.popUp').fadeIn();
        $('.rankingList').fadeIn();
    })
    var flag = true;
    $('.rankingList li').click(function () {
        var price = null;
        if (flag) {
            let rankingListVal = $(this).children('.rankingList-num').text();
            rankingListVal = Number(rankingListVal) + 1;
            $(this).children().eq(3).html(rankingListVal);
            $(this).children().eq(4).children().eq(0).removeClass('dn');
            flag = false;
        } else {
            let rankingListVal = $(this).children('.rankingList-num').text();
            rankingListVal = Number(rankingListVal) - 1;
            $(this).children().eq(3).html(rankingListVal);
            $(this).children().eq(4).children().eq(0).addClass('dn');
            flag = true;
        }
    })


    var topTitleTop = $('.top-title')[0].offsetTop;
    var conterXin = $('.conter-xin')[0].offsetTop + $('.item1')[0].offsetHeight;
    mover('.item2', 'item2-animat', topTitleTop);
    mover('.item3', 'item3-animat', conterXin);
    function mover(item, itemAnimat, topTitleTop) {
        if ($(document).scrollTop() >= topTitleTop) {
            $(item).addClass(itemAnimat);

        }
    }
    $(window).scroll(function () {
        mover('.item2', 'item2-animat', topTitleTop);
        mover('.item3', 'item3-animat', conterXin);
    })
    //排行榜 回退
    $('.rankingList .rule-transmit').click(function () {
        $('.rankingList').fadeOut();
        $('.shareIage').fadeIn();
    })
    $('.rankingList').click(function () {

    })
    // 排行榜弹窗
    $('.item2-X').click(function () {
        $(this).fadeOut();
        $('.popUp').fadeOut();
    })
    // 中
    var layer = layui.layer;
    // 解压撕标签墙
    $('.item2').click(function () {
        $('.index').fadeOut();
        $('.popUp').fadeIn();
        $('.tear').fadeIn();
        $('.item-conter').fadeIn();
    })
    $('.label1>li').on('touchstart', function (e) {
        var that = $(this).children('.active');
        var startX = e.targetTouches[0].pageX;
        $(document).on('touchmove', function (e) {
            //获取滑动屏幕时的X,Y
            var endX = e.originalEvent.changedTouches[0].pageX;
            //获取滑动距离
            var distanceX = endX - startX;
            if (distanceX < 0 && that.index() > 0) {
                that.addClass('labelLiOut');
                that.prev().addClass('active');
            } else if (that.index() == 0) {
                return;
            }
        })
    })
    // 解压撕标签墙弹窗
    function item2X(item2_X) {
        item2_X.click(function () {
            $('.popUp').fadeOut();
            $('.tear').fadeOut();
            $('.tear').addClass('tearOut');
        })
    }
    item2X($('.tear .item2-X'));
    item2X($('.tear .item2-interlayer-btn'));
    //解压撕标签墙 回退
    $('.item-conter .rule-transmit').click(function () {
        $('.item-conter').fadeOut();
        $('.index').fadeIn();
    })
    // 画像 回退
    var num = Math.floor(Math.random() * 6);
    console.log(num);
    $('.portrayal .rule-transmit').click(function () {
        console.log(123);
        $('.portrayal').fadeOut();
        $('.item-conter').fadeIn();
        num = Math.floor(Math.random() * 6);
        console.log(num);
        number(num);
    })
    // 解压撕标签墙 确定按钮 
    // 随机数
    number(num);

    function number(num) {
        $('.item-conter .item2-btn').click(function () {
            $('.item-conter').fadeOut();
            $('.portrayal').fadeIn();
            switch (num) {
                case 0:
                    $('.portrayal li').eq(0).removeClass('dn').siblings().addClass('dn');
                    break;
                case 1:
                    $('.portrayal li').eq(1).removeClass('dn').siblings().addClass('dn');
                    break;
                case 2:
                    $('.portrayal li').eq(2).removeClass('dn').siblings().addClass('dn');
                    break;
                case 3:
                    $('.portrayal li').eq(3).removeClass('dn').siblings().addClass('dn');
                    break;
                case 4:
                    $('.portrayal li').eq(4).removeClass('dn').siblings().addClass('dn');
                    break;
                case 5:
                    $('.portrayal li').eq(5).removeClass('dn').siblings().addClass('dn');
                    break;
            }
        })
    }
    // 点击 关注「瑞蓝爱美丽」公众号,获取更多爱美资讯 二维码出现
    $('.text2').click(function () {
        $('.popUp').fadeIn();
        $('.code').fadeIn().siblings().addClass('dn');
    })
    //关闭二维码
    $('.code .item2-X').click(function () {
        $('.popUp').fadeOut();
        $('.code').fadeOut();
        $('.code').addClass('tearOut');
    })
    // 找到附近的机构
    $('.text3').click(function () {

    })
})

