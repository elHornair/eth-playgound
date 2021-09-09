<template>
  <div>
    <div class="max-w-screen-sm shadow overflow-hidden border-b border-gray-200 sm:rounded-lg px-6 py-4 bg-white text-left">
      <h2 class="text-2xl mb-8">New Transaction</h2>

      <ul>
        <li>{{ name }}</li>
        <li>{{ address }}</li>
        <li>{{ privateKey }}</li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Transaction',
  props: {
    web3: null,
    name: String,
    address: String,
    privateKey: String
  },
  created() {
    console.log('hello transaction world');
  }
}
</script>
