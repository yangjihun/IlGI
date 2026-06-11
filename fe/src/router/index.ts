import { createRouter, createWebHistory } from 'vue-router'
import DiaryCreateView from '../views/DiaryCreateView.vue'
import DiaryDetailView from '../views/DiaryDetailView.vue'
import HomeView from '../views/HomeView.vue'
import InviteView from '../views/InviteView.vue'
import PlacesView from '../views/PlacesView.vue'
import RoomView from '../views/RoomView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/diaries/new',
      name: 'diary-create',
      component: DiaryCreateView,
    },
    {
      path: '/diaries/sample',
      name: 'diary-detail',
      component: DiaryDetailView,
    },
    {
      path: '/places',
      name: 'places',
      component: PlacesView,
    },
    {
      path: '/rooms/sample',
      name: 'room',
      component: RoomView,
    },
    {
      path: '/invite',
      name: 'invite',
      component: InviteView,
    },
  ],
})

export default router
