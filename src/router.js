import { createRouter, createWebHistory } from 'vue-router'
import AllTheBooks from "@/components/pages/AllTheBooks.vue";
import LoginUser from '@/components/user/authorization/LoginUser.vue'
import RegisterUser from '@/components/user/authorization/RegisterUser.vue'
import MyBooks from './components/pages/MyBooks.vue'
import AddBook from './components/pages/AddNewBook.vue'
import ReservedBooks from './components/pages/ReservedBooks.vue'
import NotFound from './components/pages/NotFound.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: AllTheBooks },
        { path: '/login', component: LoginUser },
        { path: '/register', component: RegisterUser },
        { path: '/my_books', component: MyBooks, meta: { requiresAuth: true } },
        { path: '/add_new_book', component: AddBook, meta: { requiresAuth: true } },
        { path: '/reserved_books', component: ReservedBooks, meta: { requiresAuth: true } },
        { path: '/:notFound(.*)', component: NotFound }
    ]
});

router.beforeEach(async (to, from, next) => {
    const { useUserStore } = await import('@/store')
    const userStore = useUserStore();
    if (userStore.id === null ) await userStore.fetchUser();
    if (to.meta.requiresAuth && !userStore.isLoggedIn) {
        next('/login');
    } else {
        next();
    }
})

export default router;