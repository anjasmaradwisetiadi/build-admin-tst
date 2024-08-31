import { defineStore } from 'pinia'
import instanceAxios from '@/utilize/InstanceAxios'
import { useRouter } from 'vue-router';
import message from '@/presets/aura/message';

export const useCouponStore = defineStore('coupon', {
  state : () =>{
    return {
      loading: false,
      ordersResponse: null,
      detailResponse: null,
      errorResponse: null,
    }
  },

  actions:{

    async orderList(params){
      this.loading = true;
      // it need params filter and sort on coupoun  
      await instanceAxios.get(`customer-service/v1/orders?${params.concatFilterParams}`)
          .then((response)=>{
              this.ordersResponse = response.data
              this.loading = false;
          })
          .catch((error)=>{
              const errorMessage = error?.response?.data?.errors
              let getMessage = ''
              for(let x in errorMessage){
                return getMessage = errorMessage[x]
              }
              const payloadError= {
                status: true,
                message: getMessage
              }

              this.errorResponse = payloadError
              this.loading = false;
          })
    },

    async orderDetail(id){
        this.loading = true;
        // it need params filter and sort on coupoun  
        await instanceAxios.get(`customer-service/v1/orders/${id}`)
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
