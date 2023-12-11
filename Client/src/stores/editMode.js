import { defineStore } from "pinia";

export const useEditModeStore = defineStore("editMode", {
    state: () => ({ editMode: false }),
    actions: {
        enableEditMode() {
            this.editMode = true;
        },
        disableEditMode() {
            this.editMode = false;
        }
    }
});