import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

async function prepareApp() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')
    await worker.start({ onUnhandledRequest: 'bypass' })
  }
}

prepareApp().then(() => {
  createApp(App).use(router).mount('#app')
})
