<template>
    <Loader v-if="isLoading"></Loader>

    <main class="profile" v-else>
        <section class="user-data">
            <h2>User data</h2>
            <svg class="icon" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                    d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
            </svg>
            <p>{{ user.username }}</p>
            <p>{{ user.email }}</p>
            <RouterLink to="/profile/favorites">My favorite recipies</RouterLink>
            <RouterLink to="/profile/reviews">My comments</RouterLink>
        </section>

        <section class="manage">
            <h2>Manage profile</h2>
            <button type="button" class="edit-cancel-btn" @click="enableEditModeEmail">Change email</button>
            <button type="button" class="edit-cancel-btn" @click="enableEditModePassword">Change password</button>
            <button type="button" class="delete-btn" @click="enableDeleteAccount">Delete account</button>
        </section>

        <ChangeEmail v-if="editForm === 'email' && editMode"></ChangeEmail>

        <ChangePassword v-else-if="editForm === 'password' && editMode"></ChangePassword>

        <DeleteProfile v-else-if="editForm === 'accountDanger' && editMode"></DeleteProfile>
    </main>
</template>

<script>
import { RouterLink } from 'vue-router';
import { getProfile } from '../../services/userService';
import { useAuthenticatedStore } from '../../stores/authenticated';
import ChangeEmail from './ChangeEmail.vue';
import ChangePassword from './ChangePassword.vue';
import DeleteProfile from './DeleteProfile.vue';
import { useEditModeStore } from '../../stores/editMode';
import Loader from '../common/Loader.vue';

export default {
    components: { ChangeEmail, ChangePassword, DeleteProfile, RouterLink, Loader },
    data() {
        return {
            editForm: '',
            isLoading: true
        }
    },
    async created() {
        try {
            const userObj = await getProfile();
            useAuthenticatedStore().setUserObj(userObj);
        } catch (error) {
            alert(error.message);
        } finally {
            this.isLoading = false;
        }
    },
    computed: {
        user() {
            return useAuthenticatedStore().userObj;
        },
        editMode() {
            return useEditModeStore().editMode;
        },
    },
    methods: {
        enableEditModeEmail() {
            useEditModeStore().enableEditMode();
            this.editForm = 'email';
        },
        enableEditModePassword() {
            useEditModeStore().enableEditMode();
            this.editForm = 'password';
        },
        enableDeleteAccount() {
            useEditModeStore().enableEditMode();
            this.editForm = 'accountDanger';
        },
    }
}
</script>