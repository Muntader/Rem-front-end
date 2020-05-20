<template>
  <div class="app">
       <div class="app-layout">

            <div class="app-layout__sidebar">
                   <sidebar></sidebar>
            </div>

            <div class="app-layout__body">
                <div class="app-layout__body--header">
                    <navbar></navbar>
                </div>

                <div class="app-layout__body--content">    
                  <nuxt />
                </div>
            </div>

       </div>

  </div>
</template>
<script>
import sidebar from "~/layouts/sidebar.vue"
import navbar from "~/layouts/navbar.vue"
export default {
    data() {
        return {
        
        }
    },

    components: {
        sidebar,
        navbar
    }
}

</script>
