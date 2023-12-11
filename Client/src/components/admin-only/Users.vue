<template>
    <SearchUser></SearchUser>

    <Loader v-if="isLoading"></Loader>

    <main class="a-users" v-else>
        <section class="user-list">
            <h3>Users</h3>

            <template v-if="users.length > 0">
                <UserCard v-for="user in users" :key="user._id" :_id="user._id" :username="user.username"
                    :email="user.email" :createdAt="user.createdAt" :blocked="user.blocked"></UserCard>
            </template>

            <template v-else>
                <h3>There are no users currently!</h3>
            </template>

        </section>
    </main>
</template>

<script>
import UserCard from './UserCard.vue';
import SearchUser from './SearchUser.vue';
import { getAllUsers } from '../../services/adminService';
import { useUsersStore } from '../../stores/users';
import Loader from '../common/Loader.vue';

export default {
    components: { UserCard, SearchUser, Loader },
    data() {
        return {
            isLoading: true
        }
    },
    async created() {
        try {
            const users = await getAllUsers();
            useUsersStore().setUsers(users);
        } catch (error) {
            alert(error.message);
        } finally {
            this.isLoading = false;
        }
    },
    computed: {
        users() {
            return useUsersStore().users;
        }
    }
}
</script>