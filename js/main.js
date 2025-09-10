function setMainMargin() {
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    if (header && main) {
        main.style.marginTop = header.offsetHeight + 'px';
    }
}
window.addEventListener('DOMContentLoaded', setMainMargin);
window.addEventListener('resize', setMainMargin);