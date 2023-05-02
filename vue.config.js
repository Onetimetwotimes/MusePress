const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        'app.client.vue'
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true
    }
  }
})
