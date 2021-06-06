// 헤더메뉴
const $gnbList = document.querySelectorAll(".gnb_list");
const $header = document.querySelector("#header");
const $gnb = document.querySelector(".gnb");

const addClass = (e) => {
    e.target.classList.add("on");
};

const removeClass = (e) => {
    e.target.classList.remove("on");
};

for (let i = 0; i < $gnbList.length; i++) {
    $gnbList[i].addEventListener("mouseenter", addClass);
    $gnbList[i].addEventListener("mouseleave", removeClass);
}


$gnb.addEventListener("mouseenter", () => {
    $header.classList.add("on");
});
$gnb.addEventListener("mouseleave", () => {
    $header.classList.remove("on");
});

// 슬라이더
document.addEventListener("DOMContentLoaded", () => {

    const slideWrap = document.querySelector(".slide_wrap"),
        slideContainer = document.querySelector(".slide_container"),
        slides = document.querySelectorAll(".slide"),
        pagerBtn = document.querySelectorAll(".pager a");

    let slideCount = slides.length,
        currentIndex = 0,
        timer = null;

    // 슬라이드 가로로 배열하기
    for (let i = 0; i < slideCount; i++) {
        slides[i].style.left = i * 100 + "%";
    }

    // 슬라이드 이동함수
    const goToSlide = (idx) => {
        slideContainer.classList.add("animate");
        slideContainer.style.left = -100 * idx + "%";
        currentIndex = idx;

        for (let y = 0; y < pagerBtn.length; y++) {
            pagerBtn[y].classList.remove("on");
        }
        pagerBtn[idx].classList.add("on");
    };

    goToSlide(0);

    //자동 슬라이드 함수
    const startAutoSlide = () => {
        timer = setInterval(function () {
            let nextIdx = (currentIndex + 1) % slideCount;

            goToSlide(nextIdx);
        }, 4500);
    };

    startAutoSlide();

    // 슬라이드 정지 함수
    const stopAutoSlide = () => {
        clearInterval(timer);
    };

    //slideWrap에 마우스가 들어오면 할일, 나가면 할일
    slideWrap.addEventListener("mouseenter", () => {
        stopAutoSlide();
    });

    slideWrap.addEventListener("mouseleave", () => {
        startAutoSlide();
    });

    //pager로 슬라이드 이동하기
    for (let a = 0; a < pagerBtn.length; a++) {
        pagerBtn[a].addEventListener("click", (e) => {
            e.preventDefault();
            let pagerNum = e.target.getAttribute("data-idx");
            goToSlide(pagerNum);
        });
    }
});

// gn_area 탭메뉴
const $locateMenu = document.querySelectorAll(".locate_menu li a");
const $locateImg = document.querySelectorAll(".locate_img span");

const showImg = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let menuIndex = [...$locateMenu].indexOf(e.target);

    $locateMenu.forEach((menu) => {
        [...$locateMenu].indexOf(menu) === menuIndex ?
            menu.parentNode.classList.add("on") :
            menu.parentNode.classList.remove("on");
    });


    $locateImg.forEach((cont) => {
        [...$locateImg].indexOf(cont) === menuIndex ?
            cont.classList.add("on") :
            cont.classList.remove("on");
    });
};

$locateMenu.forEach((menu) => {
    menu.addEventListener("click", showImg);
});

// 반응형 메뉴
const $mLeftMenu = document.querySelectorAll(".mobile_list>div");
const $mMenu = document.querySelectorAll(".m_item_list li a");
const $depth = document.querySelectorAll(".m_depth1 button");
const $close = document.querySelectorAll(".close");

for (let i = 0; i < $close.length; i++) {
    $close[i].addEventListener("click", (e) => {
        e.preventDefault();
        e.target.parentNode.classList.remove("on");
        document.body.classList.remove("on");
    });
}

const showMenu = (e) => {
    e.preventDefault();

    let $mMenuIndex = [...$mMenu].indexOf(e.target);

    $mMenu.forEach((menu) => {
        [...$mMenu].indexOf(menu) === $mMenuIndex ?
            menu.parentNode.classList.toggle("on") :
            menu.parentNode.classList.remove("on");
    });

    $mLeftMenu.forEach((cont) => {
        [...$mLeftMenu].indexOf(cont) === $mMenuIndex ?
            cont.classList.toggle("on") :
            cont.classList.remove("on");
    });

    !document.body.classList.contains("on") ?
        document.body.classList.toggle("on") :
        document.body.classList.remove("on");
};

$mMenu.forEach((menu) => {
    menu.addEventListener("click", showMenu);
});

window.addEventListener("resize", () => {
    if (window.innerWidth < 1023) {
        document.body.classList.remove("on");
        for (let i = 0; i < $mLeftMenu.length; i++) {
            $mLeftMenu[i].classList.remove("on");
        }
    }
});


const btnHandler = (e) => {
    e.preventDefault();

    let buttonIndex = [...$depth].indexOf(e.target);

    $depth.forEach((menu) => {
        [...$depth].indexOf(menu) === buttonIndex ?
            menu.parentNode.classList.toggle("on") :
            menu.parentNode.classList.remove("on");
    });
};

$depth.forEach((menu) => {
    menu.addEventListener("click", btnHandler);
});