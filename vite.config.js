import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/vue-landing-page/",
    plugins: [vue()],
    server: {
        proxy: {
          '/api': {
            target: 'http://app.hinovamobile.com.br/ProvaConhecimentoWebApi',
            changeOrigin: true,
            rewrite: path => path.replace(/^\/api/, '')
          }
        }
      }
});
