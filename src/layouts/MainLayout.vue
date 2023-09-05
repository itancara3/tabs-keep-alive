<script>
import { computed, defineComponent, onMounted, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useCoreStore } from 'src/stores/example-store'
import { useRoute } from 'vue-router'
import TabsCore from 'src/components/TabsCore.vue'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    TabsCore
  },

  setup () {
    const store = useCoreStore()
    const Route = useRoute()

    const leftDrawerOpen = ref(false)
    const parentName = ref('')

    onMounted(() => {
      store.getTabs({ level: 1 })

      if (Route.meta?.level === 1) {
        parentName.value = Route.name
      } else {
        parentName.value = Route.meta.parentName
      }
    })

    const showComponent = (component) => {
    }

    const removeTab = (evt, tab) => {
      evt.preventDefault()
      store.removeTab(tab.name)
    }

    const getTabs = computed(() => {
      return store.tabs
    })

    const addChildTab = () => {
      store.addTab({
        parentName: Route.name,
        parentPath: Route.fullPath,
        relation: Route.name,
        level: 2,
        onClose: [
          {
            name: 'printMessageOnClose'
          }
        ]
      })
    }

    const addBrotherTab = () => {
      console.log('FROM BROTHER PATH', Route)
      store.addTab({ parentName: Route.meta.parentName, parentPath: Route.fullPath, relation: Route.name, level: 2 })
    }

    const addParentTab = () => {
      store.addTab({ parentName: '', parentPath: '', level: 1 })
    }

    return {
      addBrotherTab,
      parentName,
      getTabs,
      addChildTab,
      addParentTab,
      store,
      removeTab,
      showComponent,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})

</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Demo App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
     <TabsCore parentName="app" v-model:tabSelectedName="parentName" :level="1" />
     <TabsCore v-if="parentName" :parentName="parentName" :level="2"/>

      <div class="col-xs-12 q-gutter-md">
        <q-btn label="Add new child tab" @click="addChildTab" color="secondary"/>
        <q-btn label="Add new brother tab" @click="addBrotherTab" color="info"/>
        <q-btn label="Add new parent tab" @click="addParentTab" color="primary"/>
      </div>

      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>
