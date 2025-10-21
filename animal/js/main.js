$(document).ready(function(){

    /********************* 시작 :: 지금 pc버전인지 모바일인지 체크 (기준-메뉴상태) *********************/

    let mobile_size = 1024
    let window_w 
    let device_status // pc, mobile 구분

    function device_chk(){ //함수를 정의(선언)
        window_w = $(window).width()
        if(window_w > mobile_size){ //브라우저 넓이가 1024보다 클때
            device_status = 'pc'
        }else{
            device_status = 'mobile'
        }
        console.log(device_status)
    }

    device_chk() //html의 로딩이 완료된 이후 단 한번실행
    $(window).resize(function(){ //브라우저가 리사이즈 될 때마다 실행
        device_chk()
    })


    /********************* 끝 :: 지금 pc버전인지 모바일인지 체크 (기준-메뉴상태) *********************/

    
    /********************* 시작 :: visual swiper *********************/
    let visual_time = 5000
    const visual_swiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */

        autoplay: {  /* 팝업 자동 실행 */
            delay: visual_time,
            disableOnInteraction: true,
        },

        effect: "fade", /* fade 효과 */

        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
    });
    
    $('.visual .ctrl_btn .stop').on('click', function(){
        visual_swiper.autoplay.stop();  /* 일시정지 기능 */
        $(this).hide()
        $('.visual .ctrl_btn .play').css('display', 'flex')
        $('.visual .ctrl_btn .paging .bar span').stop() //animate 종료
    })
    $('.visual .ctrl_btn .play').on('click', function(){
        visual_swiper.autoplay.start();  /* 재생 기능 */
        $(this).hide()
        $('.visual .ctrl_btn .stop').css('display', 'flex')
        updateCurrent()
    })


    // 전체 슬라이드 개수 (loop 상태에서도 실제 슬라이드 개수만)
    const totalSlides = $('.visual .swiper .swiper-slide').not('.swiper-slide-duplicate').length;
    $('.visual .paging .total').text(totalSlides); // 총 개수 표시

    // 현재 슬라이드 번호 표시 함수
    function updateCurrent() {
        let realIndex = visual_swiper.realIndex + 1; // 실제 인덱스 (0부터 시작하므로 +1)
        $('.visual .paging .current').text(realIndex);
        //슬라이드가 교체되면 제일먼저 넓이를 0으로 초기화
        $('.visual .ctrl_btn .paging .bar span').stop() //animate 종료
        $('.visual .ctrl_btn .paging .bar span').width(0)
        $('.visual .ctrl_btn .paging .bar span').animate({
            width : '100%'
        }, visual_time)
    }

    // 처음 로드 시 한번 실행
    updateCurrent();

    // 슬라이드 변경될 때마다 실행
    visual_swiper.on('slideChange', function () {
        updateCurrent();
    });
    /********************* 끝 :: visual swiper *********************/


    /******************** 시작 : pc 메뉴오버 ************************
     * 메뉴(header .gnb)에 마우스를 오버했을때 
     * header에 menu_pc 클래스 추가
     * 마우스를 오버한 메뉴의 1차메뉴 li에 over 클래스 추가 (header .gnb .gnb_wrap ul.depth1 > li)
       > 오버한 li에만 over 클래스줌
       >>>모든 li에서 over를 빼고 오버한 li에만 over클래스 줌
     * pc버전에서만 !
     * 메뉴를 오버해서 바뀐 색상의 영역 내부에서는 오버유지, 그 밖에 나가면 아웃
    */

    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter focusin', function(){
        if(device_status =='pc'){ //이거 아니면 안해 ! (pc일때만 동작)
            $('header').addClass('menu_pc')
            $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
            $('header .gnb .gnb_wrap ul.depth1 > li > ul.depth2').hide() /* 2차메뉴 닫기 */ 
            $(this).addClass('over')
            $(this).find('.depth2').slideDown() /* 2차메뉴 열기 */ 
        } 
    })
    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseleave', function(){
        if(device_status =='pc'){ //(pc일때만 동작)
            $(this).removeClass('over')
            $(this).find('.depth2').hide()
        }    
    })
    $('header').on('mouseleave', function(){
        $(this).removeClass('menu_pc')
    })

    $('header .util .search .sch_open').on('focusin', function(){
        $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
    })

    /******************** 끝 : pc 메뉴오버 *************************/

    /******************** 시작 : mobile 1차 메뉴 클릭 ************************
     * 닫혀있는 메뉴 클릭 : 기존에 열려있던 다른 메뉴를 닫고 나만 열기 (li open클래스 추가)
     * 열려있는 메뉴 클릭 : 나자신 닫고 끝
     * 열린메뉴, 닫힌메뉴 구분하는 방법 - open있으면 열린메뉴, 없으면 닫힌메뉴
     * 1차 메뉴 a의 링크 삭제 (링크 이동을 못하게 막음)
    */
    
    $('header .gnb .gnb_wrap ul.depth1 > li > a').on('click', function(e){
        if(device_status == 'mobile'){
            e.preventDefault();
            if($(this).parent().hasClass('open') == true){ //열려있는 메뉴를 다시 클릭했을때
                $(this).parent().removeClass('open') //li에 open클래스 삭제
                $(this).next().slideUp() //2차메뉴를 슬라이드로 닫기
            }else{ //열려있지 않은 다른 메뉴를 여는거
                $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('open') //모든 li의 open 삭제
                $('header .gnb .gnb_wrap ul.depth1 > li > ul.depth2').slideUp() //모든 2차메뉴 닫기
                $(this).parent().addClass('open')
                $(this).next().slideDown() //2차메뉴를 슬라이드로 열기
            }
        }
    })

    /******************** 끝 : mobile 1차 메뉴 클릭 *************************/

    /******************** 시작 : mobile 메뉴 열기 ************************
     * 열기 클릭 : header에 menu_mo 클래스 추가 
        >> header .gnb .gnb_open
     * 닫기 클릭 : header에 menu_mo 클래스 삭제
        >> header .gnb .gnb_wrap .gnb_close
    */

    $('header .gnb .gnb_open').on('click', function(){
        $('header').addClass('menu_mo')
    })
    $('header .gnb .gnb_wrap .gnb_close').on('click', function(){
        $('header').removeClass('menu_mo')
    })
    /******************** 끝 : mobile 메뉴 닫기 *************************/

    /******************** start : 스크롤시 header에 fixed ************************
     * pc/mobile 둘다
     * 스크롤이 조금만 되도 header에 fixed 클래스 추가
     * 다시 맨 꼭대기로 올라가면 header에 fixed 클래스 삭제
    */

    let scrolling //스크롤된 값

    function scroll_chk(){
        scrolling = $(window).scrollTop() //현재 스크롤값
        if(scrolling > 0){ //조금이라도 스크롤이 됬다면
            $('header').addClass('fixed')
        }else{
            $('header').removeClass('fixed')
        }
    }

    scroll_chk() //문서가 로딩 되고 단 한번실행
    $(window).scroll(function(){
        scroll_chk() //스크롤 될때마다 한번씩 실행
    })

    /******************** end : 스크롤시 header에 fixed *************************/

    /******************** strat : 찾습니다 swiper *************************/

    const find1_swiper = new Swiper('.find .item1 .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 1, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            450: {    /* 640px 이상일때 적용 */
                slidesPerView: 2,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 16,
            },
            769: {    /* 640px 이상일때 적용 */
                slidesPerView: 2,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 20,
            },
            1025: {    /* 640px 이상일때 적용 */
                slidesPerView: 3,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 24,
            },
        },
        //centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        
        navigation: {
            nextEl: '.find .item1 .next',
            prevEl: '.find .item1 .prev',
        },
    });
    const find2_swiper = new Swiper('.find .item2 .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 1, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            450: {    /* 640px 이상일때 적용 */
                slidesPerView: 2,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 16,
            },
            769: {    /* 640px 이상일때 적용 */
                slidesPerView: 2,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 16,
            },
            1025: {    /* 640px 이상일때 적용 */
                slidesPerView: 3,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 24,
            },
        },
        //centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        
        navigation: {
            nextEl: '.find .item2 .next',
            prevEl: '.find .item2 .next',
        },
    });
    /******************** end : 찾습니다 swiper *************************/

    /******************** start : 찾습니다 tap ************************
     * .find .tab_list ul li 를 클릭했을떄 첫번째를 클릭하면 active 클래스를 주고
     * li에서 어떤 tab_item을 보이게 해야하는지 단서를 줘야함
     * .find .tab_content .tab_item 에서 첫번째 요소에 active 클래스 줌
    */

    let tab_name
    $('.find .tab_list ul li').on('click', function(){
        //클릭한 li에만 active 클래스주기
        $('.find .tab_list ul li').removeClass('active')
        $(this).addClass('active')

        //클릭한 li의 button에다가 선택됨이라고 글자쓰기
        $('.find .tab_list ul li button span').text('')
        $(this).find('button span').text('선택됨')

        //클릭한 li와 관련된 tab_content tab_item 에 active 클래스 주기
        tab_name = $(this).attr('data-tab')
        // console.log(tab_name)
        $('.find .tab_content .tab_item').removeClass('active')
        //find로 찾을때 클래스명이면 .이 추가되어야함, 내가 갖고온 이름은 .이 없음
        $('.find .tab_content').find('.' + tab_name).addClass('active')

        //선택된 tab_item의 title에  '선택됨'이라고 써주기
        $('.find .tab_content .tab_item').attr('title', '')
        $('.find .tab_content').find('.' + tab_name).attr('title', '선택됨')
    })
    /******************** end : 찾습니다 tap *************************/

    /******************** start : 입양 swiper *************************/
    const adopt_swiper = new Swiper('.adopt .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 'auto', /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        
        breakpoints: {
            769: {    /* 640px 이상일때 적용 */
                slidesPerView: 'auto',    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 24,
            },
        },
        centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        
        navigation: {
            nextEl: '.adopt .ctrl_btn .next',
            prevEl: '.adopt .ctrl_btn .prev',
        },
    });
    /******************** end : 입양 swiper *************************/
    
    /******************** strat : review swiper *************************/
    const review_swiper = new Swiper('.review .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 1, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            450: {    /* 640px 이상일때 적용 */
                slidesPerView: 2,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 16,
            },
            769: {    /* 640px 이상일때 적용 */
                slidesPerView: 3,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 24,
            },
            1025: {    /* 640px 이상일때 적용 */
                slidesPerView: 4,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 24,
            },
        },
        //centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        
        navigation: {
            nextEl: '.review .next',
            prevEl: '.review .prev',
        },
    });
    /******************** end : review swiper *************************/
})//맨끝