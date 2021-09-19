<template>
  <div>
    <h2 class="font-medium text-gray-900">Transactions</h2>
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            class="
              shadow
              overflow-hidden
              border-b border-gray-200
              sm:rounded-lg
            "
          >
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="
                      px-6
                      py-3
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    Time
                  </th>
                  <th
                    scope="col"
                    class="
                      px-6
                      py-3
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    From / To
                  </th>
                  <th
                    scope="col"
                    class="
                      px-6
                      py-3
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    Amount
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="transaction in transactions" :key="transaction.hash">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      {{ transaction.time }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ transaction.date }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img
                          class="h-10 w-10 rounded-full"
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                          alt=""
                        />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ transaction.account.name }}
                        </div>
                        <div class="text-sm text-gray-500 w-36 truncate">
                          {{ transaction.account.address }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td
                    class="
                      px-6
                      py-4
                      whitespace-nowrap
                      text-sm text-gray-500 text-right
                    "
                  >
                    {{ transaction.value }} ETH
                  </td>
                  <td
                    class="
                      px-6
                      py-4
                      whitespace-nowrap
                      text-right text-sm
                      font-medium
                    "
                  >
                    <a
                      :href="`https://kovan.etherscan.io/tx/${transaction.hash}`"
                      class="text-indigo-600 hover:text-indigo-900"
                      >Details</a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TransactionList',
  props: {
    account: undefined,
  },
  computed: {
    ...mapGetters('accounts', {
      getFormattedTransactions: 'getFormattedTransactions',
    }),
  },
  data() {
    return {
      transactions: [],
    };
  },
  created() {
    this.$store.dispatch(
      'accounts/updateAccountTransactionsFromBlockchain',
      this.account
    );

    this.transactions = this.getFormattedTransactions(this.account.address);
    // TODO: add a nice arrow that indicates if transaction is outgoing or incoming
    // TODO: date should be bold, time should not be bold I think
    // TODO: do something nice where today's date is displayed as "today" etc? same with time? -> library?
  },
};
</script>
