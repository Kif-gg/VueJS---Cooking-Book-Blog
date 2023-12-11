<template>
    <Header></Header>
    <RouterView></RouterView>
    <Footer></Footer>
</template>

<script>
import Header from './components/common/Header.vue';
import Footer from './components/common/Footer.vue';
import { RouterView } from 'vue-router';

export default {
    components: { Header, Footer, RouterView, },                                               
    mounted() {
        const theme = localStorage.getItem("Theme");
        if (theme == "dark") {
            document.getElementById("body").classList.add("dark-mode");
            document.getElementById("theme-switcher").checked = true;
        };
    }
}
</script>