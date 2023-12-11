<template>
    <header>
        <UserNav v-if="isAuthenticated && checkUser()"></UserNav>
        <AdminNav v-else-if="isAuthenticated && checkAdmin()"></AdminNav>
        <GuestNav v-else></GuestNav>

        <HeaderQuote></HeaderQuote>
    </header>
</template>

<script>
import { useAuthenticatedStore } from '../../stores/authenticated';
import GuestNav from '../guest-only/GuestNav.vue';
import UserNav from '../user-only/UserNav.vue';
import AdminNav from '../admin-only/AdminNav.vue';
import HeaderQuote from './HeaderQuote.vue';
import { verifyString } from '../../util/pseudoHasher';
import { useEditModeStore } from '../../stores/editMode';

export default {
    components: { GuestNav, UserNav, AdminNav, HeaderQuote },
    data() {
        return {
            isAuthenticated: '',
            isUser: ''
        }
    },
    methods: {
        checkUser() {
            return verifyString('regularsecret', this.isUser);
        },
        checkAdmin() {
            return verifyString('supersecret', this.isUser);
        }
    },
    mounted() {
        this.isAuthenticated = useAuthenticatedStore().authenticated;
        this.isUser = useAuthenticatedStore().user;
    },
    watch: {
        $route() {
            this.isAuthenticated = useAuthenticatedStore().authenticated;
            this.isUser = useAuthenticatedStore().user;
        }
    }
}
</script>