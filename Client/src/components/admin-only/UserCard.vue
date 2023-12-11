<template>
    <article class="user-card">
        <table>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Joined</th>
                    <th>Status</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>{{ username }}</td>
                    <td>{{ email }}</td>
                    <td><time>{{ date }} {{ month }} {{ year }}</time> at <time>{{ hours < 10 ? "0" + hours : hours }}:{{
                        minutes < 10 ? "0" + minutes : minutes }}</time>
                    </td>
                    <td>{{ blockedStr }}</td>
                </tr>
            </tbody>
        </table>
        <div class="btns">
            <form @submit.prevent="onUpdateUserSubmit">
                <span>Blocked</span>
                <label :for="_id" class="slider2">
                    <input type="checkbox" name="blocked" :id="_id" v-model="formData.blocked">
                    <div class="thumb2"></div>
                </label>
                <button type="submit" class="edit-cancel-btn">Update status</button>
            </form>
            <button type="button" class="delete-btn" @click="onDeleteClick">Delete user</button>
        </div>
    </article>
</template>

<script>
import { deleteUser, editUser } from '../../services/adminService';
import { useUsersStore } from '../../stores/users';

export default {
    props: {
        _id: String,
        username: String,
        email: String,
        createdAt: String,
        blocked: Boolean
    },
    data() {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const date = new Date(this.createdAt);
        return {
            date: date.getDate(),
            month: months[date.getMonth()],
            year: date.getFullYear(),
            minutes: date.getMinutes(),
            hours: date.getHours(),
            formData: {
                blocked: this.blocked
            }
        };
    },
    computed: {
        blockedStr() {
            if (this.blocked) {
                return "Blocked";
            }
            else {
                return "Active";
            }
        },
    },
    methods: {
        async onUpdateUserSubmit() {
            try {
                if (confirm("Are You sure You want to edit this user?")) {
                    const result = await editUser(this._id, this.formData);
                    useUsersStore().users.splice(useUsersStore().users.findIndex(user => user._id === result._id), 1, result);
                }
            }
            catch (error) {
                alert(error.message);
            }
        },
        async onDeleteClick() {
            try {
                if (confirm("Are You sure You want to DELETE this user?\r\nTHIS CAN'T BE UNDONE!!!")) {
                    await deleteUser(this._id);
                    useUsersStore().users.splice(useUsersStore().users.findIndex(user => user._id === this._id), 1);
                }
            }
            catch (error) {
                alert(error.message);
            }
        }
    }
}
</script>