import { route } from 'quasar/wrappers'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { defineAsyncComponent } from 'vue'
import { EntryPackage } from './entryApp'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
const newRoutes = []

const addRoutes = () => {
  for (const route of routes) {
    if (route.entry) {
      const respuesta = EntryPackage(route.entry)
      newRoutes.push(Object.assign({ ...route }, {
        children: [],
        components: {
          default: respuesta,
          [route.name]: respuesta
        }
      }))
    } else {
      newRoutes.push(route)
    }
  }

  console.log(newRoutes)

  return newRoutes
}

export default route(function ({ store, ssrContext }) {
  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes: addRoutes(),

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createWebHistory()
  })

  console.log('AFTER ROUTES', Router.getRoutes())

  let oldTabs = sessionStorage.getItem('openTabs') || '[]'

  if (oldTabs) oldTabs = JSON.parse(oldTabs)

  for (const tab of oldTabs) {
    tab.component = defineAsyncComponent(() => import(`../pages/${tab.meta.componentLocation}.vue`))
    Router.addRoute(tab.meta.parentName, tab)
  }

  return Router
})
