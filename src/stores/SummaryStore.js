import { defineStore } from 'pinia'
import instanceAxios from '@/utilize/InstanceAxios'
import { useRouter } from 'vue-router';

export const useSummaryStore = defineStore('summary', {
  state : () =>{
    return {
      loadingMonthly: false,
      loadingYearly: false,
      loadingOrderComparison: false,
      loadingTopProduct: false,
      loadingTopBuyer: false,
      loadingTopStore: false,

      monthlyResponseError: null,
      yearlyResponseError: null,
      orderComparisonResponseError: null,
      topProductResponseError: null,
      topBuyerResponseError: null,
      topStoreResponseError: null,

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
      this.loadingMonthly = true;
      // it need params filter and sort on monthly order 
      await instanceAxios.get(`common/v1/summaries/orders/monthly${params}`)
          .then((response)=>{
              this.monthlyResponse = response.data
              this.loadingMonthly = false;
          })
          .catch((error)=>{
              this.monthlyResponseError = true
              this.loadingMonthly = false;
          })
    },
    async yearlyOrder(params){
        this.loadingYearly = true;
        // it need params filter and sort on monthly order 
        await instanceAxios.get(`common/v1/summaries/orders/yearly${params}`)
            .then((response)=>{
                this.yearlyResponse = response.data
                this.loadingYearly = false;
            })
            .catch((error)=>{
                this.yearlyResponseError = true
                this.loadingYearly = false;
            })
    },


    async orderComparison(){
        this.loadingOrderComparison = true;
        // it need params filter and sort on monthly order 
        await instanceAxios.get(`common/v1/summaries/orders/comparison`)
            .then((response)=>{
                this.orderComparisonResponse = response.data
                this.loadingOrderComparison = false;
            })
            .catch((error)=>{
                this.orderComparisonResponseError = true
                this.loadingOrderComparison = false;
            })
    },

    async topProduct(params){
        this.loadingTopProduct = true;
        // it need params filter and sort on monthly order 
        await instanceAxios.get(`common/v1/summaries/top/products${params}`)
            .then((response)=>{
                this.topProductResponse = response.data
                this.loadingTopProduct = false;
            })
            .catch((error)=>{
                this.topProductResponseError = true
                this.loadingTopProduct = false;
            })
    },

    async topBuyer(params){
        this.loadingTopBuyer = true;
        // it need params filter and sort on monthly order 
        await instanceAxios.get(`common/v1/summaries/top/buyers${params}`)
            .then((response)=>{
                this.topBuyerResponse = response.data
                this.loadingTopBuyer = false;
            })
            .catch((error)=>{
                this.topBuyerResponseError = true
                this.loadingTopBuyer = false;
            })
    },

    async topStore(params){
        this.loadingTopStore = true;
        // it need params filter and sort on monthly order 
        await instanceAxios.get(`common/v1/summaries/top/stores${params}`)
            .then((response)=>{
                this.topStoreResponse = response.data
                this.loadingTopStore = false;
            })
            .catch((error)=>{
                this.topStoreResponseError = true
                this.loadingTopStore = false;
            })
    },
  },

  getters: {
    getterLoading(state) {
        return state.loading;
    }
  }
})
