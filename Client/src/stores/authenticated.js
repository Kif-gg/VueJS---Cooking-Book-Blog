import { defineStore } from "pinia";
import { hash } from "../util/pseudoHasher";

export const useAuthenticatedStore = defineStore("authenticated", {
    state: () => ({ authenticated: localStorage.getItem("Authenticated"), user: localStorage.getItem("User"), id: localStorage.getItem("Data.values.ObjectID"), userObj: {} }),
    actions: {
        setUser(id) {
            this.authenticated = true;
            this.user = hash("regularsecret");
            this.id = id;
            localStorage.setItem("Authenticated", this.authenticated);
            localStorage.setItem("User", this.user);
            localStorage.setItem("Data.values.ObjectID", this.id);
        },
        setUserObj(userObj) {
            this.userObj = userObj;
        },
        setAdmin() {
            this.authenticated = true;
            this.user = hash("supersecret");
            this.id = null;
            localStorage.setItem("Authenticated", this.authenticated);
            localStorage.setItem("User", this.user);
        },
        setGuest() {
            this.authenticated = null;
            this.user = null;
            this.id = null;
            localStorage.removeItem("Authenticated");
            localStorage.removeItem("User");
            localStorage.removeItem("Data.values.ObjectID");
        }
    }
});