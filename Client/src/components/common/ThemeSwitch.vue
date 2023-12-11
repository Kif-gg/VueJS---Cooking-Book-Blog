<template>
    <label for="theme-switcher" class="slider">
        <input type="checkbox" name="theme" id="theme-switcher" @click="changeTheme($event)">
        <div class="thumb"></div>
    </label>
</template>

<script>
export default {
    methods: {
        changeTheme(event) {
            const body = document.getElementById("body");
            if (event.target.checked) {
                body.classList.add("dark-mode");
                localStorage.setItem("Theme", "dark");
            } else if (!event.target.checked) {
                body.classList.remove("dark-mode");
                localStorage.setItem("Theme", "light");
            }
        }
    },
    mounted() {
        if (document.getElementById("body").classList.contains('dark-mode') && localStorage.getItem("Theme") == "dark") {
            document.getElementById('theme-switcher').checked = true;
        }
    }
}
</script>