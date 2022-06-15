import { master, techGridAnimation } from "./gsap_animations";

const body = document.getElementById("body");
const nav_toggle_btn = document.querySelector(".header__navbar-toggle-btn");
const header_btns = document.querySelectorAll(".header__navbar-list-item");
const sidebar = document.querySelector(".header__navbar-list-wrapper");
const toggleable_items = [sidebar, body, nav_toggle_btn];
const preloader = document.querySelector(".preloader");
const icon_colors = ['#3776ab', '#e34f26', '#1572b6', '#563d7c', '#c69', '#db7093', '#f7df1e', '#61dafb', '#393', '#47a248', '#4479a1', '#007acc']; // They are in order of appearance of icons, so do not mess with arrangement!
const tech_items = document.querySelectorAll('.main__tech-list-item');

window.addEventListener("load", _ => {
  setTimeout(_ => {
    preloader.classList.add("disappear");
    master();
  }, 0); // todo: increase this later
});

nav_toggle_btn.addEventListener("click", () => {
  toggleable_items.map(item => item.classList.toggle("active"));
});

header_btns.forEach(btn => {
  btn.addEventListener('click', () => toggleable_items.map(item => item.classList.remove('active')))
})


tech_items.forEach((item, index) => {
  item.addEventListener('mouseenter', () => techGridAnimation(icon_colors[index]));
})