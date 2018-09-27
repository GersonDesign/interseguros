import Vue from 'vue'
import Router from 'vue-router'
import Cotizacion from '@/components/Cotizacion'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Cotizacion',
      component: Cotizacion
    },

  ]
})
