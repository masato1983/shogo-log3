// ============================================================================
// swiper library
// https://swiperjs.com/
// ============================================================================

import Swiper, { Navigation, Pagination, Autoplay, Mousewheel } from 'swiper';
import 'swiper/css';

export const swiper = () => {
    const numberOfImage = document.querySelectorAll('.p-top-works__swiper-container .swiper-slide').length;

    let loop = null,
        centeredSlides = null;

    if (numberOfImage <= 4) {
        loop = false;
        centeredSlides = false;
    } else {
        loop = true;
        centeredSlides = true;
    }

    const option = {
        modules: [Navigation, Pagination, Autoplay, Mousewheel],
        slidesPerView: 'auto',
        spaceBetween: 28,
        loop, // ES6 Object literal
        centeredSlides, // ES6 Object literal
        speed: 500,
        mousewheel: {
            eventsTarget: '.p-top-works__swiper-container .swiper',
            forceToAxis: true,
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        breakpoints: {
            768: {
                spaceBetween: 36,
            },
            1080: {
                spaceBetween: 42,
            },
            1366: {
                spaceBetween: 56,
            },
        },
        pagination: {
            el: '.p-top-works__swiper-container .swiper-pagination',
            type: 'bullets',
            bulletElement: 'span',
            bulletActiveClass: 'is-active',
            clickable: true,
            clickableClass: 'is-clickable',
            renderBullet: (index, className) => {
                return `<span class="${className}">${index + 1}</span>`;
            },
        },
        navigation: {
            nextEl: '.p-top-works__swiper-container .swiper-button-next',
            prevEl: '.p-top-works__swiper-container .swiper-button-prev',
        },
    };

    const swiperWorks = new Swiper('.p-top-works__swiper-container .swiper', option);
};
