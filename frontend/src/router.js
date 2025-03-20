import { createRouter, createWebHistory } from 'vue-router';
import login from "./components/login.vue"; 
import Signup from "./components/signup.vue";
import dashbord from "./components/dashbord.vue";
const routes = [
  { path: '/', redirect: '/login' }, 
  { path: '/login', component: login },
  { path: '/signup', component: Signup },
  {path: '/dashbord', component: dashbord}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
