<template>
  <div>
    <div class="flex justify-end mt-12 w-2/4 h-0">
      <div
        class="
          flex-shrink-0
          w-24
          h-24
          sm:w-36 sm:h-36
          border border-gray-200
          rounded-full
          overflow-hidden
          border-gray-200
          shadow
          transform
          translate-x-2/4
          -translate-y-1/4
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
      <div class="flex justify-end">
        <button
          type="button"
          class="font-medium text-indigo-600 hover:text-indigo-500"
          :class="{ hidden: editing }"
          @click="handleEditClick"
        >
          Edit
        </button>
        <button
          type="button"
          class="font-medium text-indigo-600 hover:text-indigo-500"
          :class="{ hidden: !editing }"
          @click="handleEditAbortClick"
        >
          Abort
        </button>
        <button
          type="button"
          class="
            bg-indigo-600
            border border-transparent
            rounded-md
            py-1
            px-2
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
            ml-2
            -mt-2
            -mb-1
          "
          :class="{ hidden: !editing }"
          @click="handleEditSafe"
        >
          Save
        </button>
      </div>
      <div class="mt-12 sm:mt-24 flex justify-center">
        <h1
          v-if="editing"
          ref="accountNameTemp"
          class="
            bg-gray-100
            border-transparent
            focus:border-gray-500 focus:bg-white focus:ring-0
            px-3
            py-1
            -my-1
            text-2xl
          "
          contenteditable
          @keypress.enter="handleEditSafe"
        >
          {{ account.name }}
        </h1>
        <h1 v-else class="text-2xl">
          {{ account.name }}
        </h1>
      </div>

      <div class="text-center">
        <span class="block text-sm text-gray-500 mt-2">
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

      <div class="flex justify-center mt-7 mb-8">
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
          @click="handleSendClick"
        >
          Send
        </button>
      </div>

      <TransactionList class="mt-4 mb-2" :account="account"> </TransactionList>

      <div class="flex justify-end">
        <button
          type="button"
          class="
            mt-8
            float-right
            bg-red-600
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
            hover:bg-red-700
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-red-500
            -mr-2
          "
          @click="handleRemoveAccountClick"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TransactionList from '@/components/TransactionList';

export default {
  name: 'Account',
  components: {
    TransactionList,
  },
  data() {
    return {
      account: undefined,
      editing: false,
    };
  },
  computed: {
    ...mapGetters('accounts', {
      getAccountByAddress: 'getByAddress',
    }),
  },
  created() {
    this.account = this.getAccountByAddress(this.$route.params.address);
    this.$store.dispatch(
      'accounts/updateAccountBalancesFromBlockchain',
      this.account
    );
  },
  methods: {
    handleEditClick() {
      this.editing = true;

      window.requestAnimationFrame(() => {
        const $accountNameEl = this.$refs.accountNameTemp;

        $accountNameEl.focus();

        window
          .getSelection()
          .collapse($accountNameEl.firstChild, $accountNameEl.innerText.length);
      });
    },
    handleEditAbortClick() {
      this.editing = false;
    },
    handleEditSafe() {
      this.$store.commit({
        type: 'accounts/updateAccountName',
        address: this.account.address,
        name: this.$refs.accountNameTemp.innerText,
      });

      this.editing = false;
    },
    handleSendClick() {
      this.$emit('newTransactionRequested', {
        account: this.getAccountByAddress(this.account.address),
      });
    },
    handleRemoveAccountClick() {
      if (
        window.confirm('Are you sure? You will loose access to your funds.')
      ) {
        this.$store.commit({
          type: 'accounts/removeAccount',
          accountAddress: this.account.address,
        });

        window.alert(
          'Account deleted. You will be redirected to the accounts page now.'
        );

        this.$router.push({ name: 'accounts' });
      }
    },
  },
};
</script>
