import DOM from './DOM.js';
import * as api from '../api.js';

class Details extends DOM {
    constructor() {
        super();

        this.id = '#details-page';
        this.contentId = '#details-page-content';

        DOM.registerPage(this.id);

        this.eventListeners = [
            element => {
                const clickEventHandler = ({target}) => {
                    if (target.nodeName === 'BUTTON') {
                        const audio = document.querySelector(`audio[id="${target.id}"]`);
                        if (audio.duration > 0 && !audio.paused) {
                            audio.pause();
                            audio.currentTime = 0;
                            target.classList.remove('stop');
                            target.classList.add('play');
                        } else {
                            audio.play();
                            target.classList.remove('play');
                            target.classList.add('stop');
                        }
                    }
                };

                element.addEventListener('click', clickEventHandler);
            },
        ]
    }

    template() {
        return `
            {{#if this.errorMessage}}
                <header>
                    {{ this.errorMessage }}
                </header>
            {{else}}
                <header>
                    {{ this.album.AlbumTitle }}
                </header>
                <div id="tracks">
                    {{#each this.tracks}}
                        <article>
                            <div id="player-container">
                                <audio id="{{this.id}}" src="{{this.preview_url}}"></audio>
                                <img src="{{../this.album.Cover}}" alt="{{../this.album.AlbumTitle}}">
                                <div id="player">
                                    <button id="{{this.id}}" class="play"></button>
                                </div>
                            </div>
                            <p>{{this.name}}</p>
                        </article>
                    {{/each}}
                </div>
            {{/if}}
        `;
    }

    async shown(code) {
        this.initEventListeners();
        this.display();

        try {
            const res = await api.getTracksByAlbumISBN(code);

            this.data = {
                albumAndTrack: res
            };

            this.renderContent(res);
        } catch (e) {
            this.renderContent({
                errorMessage: 'Album niet gevonden...'
            })
        }
    }

    hid() {}
}

export default new Details();