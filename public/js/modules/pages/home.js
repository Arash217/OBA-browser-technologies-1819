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

    async shown() {
        this.display();
        console.log('home shown');
        try {
            // this.data.countries = await apiProxy.getAll();
        } catch (e) {
            console.log(e);
        } finally {
        }
    }

    hid(){

    }
}

export default new Home();