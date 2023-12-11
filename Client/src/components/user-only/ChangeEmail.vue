<template>
    <section class="edit-email">
        <form @submit.prevent="onChangeEmailSubmit">
            <h2>Change email</h2>
            <label for="old-email">Old email</label>
            <input type="text" id="old-email" name="old-email" v-model="formData.oldEmail"
                @blur="onBlurValidateField(formData.oldEmail, validateEmail, 'oldEmail', $event)">

            <p class="error">...</p>

            <label for="new-email">New email</label>
            <input type="text" id="new-email" name="new-email" v-model="formData.newEmail"
                @blur="onBlurValidateField(formData.newEmail, validateEmail, 'newEmail', $event)">

            <p class="error">...</p>

            <label for="reemail">Repeat new email</label>
            <input type="text" id="reemail" name="reemail" v-model="formData.reEmail"
                @blur="onBlurValidateReemail([formData.newEmail, formData.reEmail], 'reEmail', $event)">

            <p class="error">...</p>

            <button type="submit" class="add-submit-btn" :disabled="validateBeforeSubmit">Change email</button>
            <button type="button" class="edit-cancel-btn" @click="cancelEditing">Cancel</button>
        </form>
    </section>
</template>

<script>
import { useAuthenticatedStore } from '../../stores/authenticated';
import { validateEmail } from '../../util/validator';
import { editProfile } from '../../services/userService';
import { useEditModeStore } from '../../stores/editMode';
export default {
    data() {
        return {
            formData: {
                oldEmail: '',
                newEmail: '',
                reEmail: '',
            },
            errorStack: {
                oldEmail: 1,
                newEmail: 1,
                reEmail: 1,
            }
        };
    },
    methods: {
        cancelEditing() {
            return useEditModeStore().disableEditMode();
        },
        async onChangeEmailSubmit() {
            try {
                if (confirm("Are You sure You want to change Your email?")) {
                    const user = await editProfile(this.formData);
                    useAuthenticatedStore().setUserObj(user);
                    return useEditModeStore().disableEditMode();
                }
            }
            catch (error) {
                alert(error.message);
            }
        },
        validateEmail,
        onBlurValidateField(value, validationFunction, errValue, event) {
            if (validationFunction(value) === true) {
                event.currentTarget.classList.add("valid");
                event.currentTarget.classList.remove("invalid");
                event.currentTarget.nextSibling.style.display = "none";
                event.currentTarget.nextSibling.textContent = "";
                this.errorStack[errValue] = 0;
            }
            else {
                event.currentTarget.classList.add("invalid");
                event.currentTarget.classList.remove("valid");
                event.currentTarget.nextSibling.style.display = "block";
                event.currentTarget.nextSibling.textContent = validationFunction(value);
                this.errorStack[errValue] = 1;
            }
        },
        onBlurValidateReemail(emails, errValue, event) {
            const [email, reemail] = emails;
            if (email === reemail && reemail) {
                event.currentTarget.classList.add("valid");
                event.currentTarget.classList.remove("invalid");
                event.currentTarget.nextSibling.style.display = "none";
                event.currentTarget.nextSibling.textContent = "";
                this.errorStack[errValue] = 0;
            }
            else {
                event.currentTarget.classList.add("invalid");
                event.currentTarget.classList.remove("valid");
                event.currentTarget.nextSibling.style.display = "block";
                event.currentTarget.nextSibling.textContent = "Repeated email does not match the new one!";
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