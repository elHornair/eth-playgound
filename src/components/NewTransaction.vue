<template>
  <div class="mb-4 max-w-screen-sm shadow overflow-hidden border-b border-gray-200 sm:rounded-lg px-6 py-4 bg-white text-left">
    <h2 class="text-2xl mb-8">New Transaction</h2>

    <ul>
      <li>{{ name }}</li>
      <li>{{ address }}</li>
      <li>{{ privateKey }}</li>
    </ul>

    <div class="flex justify-end">
      <button
          type="button"
          class="mt-8 mr-2 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Abort
      </button>

      <button
          type="button"
          class="mt-8 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Send
      </button>
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
