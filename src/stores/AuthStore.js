import {
	defineStore
} from 'pinia'
import instanceAxios from '@/utilize/InstanceAxios'
import {
	useRouter
} from 'vue-router';

export const useAuthStore = defineStore('auth', {
	state: () => {
		return {
			loading: false,
			loginResponse: null,
			logoutResponse: null,
			profileResponse: null,
			createResponse: null,
			detailResponse: null,
			updateProfileResponse: null,
			updatePasswordResponse: null,
			deleteResponse: null,
			errorResponse: false
		}
	},

	actions: {
		async login(payload) {
			this.loading = true;
			await instanceAxios.post('common/v1/auth/login', payload)
				.then((resp) => {
					this.errorResponse = null
					this.loginResponse = resp
					const makeExpiredTime = this.makeExpiredTime(1399);
					let payload = {
						'expired_time': makeExpiredTime,
						...resp.data
					}
					localStorage.setItem('user', JSON.stringify(payload));
					this.loading = false;
				})
				.catch((error) => {
					const errorMessage = error?.response?.data
					const payloadError = {
						status: error?.response?.status,
						message: errorMessage?.response_message
					}
					this.loginResponse = payloadError
					this.errorResponse = payloadError
					this.loading = false;
				})
		},

		makeExpiredTime(expiresInMinutes) {
			const now = new Date();
			const expirationTime = now.getTime() + expiresInMinutes * 6000; // Convert minutes to milliseconds
			return expirationTime
		},

		async logout() {
			this.loading = true;
			await instanceAxios.post('common/v1/auth/logout')
				.then((resp) => {
					this.logoutResponse = resp
					localStorage.removeItem('user');
					this.loading = false;
				})
				.catch((error) => {
					this.logoutResponse = error.response
					this.loading = false;
				})
		},

		checkUserExpired() {
			const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
			const expirationTime = user?.expired_time;
			const now = new Date().getTime();
			return now > expirationTime;
		},

		autoLogout() {
			const router = useRouter();
			if (this.checkUserExpired()) {
				localStorage.removeItem('user');
				return router.push('/login');
			}
			return localStorage.getItem('user')
		},

		async profile() {
			this.loading = true;

			await instanceAxios.get(`common/v1/auth/profile`)
				.then((response) => {
					this.profileResponse = response.data
					this.loading = false;
                    this.resetData();
				})
				.catch((error) => {
					this.errorResponse = this.generateError(error)
					this.loading = false;
				})
		},

		async profileUpdate(payload) {
			this.loading = true;

			await instanceAxios.post(`common/v1/auth/profile`, 
                payload,
                {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
				.then((response) => {
					const payload = {
						status: true,
						message: 'update_profile'
					}
					this.updateProfileResponse = payload
					this.loading = false;
				})
				.catch((error) => {
					this.errorResponse = true
					this.loading = false;
				})
		},

		async passwordUpdate(payload) {
			this.loading = true;

			await instanceAxios.put(`common/v1/auth/password`, payload)
				.then((response) => {
					console.log("response = ")
					console.log(response)
					const payload = {
						status: true,
						message: 'update_password'
					}
					this.updatePasswordResponse = payload
					this.loading = false;
				})
				.catch((error) => {
                    console.log("response = ")
					console.log(this.generateError(error))
					this.errorResponse = this.generateError(error)
					this.loading = false;
				})
		},

		generateError(error) {
			const errorMessage = error?.response?.data?.errors
			let getMessage = ''
			for (let x in errorMessage) {
				return getMessage = errorMessage[x]
			}
			const payloadError = {
				status: true,
				message: getMessage
			}

			return payloadError
		},

        resetData(){
            this.updatePasswordResponse = null;
            this.updateProfileResponse = null;
            this.errorResponse = null;
        }

	},

	getters: {
		getterLoading(state) {
			return state.loading;
		}
	}
})