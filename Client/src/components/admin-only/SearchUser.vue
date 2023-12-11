<template>
    <section class="search-user">
        <form @submit.prevent="onSearchSubmit">
            <div class="search-box">
                <label for="search">Search by username/email</label>
                <input type="text" name="search" id="search" v-model="formData.search">
                <button type="submit">
                    <svg class="search-icon" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                        <path
                            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                    </svg>
                </button>
            </div>

            <div class="filter-box">
                <div>
                    <svg class="filter-icon" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                        <path
                            d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
                    </svg>
                </div>

                <div>
                    <label for="status">Status of user</label>
                    <select name="status" id="status" v-model="formData.status">
                        <option value="all" selected>All</option>
                        <option value="active">Active</option>
                        <option value="blocked">Blocked</option>
                    </select>
                </div>

                <div>
                    <label for="sort">Sort users by</label>
                    <select name="sort" id="sort" v-model="formData.criteria">
                        <option value="username" selected>Username</option>
                        <option value="createdat">Date of registering</option>
                    </select>
                </div>

                <div>
                    <label for="sort-direction">Way of sorting</label>
                    <select name="direction" id="sort-direction" v-model="formData.direction">
                        <option value="ascending" selected>Ascending</option>
                        <option value="descending">Descending</option>
                    </select>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
import { getUsersFiltered } from '../../services/adminService';
import { useUsersStore } from '../../stores/users';

export default {
    data() {
        return {
            formData: {
                search: '',
                status: 'all',
                criteria: 'username',
                direction: 'ascending'
            }
        };
    },
    methods: {
        async onSearchSubmit() {
            try {
                const users = await getUsersFiltered(this.formData);
                useUsersStore().setUsers(users);
            }
            catch (error) {
                alert(error.message);
            }
        }
    }
}
</script>