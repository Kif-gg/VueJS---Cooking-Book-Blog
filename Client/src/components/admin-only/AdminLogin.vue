<template>
    <Loader v-if="isLoading"></Loader>

    <main class="a-login" v-else>
        <form @submit.prevent="onAdminLoginSubmit">
            <h2>Requesting login to administrator account!</h2>
            <label for="email">Email</label>
            <input type="text" name="email" id="email" v-model="formData.email">

            <label for="password">Password</label>
            <input type="password" name="password" id="password" v-model="formData.password">
            <ShowHidePass></ShowHidePass>

            <label for="pin">PIN</label>
            <input type="password" name="pin" id="pin" v-model="formData.pin">
            <ShowHidePass></ShowHidePass>

            <p class="error">Wrong email, password or PIN!</p>

            <button type="submit" class="add-submit-btn">Login</button>
        </form>
    </main>
</template>

<script>
import ShowHidePass from '../common/ShowHidePass.vue';
import { adminLogin } from '../../services/adminService';
import { useAuthenticatedStore } from '../../stores/authenticated';
import Loader from '../common/Loader.vue';

export default {
    components: { ShowHidePass, Loader },
    data() {
        return {
            formData: {
                email: '',
                password: '',
                pin: ''
            },
            isLoading: false
        }
    },
    methods: {
        async onAdminLoginSubmit() {
            try {
                this.isLoading = true;
                const admin = await adminLogin(this.formData);
                useAuthenticatedStore().setAdmin(admin);
                this.$router.replace("dashboard");
            } catch (error) {
                alert(error.message);
            } finally {
                this.isLoading = false;
            }
        }
    }
}
</script>