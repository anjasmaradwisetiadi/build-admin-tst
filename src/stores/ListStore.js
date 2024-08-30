import { defineStore } from 'pinia'
import instanceAxios from '@/utilize/InstanceAxios'
import { useRouter } from 'vue-router';

export const useListStore = defineStore('list', {
  state : () =>{
    return {
      loading: false,
      citiesResponse: null,
      couponsResponse: null,
      buyersResponse: null,
      storesResponse: null
    }
  },

  actions:{

    async city(){
      this.loading = true;

      await instanceAxios.get(`lists/cities`)
          .then((response)=>{
              this.citiesResponse = response.data
              this.loading = false;
          })
          .catch((error)=>{
              this.errorResponse = true
              this.loading = false;
          })
    },
    async coupun(){
        this.loading = true;
  
        await instanceAxios.get(`lists/coupons`)
            .then((response)=>{
                this.couponsResponse = response.data
                this.loading = false;
            })
            .catch((error)=>{
                this.errorResponse = true
                this.loading = false;
            })
    },

    
    async buyer(){
        this.loading = true;
  
        await instanceAxios.get(`lists/buyers`)
            .then((response)=>{
                this.buyersResponse = response.data
                this.loading = false;
            })
            .catch((error)=>{
                this.errorResponse = true
                this.loading = false;
            })
    },

    async stores(){
        this.loading = true;
  
        await instanceAxios.get(`lists/stores`)
            .then((response)=>{
                this.storesResponse = response.data
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
