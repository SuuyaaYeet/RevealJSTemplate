var header = document.createElement("div");
header.innerHTML = `  
<header id="header" style="display: flex; align-items: center; position:fixed; flex-direction: row; padding:1em; z-index:488; color: white; width: 100%; max-height: 10vh; min-height: 10vh; gap: 3em; background: #1F1F1F">	
		<div id="imgcontainer" style="height: 100%" ><img style="height: 8vh; width: auto;" src="./images/dhbwlogo.svg"/></div>
    
</header>	
`;
{
  /* <div id="headercontent" style="height: 100%" display: flex; align-items: center; justify-content: center;></div> */
}
document.body.prepend(header);

Reveal.on("ready", (event) => {
  showAgenda();
  Reveal.on("slidechanged", (event) => {
    showAgenda();
  });
});

function showAgenda() {
  var headerElement = document.getElementById("header");
  // headerElement.innerHTML = "";
  while (headerElement.children.length > 1) {
    // console.log(headerElement, "removing");
    headerElement.removeChild(headerElement.lastChild);
  }

  if (!Reveal.getCurrentSlide().hasAttribute("title")) {
    header.style.visibility = "hidden";
    return;
  }
  header.style.visibility = "visible";

  var slides = Reveal.getHorizontalSlides()
    .filter((slide) => slide.hasAttribute("title"))
    .map((slide) => ({
      name: slide.attributes["title"].value,
      childs: [],
    }));

  Reveal.getVerticalSlides().forEach((slide) => {
    slides.forEach((s) => {
      if (slide.parentElement.attributes["title"] == null) return;
      if (s.name === slide.parentElement.attributes["title"].value) {
        s.childs.push(slide);
      }
    });
  });

  var currentSlideTitle = Reveal.getCurrentSlide().attributes["title"].value;

  var addedNames = [];
  // var row = headerElement.insertRow(0);
  slides.forEach((slide) => {
    // var cell = row.insertCell(0);
    //cell.style.width = "20em";
    if (addedNames.includes(slide.name)) return;
    addedNames.push(slide.name);

    var newTitle = document.createElement("div");
    var dynamicWidth = 85 / slides.length + "vw";
    newTitle.style.cssText = `display: flex; 
      justify-content:center; 
      flex-direction: column; 
      gap: 0.5em; align-items: 
      center; min-width: ${dynamicWidth}`;
    headerElement.appendChild(newTitle);

    if (
      slide.name === currentSlideTitle ||
      slide.childs.some(
        (c) => c.attributes["title"].value === currentSlideTitle
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
        var margin = (newTitle.offsetWidth - newTitle.children[0].offsetWidth) / 2;
        console.log(margin);
        console.log(margin);
        if (addedNames.includes(subslideName)) return;
        addedNames.push(subslideName);

        if (subslideName === currentSlideTitle) {
          /*** JONA ***/
          newTitle.innerHTML += `
					<a style="color: white; font-size: 1.8vh; align-self: flex-start; margin-left: calc(${margin}px + 0.5vw + 0.4vw)">${subslideName}</a>`;
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
      headerElement.appendChild(newTitle);
    }
  });
}
