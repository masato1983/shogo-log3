// ============================================================================
// hamburgerMenuToggle library
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#event_listener_with_an_arrow_function
// https://www.30secondsofcode.org/articles/s/javascript-arrow-function-event-listeners
// ============================================================================

import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import { sequenceFadeInGlobalNavigationText } from '../library/sequenceFadeIn';
import { breakpoint } from '../../../json/breakpoints.json';

export const hamburgerMenuToggle = () => {
    const { tablet } = breakpoint; // ES6 Destructuring assignment

    const hamburgerButton = document.querySelector('.c-hamburger');
    const headerNavigation = document.querySelector('.l-header__navigation');
    const globalNavigationLists = document.querySelectorAll('.c-gnav__list');
    const headerOverlay = document.querySelector('.l-header__overlay');

    const openMenu = () => {
        sequenceFadeInGlobalNavigationText();
        hamburgerButton.classList.add('is-active');
        hamburgerButton.setAttribute('aria-expanded', 'true');
        hamburgerButton.setAttribute('aria-label', 'open menu');
        headerNavigation.scrollTo(0, 0);
        headerNavigation.classList.add('is-open');
        headerOverlay.classList.add('is-open');
        if (window.matchMedia('(max-width: tablet)').matches) {
            disablePageScroll(headerNavigation);
        }
    };

    const closeMenu = () => {
        /* resizeFlickeringStopper: https://ishadeed.com/article/layout-flickering/ */
        headerNavigation.style.opacity = '0';
        headerNavigation.style.visibility = 'hidden';
        headerNavigation.style.transform = 'translateX(100%)';
        headerNavigation.style.transitionDelay = '200ms';
        globalNavigationLists.forEach((globalNavigationList) => {
            globalNavigationList.style.transitionDelay = '0ms';
            globalNavigationList.style.opacity = '0';
            globalNavigationList.style.transform = 'translateX(12px)';
        });

        setTimeout(() => {
            hamburgerButton.classList.remove('is-active');
            hamburgerButton.setAttribute('aria-expanded', 'false');
            hamburgerButton.setAttribute('aria-label', 'close menu');
            headerNavigation.classList.remove('is-open');
            headerOverlay.classList.remove('is-open');
            if (window.matchMedia('(max-width: tablet)').matches) {
                enablePageScroll(headerNavigation);
            }

            /* resizeFlickeringStopper: https://ishadeed.com/article/layout-flickering/ */
            headerNavigation.style.opacity = '';
            headerNavigation.style.visibility = '';
            headerNavigation.style.transform = '';
            headerNavigation.style.transitionDelay = '';
            globalNavigationLists.forEach((globalNavigationList) => {
                globalNavigationList.style.opacity = '';
                globalNavigationList.style.transform = '';
                globalNavigationList.style.transitionDelay = '';
            });
        }, 400);
    };

    const toggleMenu = () => {
        if (hamburgerButton.classList.contains('is-active')) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    const closeMenuDelegation = (e) => {
        if (e.target.className != 'c-gnav__text') {
            return;
        } else {
            closeMenu();
        }
    };

    hamburgerButton.addEventListener('click', toggleMenu);
    headerOverlay.addEventListener('click', closeMenu);
    headerNavigation.addEventListener('click', closeMenuDelegation);
};
