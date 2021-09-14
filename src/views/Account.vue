<template>
  <div>
    <div class="flex justify-center transform translate-y-3/4 -mt-28">
      <div
        class="
          flex-shrink-0
          w-36
          h-36
          border border-gray-200
          rounded-full
          overflow-hidden
          border-gray-200
          shadow
        "
      >
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
          alt="Profile picture"
          class="w-full h-full object-center object-cover"
        />
      </div>
    </div>

    <div class="box overflow-visible">
      <div class="text-center mt-28 mb-8">
        <h1 class="box__title">{{ account.name }}</h1>
        <span class="block text-sm text-gray-500 -mt-7">
          {{ account.address }}
        </span>
        <span
          class="
            block
            text-3xl
            font-extrabold
            tracking-tight
            text-gray-900
            sm:text-4xl
            mt-3
          "
        >
          {{ account.balance }} ETH
        </span>
      </div>
      <div class="flex justify-center mb-8">
        <button
          type="button"
          class="
            bg-indigo-600
            border border-transparent
            rounded-md
            py-2
            px-5
            flex
            items-center
            justify-center
            text-base
            font-medium
            text-white
            hover:bg-indigo-700
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-indigo-500
            text-center
            mr-2
          "
        >
          Top-Up
        </button>
        <button
          type="button"
          class="
            bg-indigo-600
            border border-transparent
            rounded-md
            py-2
            px-5
            flex
            items-center
            justify-center
            text-base
            font-medium
            text-white
            hover:bg-indigo-700
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-indigo-500
            text-center
          "
        >
          Send
        </button>
      </div>

      <h2 class="font-medium text-gray-900 mt-4 mb-2">Transactions</h2>
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
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
                  <tr v-for="transaction in transactions" :key="transaction.id">
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
                      {{ transaction.amount }} ETH
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
                        :href="`https://kovan.etherscan.io/tx/${transaction.id}`"
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Account',
  data() {
    return {
      account: undefined,
      transactions: [
        // TODO: get this from the blockchain instead of using dummy data
        {
          id: '0xe07b6124d04608f5c6a946e54311da41ca78cd2714a523d2e6b6d2be6723f416',
          time: '13:42',
          date: '06.04.2021',
          account: {
            name: 'Unknown',
            address: '0x99371827EA20eFC38a16Ca4841c14185c4a89dBA',
          },
          amount: '-0.00001',
        },
        {
          id: '0x99d27124d04608f5c6a946e54311da41ca78cd2714a523d2e6b6d2be6723f416',
          time: '06:11',
          date: '02.01.2021',
          account: {
            name: 'Moxie Marlinspike',
            address: '0xkd83b227EA20eFC38a16Ca4841c14185c4a89dBA',
          },
          amount: '0.0002',
        },
        {
          id: '0xk842b524d04608f5c6a946e54311da41ca78cd2714a523d2e6b6d2be6723f416',
          time: '20:44',
          date: '06.12.2020',
          account: {
            name: 'John Doe',
            address: '0x8s921027EA20eFC38a16Ca4841c14185c4a89dBA',
          },
          amount: '-0.00002',
        },
      ],
    };
  },
  computed: {
    ...mapGetters('accounts', {
      getAccountByAddress: 'getByAddress',
    }),
  },
  created() {
    this.account = this.getAccountByAddress(this.$route.params.address);
  },
};
</script>
