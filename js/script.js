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

  const { home, expreience, education, myWork } = await data.json();
  homeContent(home);
  aboutMeContent(expreience, education);
  myWorkContent(myWork);
  document.querySelector(".loader").classList.add("loader-hide");
  document.body.style.overflowY = "auto";
})();

// HomeContent
function homeContent(home) {
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
}
//aboutMeContent
function aboutMeContent(expreience, education) {
  const html = `  <div class="exper">
  <h2>EXPERIENCE</h2>
  <p>
  ${expreience.job} <br />
    <span>${expreience.date}</span>
  </p>
  </div>
  <h2>EDUCATION</h2>
  <p>
  ${education.educ1} <br />
  <span>${education.date1}</span>
  </p>
  <p>
  ${education.educ2}
  <br />
  <span>${education.date2}</span>
  </p>
  <h2>PERSONAL DATA</h2>
  <div class="d-flex">
  <p  class="me-2"><span class="fa-solid fa-location-dot"></span> Alexandria, Egypt </p>  
  <p  class="ms-2"><span class="fa-brands fa-whatsapp"></span> 01280271887</p>
  </div>
  <p><span>Date of Birth:</span> 22/3/1998</p>
`;
  document.querySelector(".edu").insertAdjacentHTML("afterbegin", html);
}
function myWorkContent(myWork) {
  let html = "";
  myWork.forEach(({ img, title, github, preview }) => {
    // console.log(items);
    html += `<div class="card-projects">
      <img src=${img} alt="e-commerce_project" />
      <div class="overlay">
        <h3>${title}</h3>
        <div class="icons">
          <a href=${github} class="fa-brands fa-github"></a>
          <a href=${preview} class="fas fa-search"></a>
        </div>
      </div>
    </div>`;
  });
  document
    .querySelector(".card-container")
    .insertAdjacentHTML("afterbegin", html);
}
