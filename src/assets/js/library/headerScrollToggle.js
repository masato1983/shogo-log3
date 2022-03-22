// ============================================================================
// headerScrollToggle
// https://codingreflections.com/hide-header-on-scroll-down/
// ============================================================================

export let headerScrollToggle = () => {
    let curScroll = window.scrollY || document.documentElement.scrollTop;
    let prevScroll = window.scrollY || document.documentElement.scrollTop;
    let curDirection = 0;
    let prevDirection = 0;

    let header = document.querySelector('.l-header');
    let headerNavigation = document.querySelector('.l-header__navigation');

    let threshold = 200;
    let toggled;

    let checkScroll = () => {
        curScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (curScroll > prevScroll) {
            curDirection = 2;
        } else {
            curDirection = 1;
        }

        if (curDirection !== prevDirection) {
            toggled = toggleHeader();
        }

        if (toggled) {
            prevDirection = curDirection;
        }

        prevScroll = curScroll;
    };

    let toggleHeader = () => {
        if (!headerNavigation.classList.contains('is-open')) {
            toggled = true;
            if (curDirection === 2 && curScroll > threshold) {
                header.classList.add('is-scroll-down');
                header.classList.remove('is-scroll-up');
            } else if (curDirection === 1) {
                header.classList.add('is-scroll-up');
                header.classList.remove('is-scroll-down');
            } else {
                toggled = false;
            }

            return toggled;
        }
    };

    window.addEventListener('scroll', checkScroll);
};
