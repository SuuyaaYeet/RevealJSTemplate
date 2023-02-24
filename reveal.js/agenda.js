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
  intSlidesCount = Reveal.getHorizontalSlides().length - slides.length;
  console.log(intSlidesCount);
  Reveal.getVerticalSlides().forEach((slide) => {
    slides.forEach((s) => {
      if (slide.parentElement.attributes["title"] == null) return;
      if (s.name === slide.parentElement.attributes["title"].value) {
        s.childs.push(slide);
      }
    });
  });

  // console.log(slides);
  showAgenda();
  Reveal.on("slidechanged", (event) => {
    showAgenda();
    scrollTitle(event.indexh);
    previousSlide++;
  });
});

function showAgenda() {
  // titlecontainer.innerHTML = "";
  while (titlecontainer.children.length > 0) {
    // console.log(titlecontainer, "removing");
    titlecontainer.removeChild(titlecontainer.lastChild);
  }

  if (!Reveal.getCurrentSlide().hasAttribute("title")) {
    header.style.visibility = "hidden";
    return;
  }
  header.style.visibility = "visible";

  var currentSlideTitle = Reveal.getCurrentSlide().attributes["title"].value;
  // console.log(Reveal.getCurrentSlide());
  var addedNames = [];
  // var row = titlecontainer.insertRow(0);
  slides.forEach((slide) => {
    // var cell = row.insertCell(0);
    //cell.style.width = "20em";
    if (addedNames.includes(slide.name)) return;
    addedNames.push(slide.name);

    var newTitle = document.createElement("div");
    // var dynamicWidth = 85 / slides.length + "vw";
    var dynamicWidth = 85 / 5 + "vw";
    // if (slides.length < 4) {
    //   dynamicWidth = 85 / slides.length + "vw";
    // } else {
    //   dynamicWidth = 85 / 4 + "vw";
    // }
    newTitle.style.cssText = `display: flex; 
      justify-content:center; 
      flex-direction: column; 
      gap: 0.5em; align-items: 
      center; min-width: ${dynamicWidth}`;
    titlecontainer.appendChild(newTitle);

    if (
      slide.name === currentSlideTitle ||
      slide.childs.some(
        (c) => c.attributes["title"].value === currentSlideTitle && 
        c.parentElement.attributes["title"].value === currentParentSlideTitle //Sonst können Unter-Sections nicht gleich heißen
      )
    ) {
      newTitle.innerHTML = `
			<div style="display: flex; align-items: center; justify-content: center;  gap: 0.5em;">
      <svg xmlns="http://www.w3.org/2000/svg" width="1vh"  height="1vh"  fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="8"/>
    </svg>
    <a style="color: white; font-size: 2.9vh;">${slide.name}</a>
      </div>
      `;

      slide.childs.forEach((x) => {
        var subslideName = x.attributes["title"].value;
        var margin =
          (newTitle.offsetWidth - newTitle.children[0].offsetWidth) / 2;
        // console.log(margin);
        // console.log(margin);
        if (addedNames.includes(subslideName)) return;
        addedNames.push(subslideName);

        if (subslideName === currentSlideTitle) {
          /*** JONA ***/
          newTitle.innerHTML += `
					<a style="margin-bottom: 0.2vh; font-size: 1.8vh; align-self: flex-start; margin-left: calc(${margin}px + 0.5vw + 0.4vw)">${subslideName}</a>`;
          // <div style="display: flex; 
          // justify-content:center; 
          // flex-direction: row; 
          // gap: 0.5em; align-items: 
          // center; flex-grow: 1; align-self: flex-end;">
        }
        // <svg xmlns="http://www.w3.org/2000/svg" width="1vh" height="1vh" fill="currentColor" class="bi bi-square-fill" viewBox="0 0 16 16">
        // 	  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/>
        // 	</svg>
        /*	else{
					cell.innerHTML+=`<br> <div style="line-height:150%;"><br></div>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" style="margin-left: 8em"   height="16" fill="currentColor" class="bi bi-square" viewBox="0 0 16 16">
  					<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
					</svg>
						  <a style="color: grey; font-size: 1.6em;  padding: 0.5em;">${subslideName}</a>`;	
				}*/
      });
    } else {
      /*** JONA ***/
      newTitle.innerHTML += `
      <div style="display: flex; align-items: center; justify-content: center;  gap: 0.5em;">
      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
				<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
		  	</svg>
		  	<a style="color: grey; font-size: 2vh;">${slide.name}</a>
      </div>
			`;
      titlecontainer.appendChild(newTitle);
    }
  });
}

var scrollAmount = document.body.getBoundingClientRect().width / 5;

function scrollTitle(currentSlide) {
  var lastScroll = titlecontainer - 4 * scrollAmount;
  console.log(
    titlecontainer.scrollWidth,
    scrollAmount,
    scrollAmount * (slides.length - 1),
    titlecontainer.scrollWidth - titlecontainer.scrollLeft
  );
  if (previousSlide > currentSlide) scrollAmount = scrollAmount * -1;
  console.log(scurrentSlide);
  if (currentSlide - intSlidesCount < 4 && scrollAmount > 0) return;
  previousSlide = currentSlide;

  if (currentSlide - intSlidesCount == slides.length - 1) {
    titlecontainer.scroll({
      top: 0,
      left:
        titlecontainer.scrollWidth -
        titlecontainer.scrollLeft -
        titlecontainer.clientWidth /* scrollAmount * (slides.length - 1)*/,
      behavior: "smooth",
    });
  } else {
    titlecontainer.scroll({ top: 0, left: scrollAmount, behavior: "smooth" });
  }
}
