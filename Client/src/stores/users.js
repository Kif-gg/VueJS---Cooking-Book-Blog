import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", {
    state: () => ({ users: [] }),
    actions: {
        setUsers(users) {
            this.users = users;
        }
    }
});