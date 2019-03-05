import DOM from './DOM.js';
import {xmlToJson} from "../utils.js";

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

    shown(code) {
        this.display();

        console.log('na convert')
    }

    hid() {

    }
}

export default new Details();