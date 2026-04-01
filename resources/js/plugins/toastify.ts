import type { App } from 'vue';
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const vue3Toastify = {
    install: (app: App) => {
        app.use(Vue3Toastify, {
            autoClose: 3000,
            transition: 'slide',
            dangerouslyHTMLString: true,
            position: 'bottom-center',
        });
    },
};

export default vue3Toastify;
