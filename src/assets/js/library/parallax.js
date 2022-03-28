// ============================================================================
// parallax library
// https://github.com/alexfoxy/lax.js
// ============================================================================

import lax from 'lax.js';

export const parallax = () => {
    window.addEventListener('load', () => {
        lax.init();

        lax.addDriver('scrollY', () => {
            return window.scrollY;
        });

        lax.addElements('.c-card-01__image', {
            scrollY: {
                translateY: [
                    ['elInY', 'elCenterY', 'elOutY'],
                    {
                        768: [25, 0, -25],
                        1366: [55, 0, -55],
                        1920: [75, 0, -75],
                    },
                ],
                opacity: [
                    ['elInY', 'elCenterY - 250'],
                    {
                        768: [1, 1],
                        1366: [0.5, 1],
                        1920: [0.5, 1],
                    },
                ],
                scale: [
                    ['elInY', 'elCenterY - 250'],
                    {
                        768: [1, 1],
                        1366: [1.2, 1],
                        1920: [1.3, 1],
                    },
                ],
            },
        });
    });
};
