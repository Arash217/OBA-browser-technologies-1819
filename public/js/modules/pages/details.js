import DOM from './DOM.js';

class Details extends DOM {
    constructor() {
        super();

        this.id = '#details-page';
        this.contentId = '#details-page-content';

        DOM.registerPage(this.id);
    }

    template() {
        return undefined;
    }

    async shown() {
        this.display();
        console.log('details shown');
        try {
            // const country = await apiProxy.get(code);
            // this.render({country});
        } catch (e) {
            console.log(e);
        }
    }

    hid() {

    }
}

export default new Details();