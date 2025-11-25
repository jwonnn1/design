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
            $('aside.quick')
            // console.log('else ?')
        }
        if(scrolling > 0){ //스크롤 내림
            $('header').addClass('fixed')
            $('aside.quick').fadeIn(200)
        }else{ //0이거나 0보다 작은경우 (fixed제거)
            $('header').removeClass('fixed')
            $('aside.quick').fadeOut(200)
        }
        
    }
    scroll_chk() //문서가 로딩되고 단한번 실행
    $(window).scroll(function(){
        scroll_chk() //스크롤 할때마다 실행
    })

    /*******************
	 * 퀵메뉴 열고 닫기
	 * aside.quick .quick_open 를 클릭하면 aside.quick .quick open
	 * >>>> aside.quick quick_wrap slideDown() 으로 닫기
	 * aside.quick .quick_close 를 클릭하면 aside.quick 에 open 삭제
	 * >>>> aside.quick quick_wrap slideUp() 으로 닫기
	 *******************/

	$('aside.quick .quick_open').on('click', function(){
		$('aside.quick').addClass('open')
		$('aside.quick .quick_wrap').slideDown()
	})
	$('aside.quick .quick_close').on('click', function(){
		$('aside.quick').removeClass('open')
		$('aside.quick .quick_wrap').slideUp()
	})

    /* top버튼을 클릭하면 상단으로 이동 */ 
    $('aside.quick .top_btn .top').on('click', function(){
        $('html, body').animate({
            scrollTop: 0
        }, 500) //브라우저를 최상단으로 0.5초만에 올림
    })

    

})//맨끝