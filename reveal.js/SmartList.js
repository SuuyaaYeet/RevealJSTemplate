class SmartList extends HTMLElement {  
    constructor() {       
        super();


        this.tmp = "";
        this.append("<ul>");

        this.childNodes.forEach((item)=>
         {
           
            if(item.innerHTML == null|| item.innerHTML.trim() === '') return        
            if(!item) return;

            if(this.attributes['fade'])
            this.append(`<li class="fragment">`);
            else
                this.append("<li>");
            this.append(item.outerHTML);
            this.append("</li>");                   
          });

          this.append("<ul>");
          
          this.innerHTML = "";
          this.innerHTML = this.tmp;

    }

    append(html)
    {      
        this.tmp += html;
    }
}

customElements.define("smart-list", SmartList); // (2)