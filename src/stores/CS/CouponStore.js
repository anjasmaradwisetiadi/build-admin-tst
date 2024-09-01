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
      errorResponse: null
    }
  },

  actions:{

    async couponList(params){
      this.loading = true;
      // it need params filter and sort on coupoun  
      await instanceAxios.get(`customer-service/v1/coupons?${params.concatFilterParams}`)
          .then((response)=>{
              this.couponResponse = response.data
              this.loading = false;
              this.resetData()
          })
          .catch((error)=>{
            this.errorResponse = this.generateError(error)
            this.loading = false;
          })
    },

    async exportCoupon(params){
        this.loading = true;
        // it need params filter and sort on coupoun  
        await instanceAxios.get(`customer-service/v1/coupons${params}`)
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
        await instanceAxios.get(`customer-service/v1/coupons/${id}`)
            .then((response)=>{
                this.detailResponse = response.data
                this.loading = false;
            })
            .catch((error)=>{
                this.errorResponse = this.generateError(error)
                this.loading = false;
            })
    },

    async couponCreate(payload) {
        this.loading = true;
        await instanceAxios.post('customer-service/v1/coupons', payload)
            .then((response)=>{
                const payload = {
                    status: true,
                    message: 'create'
                }
                this.createResponse = payload
                this.loading = false;
            })
            .catch((error)=>{
                this.errorResponse = this.generateError(error)
                this.loading = false;
            })
    },

    async couponEdit(id, payload) {
        this.loading = true;
        await instanceAxios.put(`customer-service/v1/coupons/${id}`, payload)
            .then((response)=>{
                const payload = {
                    status: true,
                    message: 'update'
                }
                this.updateResponse = payload;
                this.loading = false;
            })
            .catch((error)=>{
                this.errorResponse = this.generateError(error)
                this.loading = false;
            })
    },

    resetData(){
        this.updateResponse = null;
        this.detailResponse = null;
        this.createResponse = null;
        this.errorResponse = null;
    },
    
    generateError(error){
        const errorMessage = error?.response?.data?.errors
        let getMessage = ''
        for(let x in errorMessage){
          return getMessage = errorMessage[x]
        }
        const payloadError= {
          status: true,
          message: getMessage
        }

        return payloadError
    }
  },

  getters: {
    getterLoading(state) {
        return state.loading;
    }
  }
})
