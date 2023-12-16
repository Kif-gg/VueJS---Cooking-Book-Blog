import AdminLogin from "../components/admin-only/AdminLogin.vue";
import Dashboard from "../components/admin-only/Dashboard.vue";
import CreateEditRecipe from "../components/admin-only/CreateEditRecipe.vue";
import Users from "../components/admin-only/Users.vue";
import AdminLogout from "../components/admin-only/AdminLogout.vue";
import { useRecipesStore } from "../stores/recipes";
import { useAuthenticatedStore } from "../stores/authenticated";
import { verifyString } from "../util/pseudoHasher";

export const adminRoutes = [
    {
        path: "/secret-path/admin/login",
        component: AdminLogin,
        meta: { title: "Login as Admin" },
        beforeEnter: (to, from) => {
            if (!useAuthenticatedStore().id && !useAuthenticatedStore().user && !useAuthenticatedStore().authenticated) {
                return true;
            } else {
                return '/login';
            }
        }
    },
    {
        path: "/secret-path/admin/dashboard",
        component: Dashboard,
        meta: { title: "Dashboard" },
        beforeEnter: (to, from) => {
            const confirmedAdmin = verifyString('supersecret', useAuthenticatedStore().user);
            if (!useAuthenticatedStore().id && confirmedAdmin && useAuthenticatedStore().authenticated) {
                return true;
            } else {
                return '/login';
            }
        }
    },
    {
        path: "/secret-path/admin/recipes/create",
        component: CreateEditRecipe,
        meta: { title: "Create new recipe" },
        beforeEnter: (to, from) => {
            const confirmedAdmin = verifyString('supersecret', useAuthenticatedStore().user);
            if (!useAuthenticatedStore().id && confirmedAdmin && useAuthenticatedStore().authenticated) {
                return true;
            } else {
                return '/login';
            }
        }
    },
    {
        path: "/secret-path/admin/recipes/:id/edit",
        component: CreateEditRecipe,
        meta: { title: "Edit recipe" },
        name: 'EditRecipe',
        beforeEnter: (to, from) => {
            const validRecipeID = useRecipesStore().recipes.find(rec => rec._id === to.params.id);
            const confirmedAdmin = verifyString('supersecret', useAuthenticatedStore().user);
            if (!useAuthenticatedStore().id && confirmedAdmin && useAuthenticatedStore().authenticated) {
                if (validRecipeID) {
                    return true;
                } else {
                    return '/not-found';
                }
            } else {
                return '/login';
            }

        }
    },
    {
        path: "/secret-path/admin/users",
        component: Users,
        meta: { title: "Manage users" },
        beforeEnter: (to, from) => {
            const confirmedAdmin = verifyString('supersecret', useAuthenticatedStore().user);
            if (!useAuthenticatedStore().id && confirmedAdmin && useAuthenticatedStore().authenticated) {
                return true;
            } else {
                return '/login';
            }
        }
    },
    {
        path: "/secret-path/admin/logout",
        component: AdminLogout,
        beforeEnter: (to, from) => {
            const confirmedAdmin = verifyString('supersecret', useAuthenticatedStore().user);
            if (!useAuthenticatedStore().id && confirmedAdmin && useAuthenticatedStore().authenticated) {
                return true;
            } else {
                return '/login';
            }
        }
    },
];