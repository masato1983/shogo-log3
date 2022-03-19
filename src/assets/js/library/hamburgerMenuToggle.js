// ============================================================================
// hamburgerMenuToggle
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#event_listener_with_an_arrow_function
// https://www.30secondsofcode.org/articles/s/javascript-arrow-function-event-listeners
// ============================================================================

import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import { sequenceFadeInGlobalNavigationText } from '../library/sequenceFadeIn';
import breakpoints from '../../../json/breakpoints.json';

export const hamburgerMenuToggle = () => {
    const tablet = breakpoints.breakpoint.tablet;
    const hamburgerButton = document.querySelector('.c-hamburger');

    hamburgerButton.addEventListener('click', (e) => {
        if (e.currentTarget.classList.contains('is-active')) {
            sequenceFadeInGlobalNavigationText('off');
            e.currentTarget.classList.remove('is-active');
            e.currentTarget.setAttribute('aria-expanded', 'false');
            e.currentTarget.setAttribute('aria-label', 'close menu');
            e.currentTarget.parentNode.nextElementSibling.classList.remove('is-open'); // .l-header__navigation
            e.currentTarget.parentNode.parentNode.lastElementChild.classList.remove('is-open'); // .l-header__overlay
            if (window.matchMedia('(max-width: tablet)').matches) {
                enablePageScroll(e.currentTarget.parentNode.nextElementSibling);
            }
        } else {
            sequenceFadeInGlobalNavigationText('on');
            e.currentTarget.classList.add('is-active');
            e.currentTarget.setAttribute('aria-expanded', 'true');
            e.currentTarget.setAttribute('aria-label', 'open menu');
            e.currentTarget.parentNode.nextElementSibling.classList.add('is-open'); // .l-header__navigation
            e.currentTarget.parentNode.nextElementSibling.scrollTo(0, 0); // .l-header__navigation
            e.currentTarget.parentNode.parentNode.lastElementChild.classList.add('is-open'); // .l-header__overlay
            if (window.matchMedia('(max-width: tablet)').matches) {
                disablePageScroll(e.currentTarget.parentNode.nextElementSibling);
            }
        }
    });
};
