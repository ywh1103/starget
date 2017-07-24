<template>
  <div id="app">
    <router-view @to-parent="getUser"></router-view>
  </div>
</template>

<script>
    import login from './component/login.vue'
    import header from './component/header.vue'
    export default {
        name:'app',
        methods:{
            getUser:function(res){

            }
        }
    }
</script>

<style lang="scss">

</style>
