var previousSlide = 0;
var slides;
var intSlidesCount;
var header = document.createElement("div");
header.id = "header";
var imgcontainer = document.createElement("div");
imgcontainer.id = "imgcontainer";
imgcontainer.style.cssText = `height: 100%"`;
var image = document.createElement("img");
image.style.cssText = `height: 8vh; width: auto;`;
image.src = "./images/dhbwlogo.svg";
imgcontainer.appendChild(image);
header.appendChild(imgcontainer);
document.body.prepend(header);
var titlecontainer = document.createElement("div");
titlecontainer.id = "titlecontainer";
titlecontainer.style.cssText = `
overflow: hidden;
display: flex;
align-items: center;
flex-direction: row;
padding: 1em;
z-index: 488;
color: white;
width: 100%;
max-height: 10vh;
min-height: 10vh;
gap: 3em;`;
header.appendChild(titlecontainer);
Reveal.on("ready", (event) => {
  slides = Reveal.getHorizontalSlides()
    .filter((slide) => slide.hasAttribute("title"))
    .map((slide) => ({
      name: slide.attributes["title"].value,
      childs: [],
    }));
  contentSlidesLength = Reveal.getHorizontalSlides().length - slides.length;
  Reveal.getVerticalSlides().forEach((slide) => {
    slides.forEach((s) => {
      if (slide.parentElement.attributes["title"] == null) return;
      if (s.name === slide.parentElement.attributes["title"].value) {
        s.childs.push(slide);
      }
    });
  });
  generateAgenda(event.currentSlide);
  updateAgenda(event.indexh - contentSlidesLength, event.indexv);
  Reveal.on("slidechanged", (event) => {
    console.log(event.indexh, event.indexv);
    changeDisplay();
    updateAgenda(event.indexh - contentSlidesLength, event.indexv);
    scrollTitle(event.indexh);
    previousSlide++;
  });
});

function updateAgenda(currentSlide, currentSubslide) {
  if (currentSlide < 0) return;
  const slideElement = titlecontainer.children[currentSlide];

  // reset title focus
  titlecontainer.children.forEach((child) => {
    child.querySelector(".header-title").classList.remove("focus");
    child.querySelector(".bulletpoint").classList.remove("focus");
  });

  // add focus to active title
  slideElement.querySelector(".header-title").classList.add("focus");
  slideElement.querySelector(".bulletpoint").classList.add("focus");

  // reset subtitle focus
  document.querySelectorAll(".header-subtitle").forEach((subtitle) => {
    subtitle.style.display = "none";
  });

  // check for subtitles
  if (!slideElement.querySelector(".header-subtitle")) return;

  // add focus to active subtitle
  slideElement.querySelectorAll(".header-subtitle")[
    currentSubslide
  ].style.display = "flex";

  console.log(titlecontainer.children);
  console.log(slides);
  console.log(currentSlide);
}

function changeDisplay() {
  if (!Reveal.getCurrentSlide().hasAttribute("title")) {
    header.style.visibility = "hidden";
    return;
  }
  header.style.visibility = "visible";
}

function generateAgenda(currentSlide) {
  console.log(currentSlide);
  slides.forEach((slide) => {
    var newTitle = document.createElement("div");
    var dynamicWidth;
    if (slides.length < 4) {
      dynamicWidth = 85 / slides.length + "vw";
    } else {
      dynamicWidth = 85 / 6 + "vw";
    }
    newTitle.style.cssText = `display: flex; 
      justify-content:center; 
      flex-direction: column; 
      gap: 0.5em; align-items: 
      center; min-width: ${dynamicWidth}`;
    newTitle.innerHTML += `
    <div style="display: flex; align-items: center; justify-content: center;  gap: 0.5em;">
    <svg xmlns="http://www.w3.org/2000/svg" class="bulletpoint bi bi-circle" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
      </svg>
      <a class="header-title">${slide.name}</a>
    </div>
    `;

    slide.childs.forEach((x) => {
      var subslideName = x.attributes["title"].value;
      // console.log(subslideName );
      var margin =
        (newTitle.offsetWidth - newTitle.children[0].offsetWidth) / 2;
      newTitle.innerHTML += `
					<a class="header-subtitle" style="margin-left: calc(${margin}px + 0.5vw + 0.4vw)">${subslideName}</a>`;
    });
    titlecontainer.appendChild(newTitle);
  });
}
function scrollTitle(currentSlide) {}
