import 'focus-visible';
import 'nodelist-foreach-polyfill';
import 'picturefill';
import 'ie11-custom-properties';
import 'core-js/modules/es.object.assign';
import 'core-js/modules/es.number.is-nan';
import 'core-js/modules/es.string.repeat';
import 'core-js/modules/es.promise';

// circle text
// import CircleType from 'circletype';
// const circleType = new CircleType(document.querySelector('.c-circle-text'));

// parallax (https://web.dev/prefers-reduced-motion/)
import './vendors/rellax/rellax';

let rellaxAboutImage = new Rellax('.p-top-about__media--rellax', {
    center: false, // default: false
    wrapper: '.p-top-about__media-wrapper', // default: null(body)
    relativeToWrapper: true, // https://github.com/dixonandmoe/rellax/issues/120
    round: true, // default: ?
    vertical: true, // default: true
    horizontal: false, // default: false
    breakpoints: [540, 1080, 1300],
});

const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
motionQuery.addEventListener('change', handleReduceMotionChanged);

function handleReduceMotionChanged() {
    if (motionQuery.matches) {
        rellaxAboutImage.destroy();
    } else {
        rellaxAboutImage.refresh();
    }
}

handleReduceMotionChanged();

// smooth-scroll
import SmoothScroll from 'smooth-scroll';
new SmoothScroll('a[href*="#"]', {
    speed: 350,
    header: '[data-scroll-header]',
    easing: 'easeOutQuint',
});

// loading animation & animejs
import Cookies from 'js-cookie';
import anime from 'animejs/lib/anime.es.js';

var textWrapper01 = document.querySelector('.p-top-kv__animation-01');
textWrapper01.innerHTML = textWrapper01.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

var textWrapper02 = document.querySelector('.p-top-kv__animation-02');
textWrapper02.innerHTML = textWrapper02.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

const loadingElement = document.querySelector('.c-loading');

if (!Cookies.get('accessdate')) {
    if (loadingElement) {
        function noScroll(event) {
            event.preventDefault();
        }

        document.addEventListener('touchmove', noScroll, { passive: false });
        document.addEventListener('wheel', noScroll, { passive: false });

        setTimeout(function () {
            loadingElement.classList.remove('is-loading');
        }, 3000);

        setTimeout(function () {
            document.removeEventListener('touchmove', noScroll, { passive: false });
            document.removeEventListener('wheel', noScroll, { passive: false });
        }, 3200);
    }

    let date = new Date();
    let loadingYear = String(date.getFullYear());
    let loadingMonth = String(date.getMonth() + 1);
    let loadingDate = String(date.getDate());

    Cookies.set('accessdate', loadingYear + loadingMonth + loadingDate, { expires: 1, secure: true, domain: 'portfolio.coding11ty.com' });

    anime.timeline({ loop: false }).add({
        targets: '.p-top-kv__animation-01 .letter',
        opacity: [0, 1],
        easing: 'easeInOutQuad',
        duration: 2000,
        delay: 4000,
    });

    anime.timeline({ loop: false }).add({
        targets: '.p-top-kv__animation-02 .letter',
        opacity: [0, 1],
        easing: 'easeInOutQuad',
        duration: 2000,
        delay: 5000,
    });
} else {
    loadingElement.classList.remove('is-loading');

    anime.timeline({ loop: false }).add({
        targets: '.p-top-kv__animation-01 .letter',
        opacity: [0, 1],
        easing: 'easeInOutQuad',
        duration: 2000,
        delay: 1000,
    });

    anime.timeline({ loop: false }).add({
        targets: '.p-top-kv__animation-02 .letter',
        opacity: [0, 1],
        easing: 'easeInOutQuad',
        duration: 2000,
        delay: 2000,
    });
}

// AOS (Animation On Scroll)
import AOS from 'aos';

AOS.init({
    offset: 80, // default 120
    duration: 1650, // default 400
    easing: 'ease-in-out-cubic', // default ease
    delay: 0, // default 0
    anchor: null, // default null
    anchorPlacement: 'top-bottom', // default top-bottom
    once: true, // default false
});

// hamburger menu toggle
import { disableBodyScroll, enableBodyScroll } from './vendors/body-scroll-lock/bodyScrollLock';
import * as focusTrap from 'focus-trap';
const headerLogo = document.querySelector('.l-header__logo');
const hamburgerButton = document.querySelector('.c-hamburger');
const globalNavigation = document.querySelector('.c-gnav');
const globalNavigationLinks = document.querySelectorAll('.c-gnav__link');
const blankSpace = document.querySelector('.l-header__blank-space');
const focusTrapOutsideClick = focusTrap.createFocusTrap('.c-gnav', {
    allowOutsideClick: true,
    checkCanFocusTrap: (trapContainers) => {
        const results = trapContainers.map((trapContainer) => {
            return new Promise((resolve) => {
                const interval = setInterval(() => {
                    if (getComputedStyle(trapContainer).visibility !== 'hidden') {
                        resolve();
                        clearInterval(interval);
                    }
                }, 5);
            });
        });
        return Promise.all(results);
    },
});

