import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {

    return {
        base: '/pasapalabra-react/', // ¡IMPORTANTE! Reemplaza con el nombre de tu repositorio

        resolve: {
            alias: {
                '@': path.resolve(__dirname, '.'),
            }
        }
    };
});
