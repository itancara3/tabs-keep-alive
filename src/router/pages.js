import { defineAsyncComponent } from 'vue'

export default {
  Uno: defineAsyncComponent(() => import('pages/DemoPageDemo.vue'))
}
