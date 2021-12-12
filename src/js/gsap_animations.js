gsap.registerPlugin(CSSRulePlugin);
gsap.registerPlugin(ScrollTrigger);

const navbar_logo = document.querySelector('.header__navbar-logo');
const navbar_toggle_btn = document.querySelector('.header__navbar-toggle-btn');

export const header_animation = _ => {
    if (window.matchMedia('(max-width: 991px)').matches) {
        let small_nav_tl = gsap.timeline({ defaults: { delay: 1, duration: 1, opacity: 0, ease: 'Power1.easeOut' } });
        small_nav_tl.from(navbar_logo, { y: -50 })
            .from(navbar_toggle_btn, { y: 50 }, '-=2')
    } else {
        let big_nav_tl = gsap.timeline({defaults: {opacity: 0}});
        big_nav_tl.from(navbar_logo, {x: -50, delay: 1, duration: 1, ease: 'bounce'})
    }
}