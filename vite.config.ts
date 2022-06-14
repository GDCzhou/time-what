import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    Components(),
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        '@vueuse/core',
      ],
      vueTemplate: true,
      dirs: ['./src/composable'],
    }),
    Unocss({
      presets: [presetUno(), presetAttributify(), presetIcons()],
      shortcuts: {
        'border-base': 'border-gray/20 dark:border-gray/15',
        'bg-base': 'bg-white dark:bg-truegray-900',
        'bg-canvas': 'bg-gray:15 dark:bg-truegray-800',
      },
    }),
  ],
})
