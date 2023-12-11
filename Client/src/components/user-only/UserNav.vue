<template>
    <nav>
        <ul class="left-side">
            <li>
                <RouterLink to="/" :class="{'current-page': isCurrentPage('/')}">Home</RouterLink>
            </li>
            <li>
                <RouterLink to="/recipes" :class="{'current-page': isCurrentPage('/recipes')}">Recipes</RouterLink>
            </li>
            <li>
                <RouterLink to="/about" :class="{'current-page': isCurrentPage('/about')}">About</RouterLink>
            </li>
        </ul>

        <ul class="right-side">
            <li>
                <RouterLink to="/profile" :class="{'current-page': isCurrentPage('/profile')}">Profile</RouterLink>
            </li>
            <li>
                <RouterLink to="/logout" :class="{'current-page': isCurrentPage('/logout')}">Logout</RouterLink>
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