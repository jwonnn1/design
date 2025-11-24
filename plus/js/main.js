/************************** 
* 파일명 : main.js
* 작성자 : 윤지원
* 작성일 : 25-10-23
* 설  명 : 메인페이지에서만 적용되는 js (header/footer 제외)
**************************/

/******************  slogan 시작 ******************/
$(document).ready(function(){
    let slogan = $('.slogan .slogan_head') //글자를 감싸는 영역의 이름
    let slogan_obj = $('.slogan .slogan_head p span') //각 줄안에 나타날 글자
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

    gsap.registerPlugin(ScrollTrigger);

    const subTxts = $('.sub_tit .sub_txt');
    const contItems = $('.cont_item');
    const imgBox = $('.img_box');
    const total = subTxts.length;

    // 활성화 함수
    function setActive(index) {
        subTxts.removeClass('active').eq(index).addClass('active');
        
        imgBox.removeClass(function(i, cls) {
            return (cls.match(/active\d/g) || []).join(' ');
        }).addClass('active' + index);
        
        contItems.removeClass('active ico01 ico02 ico03 ico04 ico05 ico06');
        const icoClass = 'ico' + String(index + 1).padStart(2,'0');
        contItems.eq(index).addClass('active ' + icoClass);
    }

    // 컨텐츠 높이
    const container = $('.introduce .cont_left');
    const rightHeight = $('.introduce .cont_right').outerHeight(true);
    const leftHeight = container.outerHeight(true);

    // 스크롤 구간 설정
    ScrollTrigger.create({
        trigger: '.introduce',
        start: 'top top',
        end: `+=${leftHeight - rightHeight}`,
        scrub: true,
        pin: '.cont_right',
        onUpdate: self => {
            // progress를 0~1로 변환 후 index 계산
            const progress = self.progress;
            const index = Math.min(total - 1, Math.floor(progress * total));
            setActive(index);
        }
    });

    
    /******************* service 시작 ********************/
    gsap.registerPlugin(ScrollTrigger);
    const items = gsap.utils.toArray(".accordion");  //<!-- 고정요소 -->

    items.forEach((item, i) => {
        const content = item.querySelector(".accordion .conts");  //<!-- 고정요소의 내용 -->
        const header = item.querySelector(".accordion .tit");   //<!-- 고정요소의 제목 -->
        gsap.to(content, {
            height: 0,
            ease: "none",
            scrollTrigger: {
                trigger: item,
                start: "top " + header.clientHeight * i,
                endTrigger: ".final",  // 고정요소 하단에 종료를 뜻하는 class
                end: "top " + header.clientHeight * items.length,
                pin: true,
                pinSpacing: false,
                scrub: true,
                markers: false,
                id: i + 1
            }
        });
    });
   /******************* service 끝 ********************/

    /******************* location 시작 ********************/
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
              breakpoint: 1024,
              settings: {
                variableWidth: false, //넓이를 자유롭게 설정
                slidesToShow: 2,
                centerPadding: '48px', //팝업 좌우에 여백 centerMode: true 일때만 적용
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
    /******************* location 끝 ********************/


    AOS.init({
        offset: 270, // 해당 콘텐츠가 하단에서 몇 px 위로 올라와에 나타나는 효과가 나타날지 셋팅하는 값
        duration: 1000, // 애니메이션 효과가 작동되는 시간
        easing: 'ease', // 가속도
    });

   

}) //맨끝