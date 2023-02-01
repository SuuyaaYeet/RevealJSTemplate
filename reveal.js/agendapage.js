

class Agenda extends HTMLElement {  
    constructor() {       
        super();

        this.svgs = [];   
        this.tmp = ""; 
        this.childNodes.forEach((item)=>
         {
           
            if(item.innerHTML == null|| item.innerHTML.trim() === '') return
            console.log(item);
            if(item)
            var cln = item.cloneNode(true);            
            this.svgs.push(cln);
           
          });

        this.innerHTML = '';
    
        Reveal.on("ready", (event) => {
             this.slides = Reveal.getHorizontalSlides().filter((slide) => slide.hasAttribute("title"));
             this.init();             
        });     

      }

    append(html)
    {      
       this.tmp += html;
    }

    init() {
        this.append(`<table style="font-size: 0.7em; border: none; margin-top: 3em;" >
        <tbody>
            <tr>`)
          

            this.svgs.forEach(element => {
                this.append(`<th>`);
                this.append(element.outerHTML);
                this.append(`</th>`);
            });

        this.append(`</tr>
        <tr>	`);

        this.slides.forEach(element => {
            this.append(`<th>`);
            this.append(`<center>${element.attributes["title"].value}</center>`);
            this.append(`</th>`);
        });

        this.append(`</tr>
        </tbody>
    </table>`);       
        this.innerHTML = this.tmp;
    }
}
customElements.define("agenda-view", Agenda); // (2)