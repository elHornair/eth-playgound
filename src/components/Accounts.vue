<template>
  <div class="box">
    <h2 class="box__title">My Accounts</h2>

    <ul role="list" class="-my-6 divide-y divide-gray-200">
      <li
        v-for="account in accounts"
        :key="account.address + '-' + account.balance"
        class="py-6 flex"
      >
        <div
          class="
            flex-shrink-0
            w-24
            h-24
            border border-gray-200
            rounded-md
            overflow-hidden
          "
        >
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
            alt="Profile picture"
            class="w-full h-full object-center object-cover"
          />
        </div>
        <div class="ml-4 flex-1 flex flex-col">
          <div>
            <div
              class="flex justify-between text-base font-medium text-gray-900"
            >
              <h3>
                <router-link
                  :to="{
                    name: 'account',
                    params: { address: account.address },
                  }"
                  >{{ account.name }}</router-link
                >
              </h3>
              <p v-if="account.balance" class="ml-4">
                {{ account.balance }} ETH
              </p>
            </div>
            <p class="mt-1 text-sm text-gray-500">
              {{ account.address }}
            </p>
          </div>
          <div class="flex-1 flex items-end justify-between text-sm">
            <p class="text-gray-500">
              <button
                type="button"
                class="font-medium text-indigo-600 hover:text-indigo-500"
                @click="sendFromAccount(account.address)"
              >
                Send
              </button>
            </p>
            <div class="flex">
              <button
                type="button"
                class="font-medium text-indigo-600 hover:text-indigo-500"
                @click="removeAccount(account.address)"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <button
      type="button"
      class="
        mt-8
        float-right
        bg-indigo-600
        border border-transparent
        rounded-md
        py-3
        px-8
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
      "
      @click="addAccount"
    >
      Add Account
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Accounts',
  props: {
    web3: {
      type: Object,
      default: undefined,
    },
  },
  computed: {
    ...mapGetters('accounts', {
      accounts: 'all',
      totalAccounts: 'total',
      getAccountByAddress: 'getByAddress',
    }),
  },
  created() {
    this.accounts.forEach((account) => {
      this.web3.eth.getBalance(account.address, (err, wei) => {
        this.$store.commit({
          type: 'accounts/updateAccountBalance',
          accountAddress: account.address,
          accountBalance: Number.parseFloat(
            this.web3.utils.fromWei(wei, 'ether')
          ).toPrecision(2),
        });
      });
    });
  },
  methods: {
    addAccount() {
      const newAccount = this.web3.eth.accounts.create();
      newAccount.name = `My Account ${this.totalAccounts + 1}`;

      this.web3.eth.getBalance(newAccount.address, (err, wei) => {
        newAccount.balance = Number.parseFloat(
          this.web3.utils.fromWei(wei, 'ether')
        ).toPrecision(2);

        this.$store.commit({
          type: 'accounts/addAccount',
          newAccount: newAccount,
        });
      });
    },
    removeAccount(address) {
      if (
        window.confirm('Are you sure? You will loose access to your funds.')
      ) {
        this.$store.commit({
          type: 'accounts/removeAccount',
          accountAddress: address,
        });
      }
    },
    sendFromAccount(address) {
      this.$emit('newTransactionRequested', {
        account: this.getAccountByAddress(address),
      });
    },
  },
};
</script>
