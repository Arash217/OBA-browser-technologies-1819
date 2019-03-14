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
                    if (target.id === 'player-container') {
                        const audio = target.querySelector('audio');
                        const playerButton = target.querySelector('button');

                        if (audio.duration > 0 && !audio.paused) {
                            audio.pause();
                            audio.currentTime = 0;
                            playerButton.classList.remove('stop');
                            playerButton.classList.add('play');
                        } else {
                            audio.play();
                            playerButton.classList.remove('play');
                            playerButton.classList.add('stop');
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
                        <article id="{{this.id}}">
                            <div id="player-container">
                                <audio src="{{this.preview_url}}"></audio>
                                <img src="{{../this.album.Cover}}" alt="{{../this.album.AlbumTitle}}">
                                <div id="player">
                                    <button class="play"></button>
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