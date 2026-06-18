import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from '../composables/useCurrentUser'
import DiaryCreateView from '../views/DiaryCreateView.vue'
import DiaryDetailView from '../views/DiaryDetailView.vue'
import HomeView from '../views/HomeView.vue'
import InviteView from '../views/InviteView.vue'
import PlacesView from '../views/PlacesView.vue'
import RoomView from '../views/RoomView.vue'
import WelcomeView from '../views/WelcomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/welcome',
      name: 'welcome',
      component: WelcomeView,
    },
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
      path: '/diaries/:id',
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

router.beforeEach((to) => {
  if (to.name === 'welcome') return true
  if (!getCurrentUser()) return { name: 'welcome' }
  return true
})

export default router