hamburgerButton.addEventListener('click', function () {
    if (globalNavigation.classList.contains('is-active')) {
        document.documentElement.style.minHeight = '';
        this.setAttribute('aria-expanded', 'false');
        this.setAttribute('aria-label', 'menu');
        this.classList.remove('is-active');
        headerLogo.classList.remove('is-active');
        globalNavigation.classList.remove('is-active');
        focusTrapOutsideClick.deactivate();
        blankSpace.classList.remove('is-active');
        enableBodyScroll(globalNavigation);
    } else {
        document.documentElement.style.minHeight = '100vh'; // https://twitter.com/tak_dcxi/status/1455569725941948417
        this.setAttribute('aria-label', 'close menu');
        this.setAttribute('aria-expanded', 'true');
        this.classList.add('is-active');
        headerLogo.classList.add('is-active');
        globalNavigation.classList.add('is-active');
        focusTrapOutsideClick.activate();
        blankSpace.classList.add('is-active');
        disableBodyScroll(globalNavigation);
    }
});

globalNavigationLinks.forEach(function (globalNavigationLink) {
    globalNavigationLink.addEventListener('click', function () {
        document.documentElement.style.minHeight = '';
        hamburgerButton.setAttribute('aria-expanded', 'false');
        hamburgerButton.setAttribute('aria-label', 'menu');
        hamburgerButton.classList.remove('is-active');
        headerLogo.classList.remove('is-active');
        globalNavigation.classList.remove('is-active');
        focusTrapOutsideClick.deactivate();
        blankSpace.classList.remove('is-active');
        enableBodyScroll(globalNavigation);
    });
});

blankSpace.addEventListener('click', function () {
    document.documentElement.style.minHeight = '';
    hamburgerButton.setAttribute('aria-expanded', 'false');
    hamburgerButton.setAttribute('aria-label', 'menu');
    hamburgerButton.classList.remove('is-active');
    headerLogo.classList.remove('is-active');
    globalNavigation.classList.remove('is-active');
    focusTrapOutsideClick.deactivate();
    this.classList.remove('is-active');
    enableBodyScroll(globalNavigation);
});

// header on scroll
import 'intersection-observer';

const header = document.querySelector('.l-header');
const keyVisual = document.querySelector('.p-top-kv');

const observerHeaderPrePinned = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                header.classList.remove('is-pre-pinned');
            } else {
                header.classList.add('is-pre-pinned');
            }
        });
    },
    { threshold: 0.5 },
);

const observerHeaderPinned = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                header.classList.remove('is-pinned');
            } else {
                header.classList.add('is-pinned');
            }
        });
    },
    { threshold: 0.4 },
);

const observerHeaderVisible = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            header.classList.remove('is-visible');
        } else {
            header.classList.add('is-visible');
        }
    });
});

observerHeaderPrePinned.observe(keyVisual);
observerHeaderPinned.observe(keyVisual);
observerHeaderVisible.observe(keyVisual);

// switch viewport
!(function () {
    const viewport = document.querySelector('meta[name="viewport"]');
    function switchViewport() {
        const value = window.outerWidth > 366 ? 'width=device-width,initial-scale=1' : 'width=366';
        if (viewport.getAttribute('content') !== value) {
            viewport.setAttribute('content', value);
        }
    }
    addEventListener('resize', switchViewport, false);
    switchViewport();
})();

// object-fit-images
import objectFitImages from 'object-fit-images';

objectFitImages();

// postcss-viewport-height-correction
var customViewportCorrectionVariable = 'vh';

function setViewportProperty(doc) {
    var prevClientHeight;
    var customVar = '--' + (customViewportCorrectionVariable || 'vh');
    function handleResize() {
        var clientHeight = doc.clientHeight;
        if (clientHeight === prevClientHeight) return;
        requestAnimationFrame(function updateViewportHeight() {
            doc.style.setProperty(customVar, clientHeight * 0.01 + 'px');
            prevClientHeight = clientHeight;
        });
    }
    handleResize();
    return handleResize;
}
window.addEventListener('resize', setViewportProperty(document.documentElement));

// swiper
import Swiper from 'swiper/bundle';

new Swiper('.p-top-works__swiper', {
    loop: false,
    slidesPerView: 1,
    grabCursor: false,
    speed: 300,
    spaceBetween: 48,
    breakpoints: {
        724: {
            speed: 600,
        },
        1300: {
            speed: 1000,
        },
    },
    pagination: {
        el: '.p-top-works__swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    },
    navigation: {
        nextEl: '.p-top-works__swiper-button-next',
        prevEl: '.p-top-works__swiper-button-prev',
    },
});

// form validation bouncer
import Bouncer from 'formbouncerjs';
import Rellax from 'rellax';

new Bouncer('form', {
    messages: {
        missingValue: {
            checkbox: 'このフィールドは必須です',
            radio: '値を選択してください',
            select: '値を選択してください',
            'select-multiple': '少なくとも1つの値を選択してください',
            default: 'このフィールドに記入してください',
        },
        patternMismatch: {
            email: '有効なEメールアドレスを入力してください（例: masato@example.com）',
            url: 'URLを入力してください',
            number: '数字を入力してください',
            color: '#rrggbb形式に合わせてください',
            date: 'YYYY-MM-DD形式で入力してください',
            time: '24時間の時間形式で入力してください。例 23:00',
            month: 'YYYY-MM形式を使用してください',
            default: '要求されたフォーマットに合わせてください',
        },
        outOfRange: {
            over: '{max}を超えない値を選択してください',
            under: '{min}以下の値を選択してください',
        },
        wrongLength: {
            over: 'このテキストを{maxLength}文字以下に短縮してください',
            under: 'このテキストを{minLength}文字数以上にしてください',
        },
    },
});
