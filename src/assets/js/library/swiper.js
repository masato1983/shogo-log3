// ============================================================================
// swiper library
// https://swiperjs.com/
// ============================================================================

import Swiper, { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

export const swiper = () => {
    const targetSwiperWorks = document.querySelector('.p-top-works__swiper');
    const targetPaginationWorks = document.querySelector('.p-top-works__swiper-pagination');
    const numberOfImage = document.querySelectorAll('.p-top-works__swiper-slide').length;

    let loop = null;
    let autoplay = null;
    let centeredSlides = null;

    if (numberOfImage < 5) {
        loop = false;
        centeredSlides = false;
        autoplay = {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        };
    } else {
        loop = true;
        centeredSlides = true;
        autoplay = {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        };
    }

    const option = {
        modules: [Pagination, Autoplay],
        slidesPerView: 'auto',
        spaceBetween: 28,
        loop: loop,
        centeredSlides: centeredSlides,
        speed: 500,
        autoplay: autoplay,
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
            el: targetPaginationWorks,
            type: 'bullets',
            bulletElement: 'span',
            bulletClass: 'p-top-works__swiper-pagination--bullet',
            bulletActiveClass: 'is-active',
            clickable: true,
            clickableClass: 'is-clickable',
            horizontalClass: 'p-top-works__swiper--horizontal',
            modifierClass: 'p-top-works__swiper-pagination--',
            renderBullet: (index, className) => {
                return `<span class="${className}">${index + 1}</span>`;
            },
        },
    };

    const swiper = new Swiper(targetSwiperWorks, option);
};
