import * as router from './modules/router.js';
import home from './modules/pages/home.js';
import scan from './modules/pages/scan.js';
import details from './modules/pages/details.js';

router.init({
        routes: [
            {
                path: 'home',
                page: home
            },
            {
                path: 'scan',
                page: scan
            },
            {
                path: 'details/:code',
                page: details
            }
        ]
    }
);
