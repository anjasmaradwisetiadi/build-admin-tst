import { defineStore } from 'pinia'
import instanceAxios from '@/utilize/InstanceAxios'
import { useRouter } from 'vue-router';

export const useCouponStore = defineStore('coupon', {
  state : () =>{
    return {
      loading: false,
      ordersResponse: null,
      detailResponse: null,
    }
  },

  actions:{

    async orderList(params){
      this.loading = true;
      // it need params filter and sort on coupoun  
      await instanceAxios.get(`orders${params}`)
          .then((response)=>{
              this.ordersResponse = response.data
              this.loading = false;
          })
          .catch((error)=>{
              this.errorResponse = true
              this.loading = false;
          })
    },

    async orderDetail(id){
        this.loading = true;
        // it need params filter and sort on coupoun  
        await instanceAxios.get(`orders/${id}`)
            .then((response)=>{
                this.detailResponse = response.data
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
