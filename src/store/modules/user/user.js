import { defineStore } from 'pinia';
import {user_api} from '@/axios'

export const useUserStore = defineStore('user', {
    state: () => ({
        id: null,
        name: null,
        email: null,
        duration: null,
        myReservedBooks: []
    }),
    getters: {
        userId: (state) => state.id || '',
        isLoggedIn: (state) => !!state.id,
        userName: (state) => state.name || '',
        userEmail: (state) => state.email || '',
        lendingDuration: (state) => state.duration || 28,
        reservedBooks: (state) => state.myReservedBooks || []
    },
    actions: {
        async fetchUser() {
            try {
                const response = await user_api.get('/current_user');
                await this.setUserValues(response.data);
            } catch (error) {
                console.log('Error while fetching user to vue', error);
                await this.resetUserValues();
            }
        },
        async registerUser(payload) {
            try {
                const response = await user_api.post('/register', payload);
                if (response.status === 201) {
                    const resData = response.data;
                    await this.setUserValues(resData.data);
                    return true;
                }
            } catch (error) {
                console.log('Failed to send new user data to backend', error);
            }
        },
        async login(userData) {
            try {
                const response = await user_api.post('/login', userData);
                if (response.status === 202) {
                    await this.setUserValues(response.data);
                    return true;
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    alert("Invalid e-mail or password. Please try again.")
                } else {
                console.log('Error while logging user in', error);
                }
            }
            return false;
        },
        async logout() {
            try {
                const response = await user_api.post('/logout');
                if (response.status === 200 && !response.data.authenticated) {
                    await this.resetUserValues()
                    return true;
                }
            } catch (error) {
                console.error("Logout failed:", error);
            }
        },
        async resetUserValues() {
            this.id = null;
            this.name = null;
            this.email = null;
            this.duration = null;
        },
        async setUserValues(data) {
            this.id = data.id;
            this.name = data.name;
            this.email = data.email;
            this.duration = data.duration;
        },
        async setLendingDuration(payload) {
            try {
                const response = await user_api.patch(`/change_duration/${this.userId}`, {duration: payload});
                if (response.status === 200) {
                    this.duration = payload.duration;
                    return true;
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
});

export default useUserStore;