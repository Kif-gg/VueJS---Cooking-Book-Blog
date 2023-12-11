<template>
    <Loader v-if="isLoading"></Loader>

    <main class="login" v-else>
        <form @submit.prevent="onLoginSubmit">
            <h2>Log into your profile</h2>
            <label for="username">Username</label>
            <input type="text" name="username" id="username" v-model="formData.username">

            <label for="password">Password</label>
            <input type="password" name="password" id="password" v-model="formData.password">
            <ShowHidePass></ShowHidePass>

            <p class="error">Wrong username or password!</p>

            <button type="submit" class="add-submit-btn">Login</button>
        </form>
        <p>You don't have an account? <a href="register.html">Register here.</a></p>
    </main>
</template>

<script>
import ShowHidePass from '../common/ShowHidePass.vue';
import { login } from '../../services/userService';
import { useAuthenticatedStore } from '../../stores/authenticated';
import Loader from '../common/Loader.vue';
export default {
    components: { ShowHidePass, Loader },
    data() {
        return {
            formData: {
                username: '',
                password: ''
            },
            isLoading: false
        }
    },
    methods: {
        async onLoginSubmit() {
            try {
                this.isLoading = true;
                const user = await login(this.formData);
                useAuthenticatedStore().setUser(user._id);
                return this.$router.replace("/");
            } catch (error) {
                alert(error.message);
            } finally {
                this.isLoading = false;
            }
        }
    }
}
</script>