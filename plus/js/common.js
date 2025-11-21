$(document).ready(function(){

    let mobile_size = 1024 //모바일 메뉴 시작 사이즈
    let window_w //브라우저 넓이
    let device_status //현재 pc인지 mobile인지 구분하는 값

    function device_chk(){
        window_w = $(window).width()
        if(window_w > mobile_size){
            device_status = 'pc'
        }else{
            device_status = 'mobile'
        }
    }

    device_chk() //문서가 로딩되었을때 한번실행
    $(window).resize(function(){
        device_chk() //브라우저가 리사이즈 될때마다 한번씩 실행
    })

    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter focusin', function(){
        if(device_status == 'pc'){
            $('header').addClass('menu_pc')
            
        }
    })
    // $('header .gnb .gnb_bg').on('mouseenter', function(){
    //     $('header').removeClass('menu_pc')
        
    // })
    $('site_wrap').on('focusin', function(){
        $('header').removeClass('menu_pc')
    })

    //header .site_close  /header에 .site_open 클래스 추가
    //header .gnb .gnb_wrap .gnb_open
    $('header .gnb .gnb_wrap .gnb_open').on('click', function(){
        $('header').addClass('site_open').removeClass('menu_pc')
    })
    $('header .site_close').on('click', function(){
        $('header').removeClass('site_open')
    })

    //header .gnb .gnb_wrap ul.depth1 > li 에 오버하면 header에 menu_pc 클래스 추가
    $('header').on('mouseenter', function(){
        if(!$(this).hasClass('site_open')){
            $(this).addClass('menu_pc')
        }else{
            $(this).removeClass('menu_pc')
        }
    })
    $('header').on('mouseleave', function(){
        $('header').removeClass('menu_pc')
    })


    
    //스크롤을 내리면 header에 fixed
    let scrolling = $(window).scrollTop() //현재 스크롤된 값
    let prev_scroll //이전에 스크롤된 값
    let diff_scroll //차이값

    function scroll_chk(){
        prev_scroll = scrolling
        scrolling = $(window).scrollTop()
        diff_scroll = prev_scroll - scrolling
        // console.log(diff_scroll)
        if((diff_scroll < 0) && scrolling > 0){ //위로 스크롤됨
            $('header').addClass('up')
            // console.log('if ?')
        }else{ //아래로 스크롤됨
            $('header').removeClass('up')
            // console.log('else ?')
        }
        if(scrolling > 0){ //스크롤 내림
            $('header').addClass('fixed')
        }else{ //0이거나 0보다 작은경우 (fixed제거)
            $('header').removeClass('fixed')
        }
    }
    scroll_chk() //문서가 로딩되고 단한번 실행
    $(window).scroll(function(){
        scroll_chk() //스크롤 할때마다 실행
    })

})//맨끝