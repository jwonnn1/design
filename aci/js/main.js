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
    /******************** end : 일반예술 tap *************************/

   

}) //맨끝