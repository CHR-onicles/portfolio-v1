import { master } from "./gsap_animations";

const body = document.getElementById("body");
const nav_toggle_btn = document.querySelector(".header__navbar-toggle-btn");
const header_btns = document.querySelectorAll(".header__navbar-list-item");
const sidebar = document.querySelector(".header__navbar-list-wrapper");
const decor_line = document.querySelector(".decor-line");
const tab_btns = document.querySelectorAll(".main__worked-content-header-list-item-btn");
const work_info = document.querySelectorAll(".main__worked-content-info");
const toggleable_items = [sidebar, body, nav_toggle_btn];
const preloader = document.querySelector(".preloader");

window.addEventListener("load", _ => {
  setTimeout(_ => {
    preloader.classList.add("disappear");
    master();
  }, 1000);
});

nav_toggle_btn.addEventListener("click", () => {
  toggleable_items.map(item => item.classList.toggle("active"));
});

header_btns.forEach(btn => {
  btn.addEventListener('click', () => toggleable_items.map(item => item.classList.remove('active')))
})

decor_line.style.width = `${tab_btns[0].clientWidth}px`;
let media = window.matchMedia("(min-width: 48em)");
function updateDecorLine(media) {
  if (media.matches) {
    decor_line.style.height = `${tab_btns[0].clientHeight + 0.4}px`; // missing .4 pixels
    decor_line.style.width = "4px";
  }
}

updateDecorLine(media);
media.addEventListener("change", updateDecorLine);

work_info[0].classList.add("active");
tab_btns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    decor_line.style.transform = `translateX(${index * 100}%)`;
    if (media.matches) {
      decor_line.style.transform = `translateY(${index * 100}%)`;
    }

    work_info.forEach((work) => {
      work.classList.remove("active");
    });
    work_info[index].classList.add("active");
  });
});