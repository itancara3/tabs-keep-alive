import customRender from './customRender'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    name: 'app',
    children: [
      {
        path: '/',
        name: 'home',
        meta: {
          parent: true,
          home: true,
          default: true,
          title: 'Home'
        },
        component: () => import('pages/InventoryPage.vue')
      },
      {
        path: '/inventory',
        name: 'inventory',
        meta: {
          parent: true,
          home: true,
          title: 'Inventory'
        },
        component: () => import('pages/InventoryPage.vue')
      },
      {
        path: '/inventory/receive',
        name: 'inventory-receive',
        meta: {
          parentName: 'inventory',
          parent: false,
          home: false,
          title: 'Receive'
        },
        component: () => import('pages/ReceivePage.vue')
      },
      {
        path: '/invoicing',
        name: 'invoicing',
        meta: {
          parent: true,
          home: true,
          title: '/Invoicing'
        },
        component: () => import('pages/InventoryPage.vue')
      }
    ]
  },
  {
    path: '/demo',
    name: 'demo',
    meta: {
      parentName: 'app',
      relation: 'app'
    },
    entry: {
      id: 'Uno',
      component: customRender
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
