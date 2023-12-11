import Login from "../components/guest-only/Login.vue";
import Register from "../components/guest-only/Register.vue";
import { useAuthenticatedStore } from "../stores/authenticated";
import { verifyString } from "../util/pseudoHasher";

export const guestRoutes = [
    {
        path: "/login",
        component: Login,
        beforeEnter: (to, from) => {
            if (!useAuthenticatedStore().id && !useAuthenticatedStore().user && !useAuthenticatedStore().authenticated) {
                return true;
            } else {
                if (verifyString('supersecret', useAuthenticatedStore().user) && !useAuthenticatedStore().id && useAuthenticatedStore().user && useAuthenticatedStore().authenticated) {
                    return '/secret-path/admin/dashboard';
                }
                return '/';
            }
        }
    },
    {
        path: "/register",
        component: Register,
        beforeEnter: (to, from) => {
            if (!useAuthenticatedStore().id && !useAuthenticatedStore().user && !useAuthenticatedStore().authenticated) {
                return true;
            } else {
                if (verifyString('supersecret', useAuthenticatedStore().user) && !useAuthenticatedStore().id && useAuthenticatedStore().user && useAuthenticatedStore().authenticated) {
                    return '/secret-path/admin/dashboard';
                }
                return '/';
            }
        }
    },
];