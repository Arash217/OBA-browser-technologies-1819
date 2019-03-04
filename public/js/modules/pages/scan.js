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
                readers : [
                    "code_128_reader",
                ]
            }
        }, err => {
            if (err) {
                console.log(err);
                return
            }
            console.log("Initialization finished. Ready to start");
            Quagga.start();
        });

        Quagga.onProcessed(function(result) {
            const drawingCtx = Quagga.canvas.ctx.overlay,
                drawingCanvas = Quagga.canvas.dom.overlay;

            if (result) {
                if (result.boxes) {
                    drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                    result.boxes.filter(function (box) {
                        return box !== result.box;
                    }).forEach(function (box) {
                        Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
                    });
                }

                if (result.box) {
                    Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
                }

                if (result.codeResult && result.codeResult.code) {
                    Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
                }
            }
        });

        Quagga.onDetected(result => {
            const code = result.codeResult.code;
            console.log('detected');
            console.log(code);
            alert(code)
        });
    }
}

export default new Scan();