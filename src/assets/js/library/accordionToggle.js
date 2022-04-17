// ============================================================================
// accordionToggle library
// https://dev.to/lizlaffitte/creating-an-accordion-with-html-css-javascript-3gmn
// https://www.sarasoueidan.com/blog/accordion-markup/
// ============================================================================

// 別のアイテムが開かれた時、もう一方のアイテムは閉じる場合、trueに設定する。
const onlyOnePanelOpen = false;

export const accordionToggle = () => {
    const accordion = document.querySelector('.c-accordion'),
        buttons = document.querySelectorAll('.c-accordion__button'),
        buttonActive = document.querySelector('.c-accordion__button.is-active'),
        answerActive = buttonActive.nextElementSibling;

    if (buttonActive) {
        buttonActive.setAttribute('aria-expanded', true);
        answerActive.setAttribute('aria-hidden', false);
        answerActive.style.maxHeight = `${answerActive.scrollHeight}px`;
    }

    accordion.addEventListener('click', (e) => {
        let target = e.target;
        let targetAnswer = target.nextElementSibling;

        const targetPanelClose = () => {
            target.setAttribute('aria-expanded', false);
            targetAnswer.setAttribute('aria-hidden', true);
            targetAnswer.style.maxHeight = null;
        };

        const targetPanelOpen = () => {
            target.setAttribute('aria-expanded', true);
            targetAnswer.setAttribute('aria-hidden', false);
            targetAnswer.style.maxHeight = `${targetAnswer.scrollHeight}px`;
        };

        const nonTargetPanelClose = (nonTargetButton) => {
            let nonTargetAnswer = nonTargetButton.nextElementSibling;

            nonTargetButton.classList.remove('is-active');
            nonTargetButton.setAttribute('aria-expanded', false);
            nonTargetAnswer.setAttribute('aria-hidden', true);
            nonTargetAnswer.style.maxHeight = null;
        };

        if (target.tagName === 'BUTTON') {
            target.classList.toggle('is-active');

            if (target.classList.contains('is-active')) {
                targetPanelOpen();
            } else {
                targetPanelClose();
            }

            if (onlyOnePanelOpen) {
                buttons.forEach((button) => {
                    if (button !== target) {
                        nonTargetPanelClose(button);
                    }
                });
            }
        }
    });
};
