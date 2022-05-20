let tabs = document.querySelectorAll(".nav-list li");
let tabsArray = Array.from(tabs);
let divs = document.querySelectorAll(".contents > div");
let divsArray = Array.from(divs);
let themeToggler = document.querySelector(".theme-toggler");
tabsArray.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    tabsArray.forEach((ele) => {
      ele.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    divsArray.forEach((div) => {
      div.style.display = "none";
    });
    document.querySelector(e.currentTarget.dataset.cont).style.display =
      "block";
  });
});
themeToggler.addEventListener("click", (e) => {
  themeToggler.children[0].classList.toggle("fa-sun");
  themeToggler.children[0].classList.toggle("fa-moon");
  document.body.classList.toggle("body-theme-light-mode");
});
