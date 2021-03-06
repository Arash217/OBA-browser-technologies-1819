/* Used classes for building and rendering pages because inheritance was needed.
 * Could have used functions for inheritance but classes are cleaner */

class DOM {

    static pages = [];

    static registerPage(id) {
        this.pages.push(id);
    }

    static displayPage(id) {
        DOM.pages.forEach(page => {
            const element = DOM.getElement(page);
            id === page ? element.classList.remove('invisible') : element.classList.add('invisible');
        });
    }

    display(){
        DOM.displayPage(this.id);
    }

    initEventListeners() {
        if (!this.initialisedListeners && this.eventListeners && this.eventListeners.length > 0) {
            const pageElement = DOM.getElement(this.id);
            this.eventListeners.forEach(eventListener => eventListener(pageElement));
            this.initialisedListeners = true;
        }
    }

    static removeChildren(element){
        while (element.firstChild) {
            element.firstChild.remove();
        }
    }

    static getElement(selector){
        return document.querySelector(selector);
    }

    static renderTemplate(data, template, toElement){
        const element = DOM.getElement(toElement);
        const compiledTemplate = Handlebars.compile(template);
        DOM.removeChildren(element);
        element.insertAdjacentHTML('beforeend', compiledTemplate(data));
    }

    static displayAndRenderTemplate(data, id, templateId, contentId) {
        DOM.displayPage(id);
        DOM.renderTemplate(data, templateId, contentId);
    }

    render(data) {
        this.data = {...this.data, ...data};
        const handleBarsTemplate = this.template();
        if (handleBarsTemplate){
            DOM.displayAndRenderTemplate(this.data, this.id, this.template(), this.contentId);
        } else {
            DOM.displayPage(this.id);
        }
        this.initEventListeners();
    }

    renderContent(data) {
        DOM.renderTemplate(data, this.template(), this.contentId);
    }
}

export default DOM;