import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Chatroom from '../views/Chatroom.vue'
import { projectAuth } from '@/firebase/config'

const all = 'all';

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if(!user){
    next({ name : 'Welcome'})
  } else {
    next()
  }
}

const reqireNoAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if(user){
    next({ name : 'Chatroom', params: { id: all }})
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
    beforeEnter: reqireNoAuth
  },
  {
    path: '/chatroom/:id',
    name: 'Chatroom',
    props: true,
    component: Chatroom,
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
