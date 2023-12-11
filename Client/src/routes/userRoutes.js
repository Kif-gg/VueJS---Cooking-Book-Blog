import Profile from "../components/user-only/Profile.vue";
import Favorites from "../components/user-only/Favorites.vue";
import Reviews from "../components/user-only/Reviews.vue";
import Logout from "../components/user-only/Logout.vue";
import { useAuthenticatedStore } from "../stores/authenticated";
import { verifyString } from "../util/pseudoHasher";

export const userRoutes = [
    {
        path: "/profile",
        component: Profile,
        name: 'Proifle',
        beforeEnter: (to, from) => {
            const confirmedUser = verifyString('regularsecret', useAuthenticatedStore().user)
            if (useAuthenticatedStore().id && confirmedUser && useAuthenticatedStore().authenticated) {
                return true;
            } else {
                return '/login';
            }
        }
    },
    {
        path: "/profile/favorites",
        component: Favorites,
        beforeEnter: (to, from) => {
            const confirmedUser = verifyString('regularsecret', useAuthenticatedStore().user)
            if (useAuthenticatedStore().id && confirmedUser && useAuthenticatedStore().authenticated) {
                return true;
            } else {
                return '/login';
            }
        }
    },
    {
        path: "/profile/reviews",
        component: Reviews,
        beforeEnter: (to, from) => {
            const confirmedUser = verifyString('regularsecret', useAuthenticatedStore().user)
            if (useAuthenticatedStore().id && confirmedUser && useAuthenticatedStore().authenticated) {
                return true;
            } else {
                return '/login';
            }
        }
    },
    {
        path: "/logout",
        component: Logout,
        beforeEnter: (to, from) => {
            const confirmedUser = verifyString('regularsecret', useAuthenticatedStore().user)
            if (useAuthenticatedStore().id && confirmedUser && useAuthenticatedStore().authenticated) {
                return true;
            } else {
                return '/login';
            }
        }
    },
];