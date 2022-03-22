// ============================================================================
// sequenceFadeIn library
// ============================================================================

export const sequenceFadeInGlobalNavigationText = () => {
    const navigationTexts = document.querySelectorAll('.c-gnav__list');
    const start = 500;
    const interval = 150;

    navigationTexts.forEach((navigationText, index) => {
        navigationText.style.transitionDelay = `${start + index * interval}ms`;
    });
};
