/************************** 
* 파일명 : main.js
* 작성자 : 윤지원
* 작성일 : 25-10-23
* 설  명 : 메인페이지에서만 적용되는 js (header/footer 제외)
**************************/
    


$(document).ready(function(){

    gsap.to("h2.type_target", {
        duration: 3,
        text: "Confidence Begins with Your Skin",
        ease: "none",
        onComplete() {
            gsap.to("h2.type_target", { "--after-opacity": 0, duration: 0.5 }); // 직접 선택 불가
            // 대신 이렇게 CSS 클래스 활용
            document.querySelector('h2.type_target').classList.add('cursor-fade');
        }
    });
    

    /******************  slogan 시작 ******************/
    let slogan = $('.slogan') //글자를 감싸는 영역의 이름
    let slogan_obj = $('.slogan p span') //각 줄안에 나타날 글자
    let slogan_rate_s = 0.3 //처음에 애니메이션 시작할때 글씨가 하단에서 몇 %정도 올라왔을때 애니메이션 시작할 것인지 (1이 100%임)
    let slogan_rate_e = 0.6 //마지막에 애니메이션이 끝날때 마지막 글자가 하단에서 몇 %정도 올라왔을때 종료할 것인지
    let slogan_leng = slogan_obj.length
    let slogan_scroll
    let slogan_top
    let slogan_start
    let slogan_end
    let slogan_w
    let scrolling
    let win_h

    slogan_ani()
    $(window).scroll(function(){
    //스크롤 할때마다 1번씩
    slogan_ani()
    })
    $(window).resize(function(){
    //브라우저가 리사이즈 될때마다 1번씩 실행
    slogan_ani()
    })

    function slogan_ani(){
    win_h = $(window).height()
    scrolling = $(window).scrollTop()
    slogan_top = slogan.offset().top
    slogan_start = slogan_top - win_h + (win_h * slogan_rate_s)
    slogan_end = slogan_top + slogan.height() - win_h + (win_h * slogan_rate_e)
    slogan_scroll = (scrolling - slogan_start) / (slogan_end - slogan_start) * 100
    if(slogan_start > scrolling) {
    //console.log('시작 이전')
    slogan_obj.width(0)
    }else if(slogan_end > scrolling){
    //console.log('애니메이션중')
    for(i=0; i<slogan_leng; i++){
    slogan_w = (slogan_scroll - (100/slogan_leng)*i) * slogan_leng
    if(slogan_w > 100){
    slogan_w = 100
    }
    slogan_obj.eq(i).width(slogan_w + '%')
    }
    }else{
    //console.log('종료 이후')
    slogan_obj.width('100%')
    }
    }//slogan_ani

    /******************  slogan 끝 ******************/


    /******************  introduce 시작 ******************/

    let mobile_size = 768 //모바일 메뉴 시작 사이즈
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

    gsap.registerPlugin(ScrollTrigger);

    const subTxts = $('.sub_tit .sub_txt');
    const contItems = $('.cont_item');
    const imgBox = $('.img_box');
    const total = subTxts.length;

    // 활성화 함수
    function setActive(index) {
        subTxts.removeClass('active').eq(index).addClass('active');

        // img_box active0, active1... 적용
        imgBox.removeClass(function(i, cls){
            return (cls.match(/active\d/g) || []).join(' ');
        }).addClass('active' + index);

        // cont_item 활성화 & ico01 ~ ico06 붙이기
        contItems.removeClass('active ico01 ico02 ico03 ico04 ico05 ico06');
        const icoClass = 'ico' + String(index + 1).padStart(2, '0');
        contItems.eq(index).addClass('active ' + icoClass);
    }

    //컨텐츠 높이
    const container = $('.introduce .cont_left');
    const rightHeight = $('.introduce .cont_right').outerHeight(true);
    const leftHeight = container.outerHeight(true);


    /* pc버전일때 */
    if(device_status == 'pc'){
        const rightHeight = $('.introduce .cont_right').outerHeight(true);
        const leftHeight = $('.introduce .cont_left').outerHeight(true);
    
        ScrollTrigger.create({
            trigger: '.introduce',
            start: 'top top',
            end: `+=${leftHeight - rightHeight}`,
            scrub: true,
            pin: '.cont_right',
            onUpdate: self => {
                const progress = self.progress;
                const index = Math.min(total - 1, Math.floor(progress * total));
                setActive(index);
            }
        });
    }

    /* 모바일일때 */
    if(device_status == 'mobile'){

        // 처음에는 모두 비활성화
        subTxts.removeClass('active');
        contItems.removeClass('active ico01 ico02 ico03 ico04 ico05 ico06');
        imgBox.removeClass(function(i, cls){
            return (cls.match(/active\d/g) || []).join(' ');
        });
    
        // 클릭 이벤트
        $('.sub_tit .sub_txt').on('click', function(){
            const index = $(this).index(); // 클릭한 sub_txt의 index
            setActive(index);
        });

        setActive(0);

        prev_status = device_status;
    }
    /******************  introduce 끝 ******************/

    
    /******************* service 시작 ********************/
    
    let poStart = 50; // 상단에 고정할때의 위치
    let poGap = 50; // 첫번째와 두번째의 여백
    let poObj = '.accordion_wrap .accordion' // 고정요소
    let poObjCont = '.conts' // 고정요소 내부의 내용

    $(poObj).each(function(i, e) {
        // 핀
        ScrollTrigger.create({
            trigger: e,
            start:  'top +='+(poStart + i * poGap),
            endTrigger: poObj+'.last',
            end: 'top +=80',
            pin: true,
            pinSpacing: false,
            markers: false,
            anticipatePin: 1,
        });

        // 회전
        gsap.to($(e).find(poObjCont), {
            rotateX: -6,
            ease: 'none',
            scrollTrigger: {
                trigger: e,
                start:  'top +='+(poStart + i * poGap),
                end: 'top -=30%',
                scrub: 1,
            },
        });

        // 스케일,어둡게
        gsap.to($(e).find(poObjCont), {
            scale: 0.05,
            top: -200,
            ease: 'none',
            scrollTrigger: {
                trigger: e,
                start:  'top +='+(poStart + i * poGap),
                end: 'top -=700%',
                scrub: 1,
            },
        });
    });
   /******************* service 끝 ********************/

    /******************* plus 시작 ********************/
    $('.plus .ctn_list .popup').slick({
        autoplay: true, //팝업 자동 실행
        autoplaySpeed: 3000, //팝업이 머무는 시간
        speed: 500, //팝업 전환 속도
        dots: true, //하단 페이지 버튼 (true, false)
        arrows: true,  //다음, 이전팝업 (true, false)
        pauseOnHover: true, //마우스호버시 일시정지
        //infinite: false, //무한반복
        variableWidth: true, //넓이를 자유롭게 설정
        //slidesToShow: 3, //한번에 보일 팝업 수
        //slidesToScroll: 1, //한번 드래그에 움직이는 슬라이드 제한
        swipeToSlide: true, //드래그한만큼 슬라이드 움직이기
        centerMode: true, //가운데정렬(가운데가 1번)
        responsive: [
            {
              breakpoint: 1025,
              settings: {
                variableWidth: false, //넓이를 자유롭게 설정
                slidesToShow: 2,
                centerPadding: '48px', //팝업 좌우에 여백 centerMode: true 일때만 적용
              }
            },
            {
              breakpoint: 769,
              settings: {
                variableWidth: false, //넓이를 자유롭게 해제
                slidesToShow: 1,
                centerPadding: '0', //팝업 좌우에 여백 centerMode: true 일때만 적용
              }
            }
        ]
    });
    /******************* plus 끝 ********************/


    AOS.init({
        offset: 270, // 해당 콘텐츠가 하단에서 몇 px 위로 올라와에 나타나는 효과가 나타날지 셋팅하는 값
        duration: 1000, // 애니메이션 효과가 작동되는 시간
        easing: 'ease', // 가속도
    });

   

}) //맨끝