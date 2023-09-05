import { h, inject, onMounted } from 'vue'

// const providers = ['useCoreStore', 'useRouter', 'useRoute']
const providers = []

export const EntryPackage = ({ component, id }) => ({
  setup (props, { emit }) {
    const idRandom = `${id}-${Date.now()}`

    const injector = providers.reduce((acc, value) => {
      acc[value] = inject(value)

      return acc
    }, {})

    const appSchema = component(injector, id)

    appProvide(appSchema.app, { router: injector.router, rapidStore: injector.rapidStore })

    onMounted(() => {
      initApp(appSchema).mount(`#entryPoint-${idRandom}`)
    })

    return () => h('div', { id: `entryPoint-${idRandom}`, class: 'relative' })
  }

})

export const initApp = (appSchema) => {
  try {
    appProvide(appSchema.app, appSchema.provide)

    appUse(appSchema.app, appSchema.use)

    appDirectives(appSchema.app, appSchema.directives)

    return appSchema.app
  } catch (error) {
    console.log('error', error)
  }
}

export const appProvide = (app, provide) => {
  for (const key in provide) {
    if (Object.hasOwnProperty.call(provide, key)) {
      app.provide(key, provide[key])
    }
  }
}

export const appUse = (app, use) => {
  for (const key in use) {
    if (Object.hasOwnProperty.call(use, key)) {
      app.use(use[key])
    }
  }
}

export const appDirectives = (app, directives) => {
  for (const key in directives) {
    if (Object.hasOwnProperty.call(directives, key)) {
      app.directive(key, directives[key])
    }
  }
}
