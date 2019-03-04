import DOM from './pages/DOM.js';

let currentPage = null;

const createDirectorRoutes = routes => {
    const directorRoutes = {};
    routes.forEach(route => {

        const setPage = () => {
            currentPage.hid();
            currentPage = route.page;
        };

        directorRoutes[route.path] = [
            setPage,
            route.page.shown.bind(route.page)
        ];
    });
    return directorRoutes;
};

export const init = routes => {
    const directorRoutes = createDirectorRoutes(routes.routes);
    currentPage = routes.routes[0].page;
    const router = Router(directorRoutes).init(routes.routes[0].path);
    DOM.prototype.$router = router;
};