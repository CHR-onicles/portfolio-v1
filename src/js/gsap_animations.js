gsap.registerPlugin(CSSRulePlugin, ScrollTrigger);

export const master = () => {
    let master_tl = gsap.timeline();
    master_tl.add(header_animation())
        .add(about_me_animation) // adding it here to prevent time delay (maybe not elegant)

    if (window.matchMedia('(min-width: 62em)').matches) { // >= 992px
        master_tl.add(hero_animation, ">2");
    } else master_tl.add(hero_animation, ">1");
    master_tl.add(footer_animation, ">2")
}

// animation for nav items
const header_animation = () => {
    const navbar_logo = document.querySelector('.header__navbar-logo');
    const navbar_toggle_btn = document.querySelector('.header__navbar-toggle-btn');
    const nav_list_items = [document.querySelectorAll('.header__navbar-list-item')];

    if (window.matchMedia('(max-width: 61.9375em)').matches) { // < 992px
        let small_nav_tl = gsap.timeline({ defaults: { duration: .8 } });
        small_nav_tl.from(navbar_logo, { opacity: 0})
            .from(navbar_toggle_btn, { opacity: 0 }, '')
    } else {
        let big_nav_tl = gsap.timeline();
        big_nav_tl.from(navbar_logo, { x: -50, duration: 1, ease: 'bounce' })
            .from(nav_list_items, { opacity: 0, x: -25, stagger: .15, duration: .25, ease: 'power1' })
    }
}

//animation for hero items
const hero_animation = () => {
    const hero_items = [
        document.querySelector('.hero__intro-text'),
        document.querySelector('.hero__author-name'),
        document.querySelector('.hero__author-work'),
        document.querySelector('.hero__short-desc')
    ]
    let hero_tl = gsap.timeline();
    hero_tl.to(hero_items, { opacity: 1, duration: .4, y: 30, stagger: .2, ease: 'power1' })
}

// animation for sticky footer
const footer_animation = () => {
    if (window.matchMedia('(min-width: 62em)').matches) { // >= 992px
        // CSSRulePlugin does not work well with pseudo elements/ Sass (idk yet) 
        // after hours of trying and checking online...so I created html elements to replace the pseudos
        const left_bar = document.querySelector('.footer__social-list-left-bar');
        const right_bar = document.querySelector('.footer__author-email-right-bar');
        const social_icons = document.querySelectorAll('.footer__social-list-item');
        const author_email = document.querySelector('.footer__author-email > a');

        let footer_tl = gsap.timeline();
        footer_tl.to(left_bar, { scaleY: 1, duration: .5, ease: 'Power2.inOut' })
            .to(right_bar, { scaleY: 1, duration: .5, ease: 'Power2.inOut' }, '')
            .to(social_icons, { opacity: 1, y: 0, duration: .3, stagger: -.1 })
            .to(author_email, { opacity: 1, duration: .5, y: 0 }, '-=.3')

    }
}

// animation for about me section
const about_me_animation = () => {
    const hide = (elem) => {
        /* Helper function to make sure elements start animation completely invisible*/
        gsap.set(elem, { opacity: 0 });
    }

    if (window.matchMedia('(min-width: 62em').matches) { // >= 992px
        const first_child = document.querySelector('.main__about-text-content');
        const second_child = document.querySelector('.image-reveal');
        hide(first_child);
        hide(second_child);
        let about_tl = gsap.timeline();
        ScrollTrigger.create({
            trigger: '.section-reveal',
            start: 'top: 70%',
            onEnter: () => {
                about_tl.fromTo(first_child, { x: -20, y: 35 }, { duration: 1.5, x: 0, y: 0, ease: 'expo', opacity: 1 })
                    .fromTo(second_child, { x: 40, scale: 0 }, { duration: 2, ease: 'expo', opacity: 1, x: 0, scale: 1 }, '-=1')
            },
            once: true,
        })
    } else {
        // For text part
        gsap.utils.toArray(['.about-reveal', '.tech-reveal']).forEach(item => {
            const show = (elem) => {
                const values = [-30, 30]
                gsap.fromTo(elem, { opacity: 0, x: values[Math.floor(Math.random() * 2)] }, { duration: 1.5, x: 0, opacity: 1, ease: 'expo', stagger: .5 })
            }

            hide(item);

            ScrollTrigger.create({
                trigger: item,
                start: 'top 80%',
                onEnter: () => show(item),
                once: true,
                // markers: true,
            })
        })

        // For image part
        hide('.image-reveal')
        ScrollTrigger.create({
            trigger: '.image-reveal',
            start: 'top: 65%',
            onEnter: () => gsap.fromTo('.image-reveal', { rotation: 20 }, { opacity: 1, duration: 1, rotation: 0, ease: 'linear' }),
            once: true,
        })
    }
}