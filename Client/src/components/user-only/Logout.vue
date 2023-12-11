<template>
    <Loader v-if="isLoading"></Loader>
</template>

<script>
import { useAuthenticatedStore } from '../../stores/authenticated';
import { logout } from '../../services/userService'
import Loader from '../common/Loader.vue';
export default {
    data() {
        return {
            isLoading: false
        }
    },
    async created() {
        try {
            this.isLoading = true;
            useAuthenticatedStore().setGuest();
            await logout();
            await this.$router.replace("login");
        }
        catch (error) {
            await this.$router.replace("/");
            alert(error.message);
        }
        finally {
            this.isLoading = false;
        }
    },
    components: { Loader }
}
</script>