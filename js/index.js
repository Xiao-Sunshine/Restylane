var topTitle = null;
$(function () {
    topTitle = $('.top-title')[0].getBoundingClientRect().top;
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

    // 点击上传图片
    $('.poster .rule-btn').click(function () {
        $('.poster').fadeOut();
        $('.photograph').fadeIn();
        $('.uploading').fadeIn();
    })
    $('.photograph-input input').change(function () {
        var files = $('.photograph-input input')[0].files;
        console.log(files);
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
                    //合成图片的js代码
                        html2canvas(document.querySelector(".compound"), {
                            useCORS:true,
                            //使用看到的宽高作为图片的宽高
                            width: window.innerWidth,
                            height: window.innerHeight,
                        }).then(canvas => {
                            //合成图片放到img中
                            let src = canvas.toDataURL();
                            // console.log(src);
                            $('.result-img').prop('src', src)
                        });
                } else {
                    console.log("添加文件失败!");
                }
            }
        })
        // 确认上传
        $(".photograph .rule-btn").click(function () {
            $('.share-ranking').fadeIn();
            $('.share-save').fadeIn();
            $('.photograph .rule-btn').fadeOut();
            $('.photograph .uploading-silk').fadeOut();
            $('.photograph ul').fadeOut();
            $('.share').fadeIn();
            $('.uploading-box').fadeIn();
        })
    })

    // 照片样式
    $('.photograph ul li').click(function () {
        $(this).siblings().children('.uploading-checked').addClass('dn').siblings().removeClass('dn');
        $(this).children('.uploading-checked').toggleClass('dn').siblings().toggleClass('dn');
        $('.uploading-b').fadeIn();
        var num = $(this).index();
        $('.uploading-border').eq(num).removeClass('dn').siblings().addClass('dn');
    })

    // 排行样式
    $('.share-ranking').click(function () {
        $('.photograph').fadeOut();
        $('.share').fadeOut();
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
    console.log(conterXin);
    console.log($(document).scrollTop());
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
        $('.uploading-picture').fadeIn();
        $('.photograph').fadeIn();
    })
    $('.rankingList').click(function(){

    })

})

