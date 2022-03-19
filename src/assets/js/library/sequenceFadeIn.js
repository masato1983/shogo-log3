// ============================================================================
// sequenceFadeIn
// ============================================================================

export const sequenceFadeInGlobalNavigationText = (arg) => {
    const navigationTexts = document.querySelectorAll('.c-gnav__animation--sequence-fadein');

    const start = 300;
    const interval = 50;

    navigationTexts.forEach((navigationText, index) => {
        if (arg === 'on') {
            navigationText.style.transitionDelay = `${start + index * interval}ms`;
        } else if (arg === 'off') {
            navigationText.style.transitionDelay = '0ms';
        }
    });
};
