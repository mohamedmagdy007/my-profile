let tabs = document.querySelectorAll(".nav-list li");
let tabsArray = Array.from(tabs);
let divs = document.querySelectorAll(".contents > div");
let skills = document.querySelectorAll(".iconSkills");
// console.log(skills);

let divsArray = Array.from(divs);
let themeToggler = document.querySelector(".theme-toggler");
// let typed = new Typed(".name", {
//   strings: ["Mohamed Magdy"],
//   typeSpeed: 30,
//   loop: false,
// });
tabsArray.forEach((ele) => {
  ele.addEventListener("click", function (e) {
    tabsArray.forEach((ele) => {
      ele.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    if (this.dataset.cont === ".pageMe") {
      [...skills].forEach((elems, index) => {
        setTimeout(() => {
          elems.classList.add("iconSkillShow");
        }, index * 100);
      });
    } else {
      [...skills].forEach((elems) => {
        elems.classList.remove("iconSkillShow");
      });
    }
    document.querySelector(".name").textContent = "";
    if (this.dataset.cont === ".pagehome") {
      new Typed(".name", {
        strings: ["Mohamed Magdy"],
        typeSpeed: 30,
        loop: false,
      });
    }

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
// var typed = new Typed(".name", {
//   strings: ["Mohamed Magdy"],
//   typeSpeed: 30,
// });
(async function () {
  const data = await fetch("js/data.json");

  const { home } = await data.json();
  // homeContent
  (async function () {
    const html = `<div class="col-12 col-lg-6 home">
   <p>${home.fistWord}</p>
   <p><span class="name"></span>&nbsp;</p>
   <p>${home.jobtitle}</p>
   <p>
    ${home.description}
   </p>
   <a href="pdf/mohamed-magdy-CV.pdf" class="btn-cv" download>
     ${home.download} <i class="fa-solid fa-cloud-arrow-down"></i>
   </a>
  </div>`;
    document
      .querySelector(".pagehome .row")
      .insertAdjacentHTML("afterbegin", html);
    let typed = new Typed(".name", {
      strings: ["Mohamed Magdy"],
      typeSpeed: 30,
      loop: false,
    });
  })();
})();
