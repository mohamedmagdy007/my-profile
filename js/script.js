let tabs = document.querySelectorAll(".nav-list li");
let tabsArray = Array.from(tabs);
let skills = document.querySelectorAll(".iconSkills");
let themeToggler = document.querySelector(".theme-toggler");
let skillsTriggered = false;

// ── Nav click: smooth scroll to section ─────────────────
tabsArray.forEach((ele) => {
  ele.addEventListener("click", function () {
    const id = this.dataset.cont;
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      history.pushState(null, "", "#" + id);
    }
  });
});

// ── Theme toggle ─────────────────────────────────────────
themeToggler.addEventListener("click", () => {
  themeToggler.children[0].classList.toggle("fa-sun");
  themeToggler.children[0].classList.toggle("fa-moon");
  document.body.classList.toggle("body-theme-light-mode");
});

// ── IntersectionObserver: active nav + URL hash ──────────
const sections = ["home", "about", "work", "contact"];

const observerOptions = {
  root: null,
  rootMargin: "-40% 0px -55% 0px",
  threshold: 0,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;

    // Update URL hash silently
    history.replaceState(null, "", "#" + id);

    // Update active nav item
    tabsArray.forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.cont === id);
    });

    // Trigger skills animation when about section enters
    if (id === "about" && !skillsTriggered) {
      skillsTriggered = true;
      [...skills].forEach((el, i) => {
        setTimeout(() => el.classList.add("iconSkillShow"), i * 80);
      });
    }
  });
}, observerOptions);

sections.forEach((id) => {
  const el = document.getElementById(id);
  if (el) observer.observe(el);
});

// ── Handle initial hash on load ──────────────────────────
function scrollToHash() {
  const hash = location.hash.replace("#", "");
  if (hash) {
    const el = document.getElementById(hash);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 200);
  }
}

// ── Data load ────────────────────────────────────────────
(async function () {
  const data = await fetch("js/data.json");
  const { home, expreience, education, myWork } = await data.json();
  homeContent(home);
  aboutMeContent(expreience, education);
  myWorkContent(myWork);
  document.querySelector(".loader").classList.add("loader-hide");
  document.body.style.overflowY = "auto";
  scrollToHash();
})();

// HomeContent
function homeContent(home) {
  const html = `<div class="col-12 col-lg-6 home">
 <p>${home.fistWord}</p>
 <p><span class="name"></span>&nbsp;</p>
 <p>${home.jobtitle}</p>
 <p>${home.description}</p>
 <a href="pdf/mohamed-magdy-CV.pdf" class="btn-cv" download>
   ${home.download} <i class="fa-solid fa-cloud-arrow-down"></i>
 </a>
</div>`;
  document
    .querySelector(".pagehome .row")
    .insertAdjacentHTML("afterbegin", html);
  new Typed(".name", {
    strings: ["Mohamed Magdy"],
    typeSpeed: 35,
    loop: false,
  });
}
//aboutMeContent
function aboutMeContent(expreience, education) {
  let expHtml = '<div class="exper"><h2>EXPERIENCE</h2>';
  expreience.forEach(({ title, company, period, type, tasks }, idx) => {
    const taskItems = tasks.map((t) => `<li>${t}</li>`).join("");
    expHtml += `
      <div class="job-entry collapsed" data-job="${idx}">
        <div class="job-header">
          <div class="job-info">
            <p class="job-title">${title} <strong>${company}</strong></p>
            <span class="job-period">${period}</span>
            ${type ? `<em class="job-type">${type}</em>` : ""}
          </div>
          <button class="job-toggle" aria-expanded="false" aria-label="Toggle job details">
            <i class="fa-solid fa-chevron-down"></i>
          </button>
        </div>
        <ul class="task-list">${taskItems}</ul>
      </div>`;
  });
  expHtml += "</div>";

  const eduHtml = `
  <h2>EDUCATION</h2>
  <p>${education.educ1}<br /><span>${education.date1}</span></p>
  <p>${education.educ2}<br /><span>${education.date2}</span></p>
  <h2>PERSONAL DATA</h2>
  <div class="d-flex">
    <p class="me-2"><span class="fa-solid fa-location-dot"></span> Alexandria, Egypt</p>
    <p class="ms-2"><span class="fa-brands fa-whatsapp"></span> 01280271887</p>
  </div>
  <p><span>Date of Birth:</span> 22/3/1998</p>`;

  document
    .querySelector(".edu")
    .insertAdjacentHTML("afterbegin", expHtml + eduHtml);

  // Add collapse handlers
  document.querySelectorAll(".job-toggle").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const jobEntry = this.closest(".job-entry");
      const isExpanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", !isExpanded);
      jobEntry.classList.toggle("collapsed");
    });
  });
}
function myWorkContent(myWork) {
  let html = "";
  myWork.forEach(({ img, title, github, preview }) => {
    html += `<div class="card-projects">
      <img src="${img}" alt="${title} project screenshot" loading="lazy" />
      <div class="overlay">
        <h3>${title}</h3>
        <div class="icons">
          <a href="${github}" aria-label="GitHub repo for ${title}" class="fa-brands fa-github"></a>
          <a href="${preview}" aria-label="Live preview of ${title}" class="fas fa-external-link-alt"></a>
        </div>
      </div>
    </div>`;
  });
  document
    .querySelector(".card-container")
    .insertAdjacentHTML("afterbegin", html);
}
