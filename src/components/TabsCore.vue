<script setup>
import { useCoreStore } from 'src/stores/example-store'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  parentName: {
    type: [String, Number],
    default: 1
  },
  level: {
    type: Number,
    default: 1
  },
  tabSelectedName: {
    type: String,
    default: 'app'
  }
})

const emit = defineEmits(['update:tabSelectedName'])

const Route = useRoute()

const store = useCoreStore()

const tabsCore = computed(() => {
  return store.tabs.filter((tab) => tab.meta.parentName === props.parentName)
})

onMounted(() => {
  console.log('FROM TABS CORE', Route)

  nameSelectedTab.value = Route.meta.relation || Route.name
})

const removeTab = (evt, tab) => {
  evt.preventDefault()
  store.removeTab({ name: tab.name })
}

const nameSelectedTab = computed({
  get: () => props.tabSelectedName,
  set: (value) => emit('update:tabSelectedName', value)
})

const changeTabSelected = (nTab) => {
  nameSelectedTab.value = nTab.name
}

</script>

<template>
    <section>
        <q-tabs
          class="bg-white text-primary"
          active-class="bg-primary text-white"
          indicator-color="indigo-6"
          align="justify-start">
            <q-route-tab
            v-if="level === 1"
                to="/uno"
                :exact="true" >
                <span >UNO</span>
            </q-route-tab>

            <q-route-tab
                @click="changeTabSelected(tab)"
                :to="tab.path"
                v-for="(tab, index) of tabsCore"
                :key="index"
                 >
                <div>
                    <q-btn
                        round
                        flat
                        size="xs"
                        icon="close"
                        class="q-mr-md bg-white text-primary custom-size"
                        @click.stop="(evt) => removeTab(evt, tab)"/>

                    <span >{{ tab.meta?.label }}</span>
                </div>
            </q-route-tab>
        </q-tabs>
    </section>
</template>

<style lang="scss">

$custom-color: #4f46e5;

.narrow-indicator {
  background-color: red;
}

.custom-size {
  min-width: 2em !important;
  min-height: 2em !important;
}
</style>
