import { defineStore } from 'pinia';
import {ref} from "vue";

export const useSearchStore = defineStore('search', () => {
    const searchInput = ref('');

    return { searchInput };
});