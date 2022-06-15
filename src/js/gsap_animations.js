import { hide, isMatchMediaMinWidth } from "./utils";

gsap.registerPlugin(CSSRulePlugin, ScrollTrigger);

export const master = () => {
    let master_tl = gsap.timeline();
    master_tl.add(header_animation())
        .add(about_me_animation) // adding it here to prevent time delay (maybe not elegant)
        .add(tech_animation)
        .add(contact_animation)

    if (isMatchMediaMinWidth('62em')) { // >= 992px
        master_tl.add(hero_animation, ">2");
    } else master_tl.add(hero_animation, ">2");
    master_tl.add(footer_animation, ">1")
}

// animation for nav items
const header_animation = () => {
    const navbar_logo = document.querySelector('.header__navbar-logo');
    const navbar_toggle_btn = document.querySelector('.header__navbar-toggle-btn');
    const nav_list_items = [document.querySelectorAll('.header__navbar-list-item')];

    if (!isMatchMediaMinWidth('61.9375em')) { // < 992px
        let small_nav_tl = gsap.timeline({ defaults: { duration: .8 } });
        small_nav_tl.from(navbar_logo, { opacity: 0 })
            .from(navbar_toggle_btn, { opacity: 0 }, '')
    } else {
        let big_nav_tl = gsap.timeline();
        big_nav_tl.from(navbar_logo, { x: -50, duration: 1, ease: 'bounce' })
            .from(nav_list_items, { opacity: 0, x: -20, stagger: .15, duration: .2, ease: 'power1' })
    }
}

//animation for hero items
const hero_animation = () => {
    const hero_items = [
        document.querySelectorAll("[class*='hero__']"),
    ]
    let hero_tl = gsap.timeline();
    hero_tl.to(hero_items, { opacity: 1, duration: .4, y: 30, stagger: .2, ease: 'power1' })
}

// animation for sticky footer
const footer_animation = () => {
    if (isMatchMediaMinWidth('62em')) { // >= 992px
        // CSSRulePlugin does not work well with pseudo elements/ Sass (idk yet) 
        // after hours of trying and checking online...so I created html elements to replace the pseudos
        const left_bar = document.querySelector('.footer__social-list-left-bar');
        const right_bar = document.querySelector('.footer__author-email-right-bar');
        const social_icons = document.querySelectorAll('.footer__social-list-item');
        const author_email = document.querySelector('.footer__author-email > a');

        let footer_tl = gsap.timeline();
        footer_tl.to(left_bar, { scaleY: 1, duration: .5, ease: 'Power2.inOut' })
            .to(right_bar, { scaleY: 1, duration: .5, ease: 'Power2.inOut' }, '')
            .to(social_icons, { opacity: 1, y: 0, duration: .3, stagger: -0.1 })
            .to(author_email, { opacity: 1, duration: .5, y: 0 }, '-=0.3')
    }
}

// animation for about me section
const about_me_animation = () => {
    // For text part
    const show = (element) => {
        gsap.fromTo(element, { opacity: 0, y: 20 }, { duration: 0.5, y: 0, opacity: 1, ease: 'power1', stagger: 0.2 });
    }

    const about_me_section = document.getElementById('about-me');
    const about_reveal_items = document.querySelectorAll('.about-reveal');

    hide(about_reveal_items);
    ScrollTrigger.create({
        trigger: about_me_section,
        start: 'top 70%',
        onEnter: () => show(about_reveal_items),
        once: true,
        // markers: true,
    })

    // For image part
    hide('.image-reveal')
    ScrollTrigger.create({
        trigger: '.image-reveal',
        start: 'top: 65%',
        onEnter: () => gsap.fromTo('.image-reveal', { scale: 1.3 }, { opacity: 1, duration: 0.5, scale: 1, ease: 'power1' }),
        once: true,
    })
}

// Hover animation for tech stack section
export const techGridAnimation = (color) => {
    const middle_column_lines = [document.querySelectorAll('.main__tech-list-item:nth-child(odd) .i-right')];
    const first_row_lines = [document.querySelectorAll('.main__tech-list-item:nth-child(-n+4) .i-bottom')];
    const second_row_lines = [document.querySelectorAll('.main__tech-list-item:nth-child(n+5):nth-child(-n+8) .i-bottom')]; // selector from: (https://stackoverflow.com/a/28061560)

    if (isMatchMediaMinWidth('48em')) { // >= 768px
        const tl = gsap.timeline();
        tl.to(first_row_lines, { backgroundColor: color, duration: '0.4', stagger: '0.2' })
            .to(second_row_lines, { backgroundColor: color, duration: '0.4', stagger: '0.2', }, "");
    } else {
        const tl = gsap.timeline();
        tl.to(middle_column_lines, { backgroundColor: color, duration: '0.4', stagger: '0.2' });
    }
}

// Animation for tech section
const tech_animation = () => {
    const first_row_lines = [document.querySelectorAll('.main__tech-list-item:nth-child(-n+4) .i-bottom')];
    const second_row_lines = [document.querySelectorAll('.main__tech-list-item:nth-child(n+5):nth-child(-n+8) .i-bottom')];
    const tech_reveal_items = document.querySelectorAll('.tech-reveal');
    const tech_section = document.querySelector('.main__tech');


    const show = (elements) => {
        gsap.fromTo(elements, { y: 10 }, { duration: 0.4, y: 0, opacity: 1, ease: 'expo', stagger: 0.1 });
        if (isMatchMediaMinWidth('48em')) {
            const tl = gsap.timeline();
            tl.to(first_row_lines, { backgroundColor: 'rgba(254, 211, 103, 0.5)', duration: '0.4', stagger: '0.2' }, "")
                .to(second_row_lines, { backgroundColor: 'rgba(254, 211, 103, 0.5)', duration: '0.4', stagger: '0.2' }, "");
        }
    }

    hide(tech_reveal_items);
    ScrollTrigger.create({
        trigger: tech_section,
        start: 'top 70%',
        onEnter: () => show(tech_reveal_items),
        once: true,
        // markers: true,
    })
}

// Animation for Featured projects section

// Animation for Other projects section

// Animation for Contact section
const contact_animation = () => {
    const contact_reveal_items = document.querySelectorAll('.contact-reveal');
    const contact_section = document.getElementById('contact-me');

    const show = (elements) => {
        gsap.fromTo(elements, { y: 20 }, { duration: 0.8, y: 0, opacity: 1, ease: 'expo', stagger: 0.2 });
    }

    hide(contact_reveal_items);
    ScrollTrigger.create({
        trigger: contact_section,
        start: 'top 70%',
        onEnter: () => show(contact_reveal_items),
        once: true,
        // markers: true,
    });
}
