<template>
  <div class="mb-4 max-w-screen-sm shadow overflow-hidden border-b border-gray-200 sm:rounded-lg px-6 py-4 bg-white text-left">
    <h2 class="text-2xl mb-8">New Transaction</h2>

    <ul>
      <li>{{ name }}</li>
      <li>{{ address }}</li>
      <li>{{ privateKey }}</li>
    </ul>

    <form action="#" method="POST">
      <div class="grid grid-cols-6 gap-6">
        <div class="col-span-6">
          <label for="recipient-address" class="block text-sm font-medium text-gray-700">Recipient Address</label>
          <input type="text" name="recipient-address" id="recipient-address" autocomplete="nothing" class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0">
        </div>
        <div class="col-span-6">
          <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
          <input type="number" step="0.01" min="0" max="10" name="amount" id="amount" autocomplete="nothing" class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0">
        </div>
      </div>

      <div class="flex justify-end">
        <button
            type="button"
            class="mt-8 mr-2 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Abort
        </button>

        <button
            type="submit"
            class="mt-8 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Send
        </button>
      </div>
    </form>
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
