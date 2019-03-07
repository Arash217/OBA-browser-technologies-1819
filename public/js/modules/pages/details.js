import DOM from './DOM.js';
import * as api from '../api.js';
import {xmlToJson} from "../utils.js";

class Details extends DOM {
    constructor() {
        super();

        this.id = '#details-page';
        this.contentId = '#details-page-content';

        DOM.registerPage(this.id);

        this.eventListeners = [
            element => {
                const clickEventHandler = ({target}) => {
                    if (target.classList.contains('track')) {
                        const audio = target.querySelector('audio');
                        const playerButton = target.querySelector('#player-button');

                        if (audio.duration > 0 && !audio.paused) {
                            audio.pause();
                            audio.currentTime = 0;
                            playerButton.classList.remove('stop-button');
                            playerButton.classList.add('play-button');
                        } else {
                            audio.play();
                            playerButton.classList.remove('play-button');
                            playerButton.classList.add('stop-button');
                        }

                    }
                };

                element.addEventListener('click', clickEventHandler);
            },
        ]
    }

    template() {
        return `
            <span class="album-title">
                {{ this.album.AlbumTitle }}
            </span>
            <div id="tracks">
                {{#each this.tracks}}
                    <div id="{{this.id}}" class="track">
                         <div class="album">
                            <div class="player-container">
                                <audio class="audio" src="{{this.preview_url}}"></audio>
                                <img class="album-image" src="{{../this.album.Cover}}" alt="{{../this.album.AlbumTitle}}">
                                <div id="player">
                                    <div id="player-button" class="play-button"></div>
                                </div>
                            </div>
                            <span>{{this.name}}</span>
                        </div>
                    </div>
                {{/each}}
            </div>
        `;
    }

    async shown(code) {
        this.initEventListeners();
        try {
            this.display();

            const res = await api.getTracksByAlbumISBN(code);

            this.data = {
                albumAndTrack: res
            };

            this.renderContent(res);
        } catch (e) {
            console.log(e.message);
        }
    }

    hid() {

    }
}

export default new Details();