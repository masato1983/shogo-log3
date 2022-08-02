// ============================================================================
// Modal
// https://www.youtube.com/watch?v=TAB_v6yBXIE&t=9s
// https://www.youtube.com/watch?v=4prVdA7_6u0
// 
// or
//
// https://a11y-dialog.netlify.app/
// ============================================================================

import dialogPolyfill from "dialog-polyfill";

export const modal = () => {
    const modal = document.querySelector('.c-modal')
    const openModal = document.querySelector('.c-modal__open-button')
    const closeModal = document.querySelector('.c-modal__close-button')
    
    dialogPolyfill.registerDialog(modal);

    openModal.addEventListener('click', () => {
        modal.showModal();
    })

    closeModal.addEventListener('click', () => {
        modal.close();
    })
}