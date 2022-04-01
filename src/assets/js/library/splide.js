// ============================================================================
// splide library
// https://ja.splidejs.com/
// ============================================================================

import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide-core.min.css';

const option = {
    arrows: true,
    type: 'loop',
    drag: 'free',
    direction: 'ltr',
    perMove: 1,
    focus: 'center',
    fixedWidth: '20.125rem',
    gap: '2rem',
    padding: '5rem',
    pagination: true,
    autoplay: true,
    interval: 5000,
    waitoForTransition: true,
};

export const splide = () => {
    let splide = new Splide('.splide', option);

    splide.on('pagination:mounted', function (data) {
        console.log(data);
        data.items.forEach(function (item) {
            item.button.textContent = String(item.page + 1);
        });
    });

    splide.mount();
};
