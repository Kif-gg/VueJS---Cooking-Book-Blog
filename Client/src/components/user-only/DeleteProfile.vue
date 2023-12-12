<template>
    <section class="delete-profile">
        <form @submit.prevent="onDeleteProfileSubmit">
            <h2>Delete profile</h2>
            <label for="username">Username</label>
            <input type="text" name="username" id="username" v-model="formData.username"
                @blur="onBlurValidateField(formData.username, validateUsername, 'username', $event)">

            <p class="error">...</p>

            <label for="email">Email</label>
            <input type="text" name="email" id="email" v-model="formData.email"
                @blur="onBlurValidateField(formData.email, validateEmail, 'email', $event)">

            <p class="error">...</p>

            <label for="password">Password</label>
            <input type="password" name="password" id="password" v-model="formData.password"
                @blur="onBlurValidatePassword(formData.password, validatePassword, 'password', $event)">
            <ShowHidePass></ShowHidePass>

            <p class="error">...</p>

            <label for="repass">Repeat password</label>
            <input type="password" name="repass" id="repass" v-model="formData.repass"
                @blur="onBlurValidateRepass([formData.password, formData.repass], 'repass', $event)">
            <ShowHidePass></ShowHidePass>

            <p class="error">...</p>

            <button type="submit" class="delete-btn" :disabled="validateBeforeSubmit">Delete profile</button>
            <button type="button" class="edit-cancel-btn" @click="cancelEditing">Cancel</button>
        </form>
    </section>
</template>

<script>
import { deleteProfile, logout } from '../../services/userService';
import { validateUsername, validateEmail, validatePassword } from '../../util/validator';
import { useAuthenticatedStore } from '../../stores/authenticated';
import ShowHidePass from '../common/ShowHidePass.vue';
import { useEditModeStore } from '../../stores/editMode';

export default {
    components: { ShowHidePass },
    data() {
        return {
            formData: {
                username: '',
                email: '',
                password: '',
                repass: ''
            },
            errorStack: {
                username: 1,
                email: 1,
                password: 1,
                repass: 1,
            },
            isLoading: false
        }
    },
    methods: {
        cancelEditing() {
            return useEditModeStore().disableEditMode();
        },
        async onDeleteProfileSubmit() {
            try {
                if (confirm("Are You sure You want to DELETE Your profile?\r\nTHIS CAN'T BE UNDONE!!!")) {
                    await deleteProfile(this.formData);
                    await logout();
                    useAuthenticatedStore().setGuest();
                    useEditModeStore().disableEditMode();
                    return this.$router.replace("/register");
                }
            } catch (error) {
                alert(error.message);
            }
        },
        validateUsername,
        validateEmail,
        validatePassword,
        onBlurValidateField(value, validationFunction, errValue, event) {
            if (validationFunction(value) === true) {
                event.currentTarget.classList.add("valid");
                event.currentTarget.classList.remove("invalid");
                event.currentTarget.nextSibling.style.display = "none";
                event.currentTarget.nextSibling.textContent = "";
                this.errorStack[errValue] = 0;
            } else {
                event.currentTarget.classList.add("invalid");
                event.currentTarget.classList.remove("valid");
                event.currentTarget.nextSibling.style.display = "block";
                event.currentTarget.nextSibling.textContent = validationFunction(value);
                this.errorStack[errValue] = 1;
            }
        },
        onBlurValidatePassword(password, validationFunction, errValue, event) {
            if (validationFunction(password) === true) {
                event.currentTarget.classList.add("valid");
                event.currentTarget.classList.remove("invalid");
                event.currentTarget.nextSibling.nextSibling.style.display = "none";
                event.currentTarget.nextSibling.nextSibling.textContent = "";
                this.errorStack[errValue] = 0;
            } else {
                event.currentTarget.classList.add("invalid");
                event.currentTarget.classList.remove("valid");
                event.currentTarget.nextSibling.nextSibling.style.display = "block";
                event.currentTarget.nextSibling.nextSibling.textContent = validationFunction(password);
                this.errorStack[errValue] = 1;
            }
        },
        onBlurValidateRepass(passwords, errValue, event) {
            const [password, repass] = passwords;
            if (password === repass && repass) {
                event.currentTarget.classList.add("valid");
                event.currentTarget.classList.remove("invalid");
                event.currentTarget.nextSibling.nextSibling.style.display = "none";
                event.currentTarget.nextSibling.nextSibling.textContent = "";
                this.errorStack[errValue] = 0;
            } else {
                event.currentTarget.classList.add("invalid");
                event.currentTarget.classList.remove("valid");
                event.currentTarget.nextSibling.nextSibling.style.display = "block";
                event.currentTarget.nextSibling.nextSibling.textContent = "Repeated password does not match the original!";
                this.errorStack[errValue] = 1;
            }
        }
    },
    computed: {
        validateBeforeSubmit() {
            if (Object.values(this.errorStack).every(v => v <= 0)) {
                return false;
            }
            return true;
        },
    }
}
</script>