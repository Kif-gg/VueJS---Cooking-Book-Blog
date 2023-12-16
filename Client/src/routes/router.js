import { createRouter, createWebHistory } from "vue-router";
import NotFound from "../components/common/NotFound.vue";
import { useEditModeStore } from "../stores/editMode";
import { guestRoutes } from "./guestRoutes";
import { commonRoutes } from "./commonRoutes";
import { userRoutes } from "./userRoutes";
import { adminRoutes } from "./adminRoutes";

const routes = [
    ...guestRoutes,
    ...commonRoutes,
    ...userRoutes,
    ...adminRoutes,
    {
        path: '/:catchAll(.*)*',
        component: NotFound,
        meta: { title: "Uh-oh..!" },
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const componentsToCheckEditMode = ['RecipeDetails', 'Profile', 'EditRecipe'];

router.beforeEach((to, from) => {
    const title = to.meta.title;
    document.title = title;
    const fromComponentName = from.name || '';
    const toComponentName = to.name || '';

    if (componentsToCheckEditMode.includes(fromComponentName) && useEditModeStore().editMode) {
        useEditModeStore().disableEditMode();
    }
    if (componentsToCheckEditMode.includes(toComponentName) && toComponentName !== 'RecipeDetails') {
        useEditModeStore().enableEditMode();
    }

    return true;
});

export default router;