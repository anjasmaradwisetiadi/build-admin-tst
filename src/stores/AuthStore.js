import { defineStore } from 'pinia'
import instanceAxios from '@/utilize/InstanceAxios'
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', {
  state : () =>{
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

  actions:{
    async login(payload) {
        this.loading = true;
        await instanceAxios.post('auth/login', payload)
            .then((resp)=>{
                this.loginResponse = resp
                const makeExpiredTime = this.makeExpiredTime(1399);
                let payload = {
                    'expired_time': makeExpiredTime,
                    ...resp.data
                }
                localStorage.setItem('user', JSON.stringify(payload));
                this.loading = false;
            })
            .catch((error)=>{
                this.loginResponse = error.response
                this.loading = false;
            })
    },

    makeExpiredTime(expiresInMinutes){
        const now = new Date();
        const expirationTime = now.getTime() + expiresInMinutes * 6000; // Convert minutes to milliseconds
        return expirationTime
    },

    async logout(){
        this.loading = true;
        await instanceAxios.post('auth/logout')
            .then((resp)=>{
                this.logoutResponse = resp
                localStorage.removeItem('user');
                this.loading = false;
            })
            .catch((error)=>{
                this.logoutResponse = error.response
                this.loading = false;
            })
    },

    checkUserExpired(){
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
        const expirationTime = user?.expired_time;
        const now = new Date().getTime();
        return now > expirationTime;
    },

    autoLogout(){
        const router = useRouter();
        if(this.checkUserExpired()){
            localStorage.removeItem('user');
            return router.push('/login');
        }
        return localStorage.getItem('user')
    },

    async profile(){
      this.loading = true;

      await instanceAxios.get(`auth/profile`)
          .then((response)=>{
              this.profileResponse = response.data
              this.loading = false;
          })
          .catch((error)=>{
              this.errorResponse = true
              this.loading = false;
          })
    },

    async profileUpdate(payload){
      this.loading = true;

      await instanceAxios.post(`auth/profile`, payload)
          .then((response)=>{
              this.updateProfileResponse = response.data
              this.loading = false;
          })
          .catch((error)=>{
              this.errorResponse = true
              this.loading = false;
          })
    },

    async passwordUpdate(payload){
      this.loading = true;

      await instanceAxios.post(`auth/password`, payload)
          .then((response)=>{
              this.updatePasswordResponse = response.data
              this.loading = false;
          })
          .catch((error)=>{
              this.errorResponse = true
              this.loading = false;
          })
    },


  },

  getters: {
    getterLoading(state) {
        return state.loading;
    }
  }
})
