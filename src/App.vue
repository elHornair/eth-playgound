<template>
  <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
    <HelloWorld erc20Address="0xf894289f63b0b365485cee34aa50681f295f84b4"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
