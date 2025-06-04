import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ }) => {

    return {
        base: '/pasapalabra-react/', // ¡IMPORTANTE! Reemplaza con el nombre de tu repositorio

        resolve: {
            alias: {
                '@': path.resolve(__dirname, '.'),
            }
        }
    };
});
