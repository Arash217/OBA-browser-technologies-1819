import DOM from './DOM.js';

class Home extends DOM {
    constructor() {
        super();

        this.id = '#home-page';
        this.contentId = '#home-page-content';

        DOM.registerPage(this.id);
    }

    template() {
        return undefined;
    }

    shown() {
        this.display();
    }

    hid(){}
}

export default new Home();