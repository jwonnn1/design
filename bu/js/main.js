/************************** 
* 파일명 : main.js
* 작성자 : 윤지원
* 작성일 : 25-10-23
* 설  명 : 메인페이지에서만 적용되는 js (header/footer 제외)
**************************/
    


$(document).ready(function(){
    
    /* bookmark */
    AOS.init({
        offset: 150, // 해당 콘텐츠가 하단에서 몇 px 위로 올라와에 나타나는 효과가 나타날지 셋팅하는 값
        duration: 700, // 애니메이션 효과가 작동되는 시간
        easing: 'ease', // 가속도
    });
    /* bookmark */


    /* view 스크롤바 - 시작 */
    const snbScroll = function() {
        const $menu_wrap = $(".view .view_left .notice .viewtab_list ul");  /* 선택자를 잘 입력해야함 */
        const $menu_li = $(".view .view_left .notice .viewtab_list ul li");  
        function scrollToElement($element) {
            const containerWidth = $menu_wrap.width();
            const itemWidth = $element.outerWidth(true);
            const totalItemsWidth = $menu_wrap[0].scrollWidth;
            const newScrollPosition = ($element.index() === 0) ? 0 :
                ($element.index() === $menu_li.length - 1) ? totalItemsWidth - containerWidth :
                $element.position().left + $menu_wrap.scrollLeft() - (containerWidth - itemWidth) / 2;
            $menu_wrap.animate({
                scrollLeft: newScrollPosition
            }, 500);
        }
        const $activeItem = $menu_wrap.find(".active");
        if ($activeItem.length) {
            scrollToElement($activeItem);
        }
    } 
    snbScroll();   /* 함수의 실행 */
    /* view 스크롤바 - 끝 */

    /* view 새소식 탭 - 시작 
     * .view .view_left .notice .viewtab_list ul li 를 클릭했을떄 첫번째를 클릭하면 active 클래스를 주고
     * li에서 어떤 tab_item을 보이게 해야하는지 단서를 줘야함
     * .view .view_left .notice .viewtab_cont .tab_item 에서 첫번째 요소에 active 클래스 줌
    */
    
    let tab_name
    $('.view .view_left .notice .viewtab_list ul li').on('click', function(){
        //클릭한 li에만 active클래스
        $('.view .view_left .notice .viewtab_list ul li').removeClass('active')
        $(this).addClass('active')

        //클릭한 li button에 선택됨이라고 쓰기
        $('.view .view_left .notice .viewtab_list ul li button span').text('')
        $(this).find('button span').text('선택됨')

        //클릭한 li와 관련된 viewtab_cont tab_item에 active클래스
        tab_name = $(this).attr('data-tab')
        console.log(tab_name)
        $('.view .view_left .notice .viewtab_cont .tab_item').removeClass('active')
        $('.view .view_left .notice .viewtab_cont').find('.' + tab_name).addClass('active')

        $('.view .view_left .notice .viewtab_cont .tab_item').attr('title', '')
        $('.view .view_left .notice .viewtab_cont').find('.' + tab_name).attr('title', '선택됨')
    })

    /* view 새소식 탭 - 끝 */

    /* view news  - 시작 */

    const news_swiper = new Swiper('.news .swiper', { /* 팝업을 감싼는 요소의 class명 */

        autoplay: {  /* 팝업 자동 실행 */
            delay: 2500,
            disableOnInteraction: true,
        },

        //effect: "fade", /* fade 효과 */

        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        
    });
    /* view news  - 끝 */


    /* calendar  - 시작 */

    const calendar_swiper = new Swiper('.calendar .swiper', { /* 팝업을 감싼는 요소의 class명 */

        navigation: {  /* 이전, 다음 버튼 */
		nextEl: '.calendar .btn_next',  /* 다음 버튼의 클래스명 */
		prevEl: '.calendar .btn_prev',  
	    },
        
    });

    /* calendar  - 끝 */

    /* view 학사일정 탭 - 시작 */

    let calen_tab
    $('.view .view_right .calendar .caletab_list ul li').on('click', function(){
        //클릭한 li에만 active클래스
        $('.view .view_right .calendar .caletab_list ul li').removeClass('active')
        $(this).addClass('active')

        //클릭한 li button에 선택됨이라고 쓰기
        $('.view .view_right .calendar .caletab_list ul li button span').text('')
        $(this).find('button span').text('선택됨')

        //클릭한 li와 관련된 viewtab_cont tab_item에 active클래스
        calen_tab = $(this).attr('data-tab')
        console.log(calen_tab)
        $('.view .view_right .calendar .caletab_cont .tab_item').removeClass('active')
        $('.view .view_right .calendar .caletab_cont').find('.' + calen_tab).addClass('active')

        $('.view .view_right .calendar .caletab_cont .tab_item').attr('title', '')
        $('.view .view_right .calendar .caletab_cont').find('.' + calen_tab).attr('title', '선택됨')
    })


    /* view 학사일정 탭 - 끝 */

    /* depart slick - 시작 */

    $('.depart .cnt_wrap .depart_ctn').slick({
        autoplay: false, //팝업 자동 실행
        autoplaySpeed: 3000, //팝업이 머무는 시간
        speed: 500, //팝업 전환 속도
        dots: true, //하단 페이지 버튼 (true, false)
        arrows: true,  //다음, 이전팝업 (true, false)
        //pauseOnHover: true, //마우스호버시 일시정지
        //infinite: false, //무한반복
        variableWidth: true, //넓이를 자유롭게 설정
        //slidesToShow: 3, //한번에 보일 팝업 수
        //slidesToScroll: 1, //한번 드래그에 움직이는 슬라이드 제한
        swipeToSlide: true, //드래그한만큼 슬라이드 움직이기
        centerMode: true, //가운데정렬(가운데가 1번)
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                variableWidth: false, //넓이를 자유롭게 설정
                slidesToShow: 2,
                centerPadding: '0', //팝업 좌우에 여백 centerMode: true 일때만 적용
              }
            },
            {
              breakpoint: 768,
              settings: {
                variableWidth: false, //넓이를 자유롭게 해제
                slidesToShow: 1,
                centerPadding: '60px', //팝업 좌우에 여백 centerMode: true 일때만 적용
              }
            }
        ]
    });

    /* depart slick - 끝 */


    /* infogra counter - 시작 */

    // 클래스가 "counter"인 모든 요소를 선택합니다.
    const $counters = $(".counter");
    
    // 노출 비율(%)과 애니메이션 속도(ms)을 설정합니다.
    const exposurePercentage = 100; // ex) 스크롤 했을 때 $counters 컨텐츠가 화면에 100% 노출되면 숫자가 올라갑니다.
    const duration = 1000; // ex) 1000 = 1초
    
    // 숫자에 쉼표를 추가할지 여부를 설정합니다.
    const addCommas = true; // ex) true = 1,000 / false = 1000
    
    // 숫자를 업데이트하고 애니메이션하는 함수 정의
    function updateCounter($el, start, end) {
        let startTime;
        function animateCounter(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / duration;
            const current = Math.round(start + progress * (end - start));
            const formattedNumber = addCommas ? current.toLocaleString() : current;
            $el.text(formattedNumber);
            
            if (progress < 1) {
                requestAnimationFrame(animateCounter);
            } else {
                $el.text(addCommas ? end.toLocaleString() : end);
            }
        }
        requestAnimationFrame(animateCounter);
    }

    
    // 윈도우의 스크롤 이벤트를 모니터링합니다.
    $(window).on('scroll', function() {
        // 각 "counter" 요소에 대해 반복합니다.
        $counters.each(function() {
            const $el = $(this);
            // 요소가 아직 스크롤되지 않았다면 처리합니다.
            if (!$el.data('scrolled')) {
                // 요소의 위치 정보를 가져옵니다.
                const rect = $el[0].getBoundingClientRect();
                const winHeight = window.innerHeight;
                const contentHeight = rect.bottom - rect.top;
                
                // 요소가 화면에 특정 비율만큼 노출될 때 처리합니다.
                if (rect.top <= winHeight - (contentHeight * exposurePercentage / 100) && rect.bottom >= (contentHeight * exposurePercentage / 100)) {
                    const start = parseInt($el.data("start"));
                    const end = parseInt($el.data("end"));
                    // 숫자를 업데이트하고 애니메이션을 시작합니다.
                    updateCounter($el, start, end);
                    $el.data('scrolled', true);
                }
            }
        });
    }).scroll();

    /* infogra counter - 끝 */

    

}) //맨끝