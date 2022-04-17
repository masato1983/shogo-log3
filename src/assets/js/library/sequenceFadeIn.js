// ============================================================================
// sequenceFadeIn library
// ============================================================================

export const sequenceFadeInGlobalNavigationText = () => {
    const navigationTexts = document.querySelectorAll('.c-gnav__list'),
        start = 500,
        interval = 150;

    navigationTexts.forEach((navigationText, index) => {
        navigationText.style.transitionDelay = `${start + index * interval}ms`;
    });
};
