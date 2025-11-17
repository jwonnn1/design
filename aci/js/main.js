$(document).ready(function(){

    /******** header 시작 *********/
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

    device_chk() // 문서 로딩 후 1회 실행
    $(window).resize(function(){ device_chk() }) // 창 크기 바뀔 때마다 갱신

    let gnb_li = $('header .gnb .gnb_wrap ul.depth1 > li')

    function depth_menu_chk(){
        gnb_li.find('ul.depth2').hide()
    }

    depth_menu_chk() // 새로고침 시 depth2 숨김

    if(device_status == 'pc'){ //  pc일 때만 아래 코드 실행
        gnb_li.on('mouseenter focusin', function(){
            $('header').addClass('fixed')
            $(this).addClass('over')
            $(this).find('ul.depth2').stop().slideDown(300)
        })
        gnb_li.on('mouseleave focusout', function(){
            $(this).removeClass('over')
            $(this).find('ul.depth2').stop().slideUp(300)
            $('header').removeClass('fixed')
        })
    }

    //스크롤을 내리면 header에 fixed
    let scrolling = $(window).scrollTop() //현재 스크롤된 값
    let prev_scroll //이전에 스크롤된 값
    let diff_scroll //차이값

    function scroll_chk(){
        prev_scroll = scrolling
        scrolling = $(window).scrollTop()
        diff_scroll = prev_scroll - scrolling
        // console.log(diff_scroll)
        if(diff_scroll < 0){ //위로 스크롤됨
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


    /* 모바일 메뉴 열기 */
    $('.gnb_open').on('click', function(){
        if(device_status == 'mobile'){
            $('header').addClass('menu_mo')
        }
    })

    /* 모바일 메뉴 닫기 */
    $('.gnb_close, .gnb_bg').on('click', function(){
        if(device_status == 'mobile'){
            $('header').removeClass('menu_mo')
        }
    })

    /* 2차메뉴 열고 닫기 */ 
    // $('header .gnb .gnb_wrap ul.depth1 > li > a').on('click', function(e){
    //     e.preventDefault();
    
    //     let li = $(this).parent('li');
    //     let depth2 = li.children('ul.depth2');
    
    //     if(li.hasClass('on')){
    //         li.removeClass('on');
    //         depth2.slideUp(200);
    //     }else{
    //         li.addClass('on');
    //         depth2.slideDown(200);
    //         li.siblings('li').removeClass('on')
    //            .children('ul.depth2').slideUp(200);
    //     }
    // });

    /* MOBILE에서 depth1 click → depth2 toggle */
    $('header .gnb .gnb_wrap ul.depth1 > li > a').on('click', function(e){
        if(device_status !== 'mobile') return; // pc에서는 클릭 막음

        e.preventDefault();

        let li = $(this).parent('li');
        let depth2 = li.children('ul.depth2');

        if(li.hasClass('on')){
            li.removeClass('on');
            depth2.slideUp(200);
        }else{
            li.addClass('on');
            depth2.slideDown(200);
            li.siblings('li')
            .removeClass('on')
            .children('ul.depth2').slideUp(200);
        }
    });

    /******** header 끝 *********/
    

        
    /******** visual 시작 *********/
    const visual_swiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */

        autoplay: {  /* 팝업 자동 실행 */
            delay: 3000,
            disableOnInteraction: true,
        },

        effect: "fade", /* fade 효과 */

        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */

        pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
            el: '.swiper-pagination', /* 해당 요소의 class명 */
            clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
            type: 'fraction',  /* type fraction을 주면 paging이 숫자로 표시됨 */
            renderBullet: function (index, className) {   /* paging에 특정 코드 넣기 */
                return '<span class="' + className + '">' + (index + 1) + "</span>";
            },
        },
    });
    /******** visual 끝 *********/


    /******** performance 시작 *********/
    const performance_swiper = new Swiper('.performance .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 'auto', /* css에서 slide의 넓이ㅓ 지정 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            768: {    /* 768px 이상일때 적용 */
                spaceBetween: 24,
            },
        },
        //centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
               
        navigation: {
            nextEl: '.performance .ctrl_btn .btn_next',
            prevEl: '.performance .ctrl_btn .btn_prev',
        },
        
    });
    /******** performance 끝 *********/

    /******************** start : 일반예술 tap ************************
     * .find .tab_list ul li 를 클릭했을떄 첫번째를 클릭하면 active 클래스를 주고
     * li에서 어떤 tab_item을 보이게 해야하는지 단서를 줘야함
     * .find .tab_content .tab_item 에서 첫번째 요소에 active 클래스 줌
     * 
     * 
    */

    $(function() {
        let tab_name;
    
        $('.academy .tab_list ul li').on('click', function() {
            // 이미 선택된 탭이면 아무 동작 안 함
            if ($(this).hasClass('active')) return;
    
            // 1. 클릭한 li에만 active 클래스 주기
            $('.academy .tab_list ul li').removeClass('active');
            $(this).addClass('active');
    
            // 2. 클릭한 li의 button span에 '선택됨' 표시
            $('.academy .tab_list ul li button span').text('');
            $(this).find('button span').text('선택됨');
    
            // 3. 클릭한 li와 관련된 tab_item에 active 클래스 주기 (바로 전환)
            tab_name = $(this).attr('data-tab');
    
            // 모든 tab_item active 제거
            $('.academy .tab_content .tab_item').removeClass('active').hide();
    
            // 선택한 tab_item active 및 표시
            $('.academy .tab_content').find('.' + tab_name)
                .addClass('active')
                .attr('title', '선택됨')
                .show();
    
            // 나머지 tab_item title 초기화
            $('.academy .tab_content .tab_item').not('.' + tab_name).attr('title', '');
        });
    
        // 초기 상태: 활성화된 탭만 보이도록
        $('.academy .tab_content .tab_item').not('.active').hide();
    });
    /******************** end : 일반예술 tap *************************/

   /* top버튼을 클릭하면 상단으로 이동 */ 
   $('footer .top').on('click', function(){
    $('html, body').animate({
        scrollTop: 0
    }, 500) //브라우저를 최상단으로 0.5초만에 올림
    })


}) //맨끝