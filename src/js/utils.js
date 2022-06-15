export const isMatchMediaMinWidth = (width) => {
    return window.matchMedia(`(min-width: ${width})`).matches
}

export const hide = (elem) => {
    // Helper function to make sure elements start animation completely invisible
    gsap.set(elem, { opacity: 0 });
}