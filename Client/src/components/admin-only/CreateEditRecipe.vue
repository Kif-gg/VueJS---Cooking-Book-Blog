<template>
    <Loader v-if="isLoading"></Loader>

    <main class="create-edit-recipe" v-else>
        <form @submit.prevent="onCreateSubmit">
            <h2 v-if="!editMode">Create recipe</h2>
            <h2 v-else>Edit recipe</h2>
            <label for="image">Image URL</label>
            <input type="text" name="image" id="image" v-model="formData.imgUrl"
                @blur="onBlurValidateField(formData.imgUrl, validateImgUrl, 'imgUrl', $event)">

            <p class="error">...</p>

            <label for="name">Dish name</label>
            <input type="text" name="name" id="name" v-model="formData.name"
                @blur="onBlurValidateField(formData.name, validateName, 'name', $event)">

            <p class="error">...</p>

            <label for="category">Dish category</label>
            <select name="category" id="category" v-model="formData.category"
                @blur="onBlurValidateField(formData.category, validateCategory, 'category', $event)">
                <option value="breakfast">Breakfast</option>
                <option value="salads">Salads</option>
                <option value="soups">Soups</option>
                <option value="main dishes">Main dishes</option>
                <option value="desserts">Desserts</option>
            </select>

            <p class="error">...</p>


            <label for="description">Dish description</label>
            <textarea name="description" id="description" rows="10" v-model="formData.description"
                @blur="onBlurValidateField(formData.description, validateDescription, 'description', $event)"></textarea>

            <p class="error">...</p>

            <label for="products">Products needed (separated by ", ")</label>
            <textarea name="products" id="products" rows="10" v-model="formData.productsNeeded"
                @blur="onBlurValidateField(formData.productsNeeded, validateProducts, 'productsNeeded', $event)"></textarea>

            <p class="error">...</p>

            <label for="cooking">Way of cooking</label>
            <textarea name="cooking" id="cooking" rows="10" v-model="formData.instructions"
                @blur="onBlurValidateField(formData.instructions, validateCooking, 'instructions', $event)"></textarea>

            <p class="error">...</p>

            <button type="submit" class="add-submit-btn" v-if="!editMode" :disabled="validateBeforeSubmit">Create new
                recipe</button>
            <button type="submit" class="edit-cancel-btn" v-else :disabled="validateBeforeSubmit">Edit recipe</button>
            <button type="submit" class="edit-cancel-btn" @click="cancel">Cancel</button>
        </form>
    </main>
</template>

<script>
import { createRecipe, editRecipe } from '../../services/adminService';
import { useEditModeStore } from '../../stores/editMode';
import { useRecipesStore } from '../../stores/recipes';
import { validateImgUrl, validateName, validateCategory, validateDescription, validateProducts, validateCooking } from '../../util/validator.js';
import Loader from '../common/Loader.vue';

export default {
    data() {
        return {
            formData: {
                imgUrl: '',
                name: '',
                category: '',
                description: '',
                productsNeeded: '',
                instructions: ''
            },
            errorStack: {
                imgUrl: 1,
                name: 1,
                category: 1,
                description: 1,
                productsNeeded: 1,
                instructions: 1
            },
            editMode: useEditModeStore().editMode,
            isLoading: false
        };
    },
    created() {
        if (this.editMode) {
            this.formData = {
                imgUrl: useRecipesStore().currentRecipe.imgUrl,
                name: useRecipesStore().currentRecipe.name,
                category: useRecipesStore().currentRecipe.category,
                description: useRecipesStore().currentRecipe.description,
                productsNeeded: useRecipesStore().currentRecipe.productsNeeded.join(", "),
                instructions: useRecipesStore().currentRecipe.instructions
            };
        }
    },
    methods: {
        cancel() {
            return this.$router.replace("/recipes");
        },
        async onCreateSubmit() {
            try {
                if (useEditModeStore().editMode) {
                    if (confirm("Are You sure You want to edit this recipe?")) {
                        this.isLoading = true;
                        await editRecipe(useRecipesStore().currentRecipe._id, this.formData);
                        useEditModeStore().disableEditMode();
                        return this.$router.replace(`/recipes/${useRecipesStore().currentRecipe._id}`);
                    }
                }
                else {
                    this.isLoading = true;
                    await createRecipe(this.formData);
                    return this.$router.push("/recipes");
                }
            }
            catch (error) {
                alert(error.message);
            }
            finally {
                this.isLoading = false;
            }
        },
        validateImgUrl,
        validateName,
        validateCategory,
        validateDescription,
        validateProducts,
        validateCooking,
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
        }
    },
    computed: {
        validateBeforeSubmit() {
            if (Object.values(this.errorStack).every(v => v <= 0)) {
                return false;
            }
            return true;
        }
    },
    components: { Loader }
}
</script>