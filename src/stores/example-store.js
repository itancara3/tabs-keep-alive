import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useCoreStore = defineStore('core', () => {
  const tabs = ref([])
  const levels = computed(() => {
    return Object.keys(tabs.value).length
  })
  const Router = useRouter()
  const Route = useRoute()

  const getTabs = ({ parentName = 'app', relation = '' }) => {
    console.log('Route FROM STORE: ', Route)
    const oldTabs = sessionStorage.getItem('openTabs')

    if (oldTabs) {
      tabs.value = JSON.parse(oldTabs)

      return tabs.value.filter((tab) => tab.meta.parentName === parentName || tab.meta.relation === relation)
    }

    return tabs.value || []
  }

  const getAllRelations = (name, responseRelations) => {
    const relations = tabs.value.filter((tab) => tab.meta?.parentName === name || tab.meta.relation === name).map(x => x.name)

    for (const relation of relations) {
      responseRelations.push(relation)
      getAllRelations(relation, responseRelations)
    }
  }

  const removeTab = ({ name }) => {
    const tabRemove = tabs.value.find(x => x.name === name)

    // const dependencies = tabs.value.filter((tab) => tab.meta?.parentName === tabRemove.name || tab.meta.relation === tabRemove.name).map(x => x.name)
    const dependencies = []
    getAllRelations(name, dependencies)

    const newTabs = []

    for (const tab of tabs.value) {
      if (tab.name === tabRemove.name || dependencies.includes(tab.name)) {
        Router.removeRoute(tab.name)
      } else {
        newTabs.push(tab)
      }
    }

    tabs.value = newTabs

    sessionStorage.setItem('openTabs', JSON.stringify(tabs.value))
  }

  const addTab = ({ parentName, parentPath, relation, level }) => {
    if (!tabs.value) tabs.value = []

    let path = `${parentPath}/dinamic-path-${tabs.value.length + 1}`

    if (!parentName) parentName = 'app'

    if (!parentPath) path = `/dinamic-path-${tabs.value.length + 1}`

    const newTab = {
      name: `${parentName}-${tabs.value.length + 1}`,
      path,
      component: () => import('pages/DemoPageHijoUno.vue'),
      meta: {
        componentLocation: 'DemoPageHijoUno',
        label: `dinamic tab ${tabs.value.length + 1}`,
        parentName,
        path,
        level,
        relation
      }
    }

    tabs.value.push(newTab)

    Router.addRoute(parentName, newTab)
    Router.push(newTab.path)

    sessionStorage.setItem('openTabs', JSON.stringify(tabs.value))
  }

  return { tabs, levels, addTab, getTabs, removeTab }
})
