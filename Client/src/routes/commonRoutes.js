import Home from "../components/common/Home.vue";
import Recipes from "../components/common/Recipes.vue";
import RecipeDetails from "../components/common/RecipeDetails.vue";
import About from "../components/common/About.vue";
import { useRecipesStore } from "../stores/recipes";
import { verifyString } from "../util/pseudoHasher";
import { useAuthenticatedStore } from "../stores/authenticated";

export const commonRoutes = [
    {
        path: "/",
        component: Home,
        meta: { title: "Home" },
        beforeEnter: (to, from) => {
            if (verifyString('supersecret', useAuthenticatedStore().user) && !useAuthenticatedStore().id && useAuthenticatedStore().user && useAuthenticatedStore().authenticated) {
                return '/secret-path/admin/dashboard';
            }
        }
    },
    {
        path: "/recipes",
        component: Recipes,
        meta: { title: "Explore recipes" },
    },
    {
        path: "/recipes/:id",
        component: RecipeDetails,
        name: 'RecipeDetails',
        meta: { title: "Recipe details" },
        beforeEnter: (to, from) => {
            const validRecipeID = useRecipesStore().recipes.find(rec => rec._id === to.params.id);
            if (validRecipeID || useRecipesStore().currentRecipe._id == to.params.id) {
                return true;
            } else {
                return '/not-found';
            }
        }
    },
    {
        path: "/about",
        component: About,
        meta: { title: "About the chef" },
        beforeEnter: (to, from) => {
            if (verifyString('supersecret', useAuthenticatedStore().user) && !useAuthenticatedStore().id && useAuthenticatedStore().user && useAuthenticatedStore().authenticated) {
                return '/secret-path/admin/dashboard';
            }
        }
    }
];