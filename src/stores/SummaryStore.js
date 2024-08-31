import { defineStore } from 'pinia'
import instanceAxios from '@/utilize/InstanceAxios'
import { useRouter } from 'vue-router';

export const useListStore = defineStore('list', {
  state : () =>{
    return {
      loading: false,
      monthlyResponse: null,
      yearlyResponse: null,
      orderComparisonResponse: null,
      topProductResponse: null,
      topBuyerResponse: null,
      topStoreResponse: null,
    }
  },

  actions:{

    async monthlyOrder(params){
      this.loading = true;
      // it need params filter and sort on monthly order 
      await instanceAxios.get(`common/v1/summaries/orders/monthly${params}`)
          .then((response)=>{
              this.monthlyResponse = response.data
              this.loading = false;
          })
          .catch((error)=>{
              this.errorResponse = true
              this.loading = false;
          })
    },
    async yearlyOrder(params){
        this.loading = true;
        // it need params filter and sort on monthly order 
        await instanceAxios.get(`common/v1/summaries/orders/yearly${params}`)
            .then((response)=>{
                this.yearlyResponse = response.data
                this.loading = false;
            })
            .catch((error)=>{
                this.errorResponse = true
                this.loading = false;
            })
    },

    async orderComparison(){
        this.loading = true;
        // it need params filter and sort on monthly order 
        await instanceAxios.get(`common/v1/summaries/orders/comparison`)
            .then((response)=>{
                this.orderComparisonResponse = response.data
                this.loading = false;
            })
            .catch((error)=>{
                this.errorResponse = true
                this.loading = false;
            })
    },

    async topProduct(params){
        this.loading = true;
        // it need params filter and sort on monthly order 
        await instanceAxios.get(`common/v1/summaries/top/products${params}`)
            .then((response)=>{
                this.topProductResponse = response.data
                this.loading = false;
            })
            .catch((error)=>{
                this.errorResponse = true
                this.loading = false;
            })
    },

    async topBuyer(params){
        this.loading = true;
        // it need params filter and sort on monthly order 
        await instanceAxios.get(`common/v1/summaries/top/buyers${params}`)
            .then((response)=>{
                this.topBuyerResponse = response.data
                this.loading = false;
            })
            .catch((error)=>{
                this.errorResponse = true
                this.loading = false;
            })
    },

    async topStore(params){
        this.loading = true;
        // it need params filter and sort on monthly order 
        await instanceAxios.get(`common/v1/summaries/top/stores${params}`)
            .then((response)=>{
                this.topStoreResponse = response.data
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
