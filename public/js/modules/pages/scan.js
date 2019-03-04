import DOM from './DOM.js';

class Scan extends DOM {
    constructor() {
        super();

        this.id = '#scan-page';
        this.contentId = '#scan-page-content';

        DOM.registerPage(this.id);

    }

    template() {
        return undefined;
    }

    async shown() {
        this.display();
        this.initScanner();
        console.log('scan shown');
        try {
            // this.data.countries = await apiProxy.getAll();
        } catch (e) {
            console.log(e);
        }
    }

    hid(){
        Quagga.stop();
    }

    initScanner(){
        Quagga.init({
            inputStream : {
                name : "Live",
                type : "LiveStream",
                target: document.querySelector('#interactive')    // Or '#yourElement' (optional)
            },
            decoder : {
                readers : ["code_128_reader"]
            }
        }, err => {
            if (err) {
                console.log(err);
                return
            }
            console.log("Initialization finished. Ready to start");
            Quagga.start();
        });
    }
}

export default new Scan();