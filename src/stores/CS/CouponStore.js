import { defineStore } from 'pinia'
import instanceAxios from '@/utilize/InstanceAxios'
import { useRouter } from 'vue-router';

export const useCouponStore = defineStore('coupon', {
  state : () =>{
    return {
      loading: false,
      couponResponse: null,
      exportCoupounListResponse: null,
      detailResponse: null,
      createResponse: null,
      updateResponse: null,
    }
  },

  actions:{

    async couponList(params){
      this.loading = true;
      // it need params filter and sort on coupoun  
      await instanceAxios.get(`coupons${params}`)
          .then((response)=>{
              this.couponResponse = response.data
              this.loading = false;
          })
          .catch((error)=>{
              this.errorResponse = true
              this.loading = false;
          })
    },

    async exportCoupon(params){
        this.loading = true;
        // it need params filter and sort on coupoun  
        await instanceAxios.get(`coupons${params}`)
            .then((response)=>{
                this.exportCoupounListResponse = response.data
                this.loading = false;
            })
            .catch((error)=>{
                this.errorResponse = true
                this.loading = false;
            })
    },

    async couponDetail(id){
        this.loading = true;
        // it need params filter and sort on coupoun  
        await instanceAxios.get(`coupons/${id}`)
            .then((response)=>{
                this.detailResponse = response.data
                this.loading = false;
            })
            .catch((error)=>{
                this.errorResponse = true
                this.loading = false;
            })
    },

    async couponCreate(payload) {
        this.loading = true;
        await instanceAxios.post('coupons', payload)
            .then((response)=>{
                this.createResponse = response.data
                this.loading = false;
            })
            .catch((error)=>{
                this.errorResponse = true
                this.loading = false;
            })
    },

    async couponEdit(id, payload) {
        this.loading = true;
        await instanceAxios.patch(`coupons/${id}`, payload)
            .then((response)=>{
                this.updateResponse = response.data;
                this.loading = false;
            })
            .catch((error)=>{
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
