$(function () {
    $.ajax({
        type:"get",
        url:"json/index.json",
        success:function (data) {
            $.each(data.nav.nav1.login,function (i,t) {
                var box;
                if(i===0){
                     box = $('<li></li>').append($('<a class="account" href="#">'+t+'</a>'))
                }else if(i===5){
                    box = $("<li style='margin:20px 0 10px'></li>").append($('<a  class="denglv" href="#"></a>').text(t))
                }
                else{
                    box = $('<li></li>').append($('<a class="underline" href="#"></a>').text(t))
                }
                $(box).appendTo('.userLink ul')
            });
            $.each(data.nav.nav2.list,function (i,t) {
                var li = $('<li class="nav2_list_li"></li>'),box;
                if(i<2){
                    $(li).css('cursor','pointer');
                     box = $('<a class="bluea" href="#"></a>').html(t);
                    var ul = $('<ul class="subMenu "></ul>');
                    $.each(data.nav.nav2['childlist'+i],function (i,t) {
                        $(ul).append($('<li></li>').html(t))
                    });
                    $(li).append(ul)
                }else{
                     box = $('<a class="bluea" href="#"></a>').html(t)
                }
                $(li.append(box)).appendTo($('.nav2_list'))
            });
            $('.nav2_Right>a').html(data.nav.nav2.list2[0]);
            $('.nav2_Right>span').html(data.nav.nav2.list2[1]);
            $('.lunbo').width((data.images.length+1)*1180);

            //*轮播图
            $.each(data.images,function (i,t) {
                var img = $('<a href="#"></a>').append($('<img width="1180"/>').prop('src',t));
                var indexs = $('<span class="iconfont icon-yuanxuankuang1 index"></span>');
                $('<li></li>').append(img).appendTo('.lunbo');
                $('.indexs').append(indexs)
            });
            var lastimg = $('<a href="#"></a>').append($('<img width="1180"/>').prop('src',data.images[0]));
            $('.index:first').removeClass('icon-yuanxuankuang1').addClass('icon-yuanxuankuang2');
            $(lastimg).appendTo('.lunbo');
            $('.index').click(function () {
                $('.lunbo').stop();
                index($(this));
                $('.lunbo').animate({
                    'left':$(this).index()*-1180
                });
                i=$(this).index()
            });
            //轮播图*

            //*产品广告
                //左列表
            $.each(data.sideNavInner,function (i,t) {
                var li = $('<li></li>').append($('<a href="#"></a>').html(t).addClass('whitea underline'));
                $(li).appendTo('.sideNavInner')
            });
                //右列表
            $.each(data.blockNav.blockNavImg,function (i,t) {
                var more = $('<span></span>').append($('<a class="bluea" href="#"></a>').html(data.blockNav.more[i]));
                var img = $('<a href="#"></a>').append($('<img width="265"/>').prop('src',data.blockNav.blockNavImg[i]));
                var p = $('<p class="description"></p>').html(data.blockNav.description[i]);
                var li = $('<li ></li>').append(img,p,more);
                $('.blockNavList').append(li)
            })
            //产品广告*
            //*店长推荐
            $.each(data.sliderList.images,function (i,t) {
                var img = $('<a href="#"></a>').append($('<img width="211"/>').prop('src',data.sliderList.images[i]));
                var h4 = $('<h4 class="Surface "></h4>').html(data.sliderList.title[i]);
                var p = $('<p class=""></p>').html(data.sliderList.description[i]);
                if(data.sliderList.Price[i]){
                    var Price = $('<div class="boxPrice">售价 : <span class="Price">'+data.sliderList.Price[i]+'</span>起 </div>');
                    $('.listContainerInner').append($('<li></li>').append(img,h4,p,Price));
                }else{
                    $('.listContainerInner').append($('<li></li>').append(img,h4,p));
                }
            })
            //店长推荐*
            //*各类列表
            $.each(data.productChannels,function (i,t) {
                var obj = this;
                var box = $('<div></div>').addClass('productChannel').appendTo($('.productChannels .Containerbox'))
                var title = $('<div></div>').html(this.channelTitle).addClass('channelTitle');
                var inner = $('<p></p>').html(this.inner);
                var a = $('<a href="#" class="viewmore underline"></a>').html('查看更多');
                var first = $('<li></li>').css({
                    'backgroundImage':'url('+this.innerImg+')',
                    'background-size': 'cover',
                    'background-position': 'center',
                    'padding':'14px'
                }).append(inner,a);
                var ul = $('<ul></ul>').append(first);
                $.each(this.title,function (j,c) {
                    var content,li;
                    var img = $('<img width="254">').prop('src',obj.listImg[j]);
                    var h3 = $('<h3></h3>').html(c);
                    var p = $('<p></p>').html(obj.description[j]);
                    var Price = $('<div class="boxPrice">售价 : <span class="Price">'+obj.Price[j]+'</span></div>');
                    content = $('<a href="#"></a>').append(img,h3,p,Price);
                    if(obj.tag){
                        if(obj.tag[j]){
                            var tag = $('<span></span>').html(obj.tag[j]).addClass('tag');
                            li = $('<li></li>').append(tag,content);
                        }else{
                            li = $('<li></li>').append(content);
                        }
                    }else{
                        li = $('<li></li>').append(content);
                    }
                    $(ul).append(li)
                });
                $(box).append(title,ul)
            })
            //各类列表*
            //*热门应用列表
                //大标题
            $('<div></div>').html(data.appsChannel.channelTitle).appendTo('.appsChannel .Containerbox').addClass('channelTitle')
                //游戏列表
            var appList
            var appsChannel = $('<ul></ul>')
            $.each(data.appsChannel.appList,function (i,t) {
                var img = $('<img width="124"/>').prop('src',t.img);
                var name = $('<a href="#"></a>').html(t.name);
                console.log(t);
                appList = $('<li></li>').append(img,name);
                appList.appendTo();
            })
            //热门应用列表*
        }
    });
    $('.login').hover(function () {
        $(this).css({border:'1px solid #e0e0e0','border-bottom':'1px solid white','background':'white'});
        $('.userLink').show()
    },function () {
        $(this).css({border:0,'background':'#f5f5f5'});
        $('.userLink').hide()
    });
    $(document).on('click','.nav2_list_li',function () {
        $(this).siblings().find('ul').slideUp();
        $(this).find('ul').slideToggle();
    });
    $(document).on('mouseenter','.subMenu>li',function () {
        $(this).addClass('skyblue')
    }).on('mouseleave','.subMenu>li',function () {
        $(this).removeClass('skyblue')
    });
    //*轮播图
    $('.jiant').click(function () {
        $(this).addClass('borderB')
    });
    function index(t){
        $(t).siblings().removeClass('icon-yuanxuankuang2').addClass('icon-yuanxuankuang1');
        $(t).removeClass('icon-yuanxuankuang1').addClass('icon-yuanxuankuang2')
    }
    var i=0,t;
    $('.icon-Right-').click(function () {
        $('.lunbo').stop();
        i+=1;
        if(i===$('.lunbo').find('img').length){
            i=1;
            $('.lunbo').css('left',0)
        }
        $('.lunbo').animate({
            'left':i*-1180
        });
        t=i;
        if(t===5){
            t=0
        }
        var dian = $('.index').eq(t);
        index(dian)
    });
    $('.icon-Left-').click(function () {
        $('.lunbo').stop();
        i--;
        if(i===-1){
            $('.lunbo').css('left',($('.lunbo').find('img').length-1)*-1180);
            i=$('.lunbo').find('img').length-2
        }
        $('.lunbo').animate({
            'left':i*-1180
        });
        t=i;
        if(t===5){
            t=0
        }
        var dian = $('.index').eq(t);
        index(dian)
    });
    function time(){
        Time = setInterval(function () {
            $('.icon-Right-').click()
        },2000)
    }
    time()
    $('.mainContainer').hover(function () {
        clearInterval(Time)
    },function () {
        time()
    })
    //轮播图*


});