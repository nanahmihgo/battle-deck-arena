import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [],
    }),
    getters: {

    },
    actions: {
        async fetchUsers() {
            const response = await fetch('url');
            this.users = await response.json();
        },
    },

});