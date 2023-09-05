import { createApp } from 'vue'
import Pages from './Pages'

export default ({ injector, id }) => {
  const app = createApp(Pages[id])

  return {
    app,
    provide: {

    },
    use: {

    },
    directives: {

    },
    config: {
      name: 'Demo',
      stores: [],
      events: []
    }
  }
}
