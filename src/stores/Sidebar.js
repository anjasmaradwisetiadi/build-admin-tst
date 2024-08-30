import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSidebarControlStore = defineStore('sidebarControl', {
  state : () =>{
    return {
      open: true,
    }
  },

  actions:{
    sidebarIsOpen(val) {
        console.log("val = ")
        console.log(val)
      this.open = val
    },
  },

  getters: {
    getterOpen() {
        return this.open;
    }
  }

})
