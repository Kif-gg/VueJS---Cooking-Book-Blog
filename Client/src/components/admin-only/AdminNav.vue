<template>
    <nav>
        <ul class="left-side">
            <li>
                <RouterLink to="/secret-path/admin/dashboard"
                    :class="{ 'current-page': isCurrentPage('/secret-path/admin/dashboard') }">Dashboard</RouterLink>
            </li>
            <li>
                <RouterLink to="/recipes" :class="{ 'current-page': isCurrentPage('/recipes') }">Recipes</RouterLink>
            </li>
            <li>
                <RouterLink to="/secret-path/admin/users"
                    :class="{ 'current-page': isCurrentPage('/secret-path/admin/users') }">Users</RouterLink>
            </li>
        </ul>

        <ul class="right-side">
            <li>
                <RouterLink to="/secret-path/admin/logout"
                    :class="{ 'current-page': isCurrentPage('/secret-path/admin/logout') }">Logout</RouterLink>
            </li>
        </ul>
        <ThemeSwitch></ThemeSwitch>
    </nav>
</template>

<script>
import { RouterLink } from 'vue-router';
import ThemeSwitch from '../common/ThemeSwitch.vue';

export default {
    components: { ThemeSwitch, RouterLink },
    methods: {
        isCurrentPage(path) {
            return this.$route.matched.some(p => p.path == path);
        }
    }
}
</script>