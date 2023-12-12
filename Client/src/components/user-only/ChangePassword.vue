<template>
    <section class="edit-password">
        <form @submit.prevent="onChangePasswordSubmit">
            <h2>Change password</h2>
            <label for="old-password">Old password</label>
            <input type="password" name="old-password" id="old-password" v-model="formData.oldPassword"
                @blur="onBlurValidatePassword(formData.oldPassword, validatePassword, 'oldPassword', $event)">
            <ShowHidePass></ShowHidePass>

            <p class="error">...</p>

            <label for="new-password">New password</label>
            <input type="password" name="new-password" id="new-password" v-model="formData.newPassword"
                @blur="onBlurValidatePassword(formData.newPassword, validatePassword, 'newPassword', $event)">
            <ShowHidePass></ShowHidePass>

            <p class="error">...</p>

            <label for="repass-change">Repeat new password</label>
            <input type="password" name="repass" id="repass-change" v-model="formData.repass"
                @blur="onBlurValidateRepass([formData.newPassword, formData.repass], 'repass', $event)">
            <ShowHidePass></ShowHidePass>

            <p class="error">...</p>

            <button type="submit" class="add-submit-btn" :disabled="validateBeforeSubmit">Change password</button>
            <button type="button" class="edit-cancel-btn" @click="cancelEditing">Cancel</button>
        </form>
    </section>
</template>

<script>
import { useAuthenticatedStore } from '../../stores/authenticated';
import ShowHidePass from '../../components/common/ShowHidePass.vue';
import { validatePassword } from '../../util/validator';
import { editProfile } from '../../services/userService';
import { useEditModeStore } from '../../stores/editMode';
export default {
    components: { ShowHidePass },
    data() {
        return {
            formData: {
                oldPassword: '',
                newPassword: '',
                repass: '',
            },
            errorStack: {
                oldPassword: 1,
                newPassword: 1,
                repass: 1,
            },
            isLoading: false
        }
    },
    methods: {
        cancelEditing() {
            return useEditModeStore().disableEditMode();
        },
        async onChangePasswordSubmit() {
            try {
                if (confirm("Are You sure You want to change Your password?")) {
                    this.isLoading = true;
                    const user = await editProfile(this.formData)
                    useAuthenticatedStore().setUserObj(user);
                    return useEditModeStore().disableEditMode();
                }
            } catch (error) {
                alert(error.message);
            } finally {
                this.isLoading = false;
            }
        },
        validatePassword,
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