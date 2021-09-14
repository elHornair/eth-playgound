<template>
  <div class="box">
    <h1 class="box__title">New Transaction</h1>

    <form action="#" method="POST" @submit.prevent="handleFormSubmit">
      <div class="grid grid-cols-6 gap-6">
        <div class="col-span-6">
          <label for="recipient" class="block text-sm font-medium text-gray-700"
            >Recipient Address</label
          >
          <input
            id="recipient"
            v-model.trim="recipient"
            type="text"
            name="recipient"
            autocomplete="nothing"
            class="
              mt-1
              block
              w-full
              rounded-md
              bg-gray-100
              border-transparent
              focus:border-gray-500 focus:bg-white focus:ring-0
            "
          />
        </div>
        <div class="col-span-6">
          <label for="amount" class="block text-sm font-medium text-gray-700"
            >Amount</label
          >
          <input
            id="amount"
            v-model.number="amount"
            type="number"
            step="0.000001"
            min="0"
            max="99999"
            name="amount"
            autocomplete="nothing"
            class="
              mt-1
              block
              w-full
              rounded-md
              bg-gray-100
              border-transparent
              focus:border-gray-500 focus:bg-white focus:ring-0
            "
          />
        </div>
      </div>

      <div class="flex justify-end">
        <button
          type="button"
          class="
            mt-8
            mr-2
            bg-white
            py-2
            px-5
            border border-gray-300
            rounded-md
            shadow-sm
            text-sm
            leading-4
            text-base
            font-medium
            text-gray-700
            hover:bg-gray-50
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-indigo-500
          "
          @click="handleAbort"
        >
          Abort
        </button>

        <button
          type="submit"
          class="
            mt-8
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
          "
        >
          Send
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Web3 from 'web3';

export default {
  name: 'NewTransaction',
  props: {
    name: {
      type: String,
      default: undefined,
    },
    address: {
      type: String,
      default: undefined,
    },
    privateKey: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      web3: undefined,
      recipient: '',
      amount: 0,
    };
  },
  created() {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(
        'https://kovan.infura.io/v3/39009bec93694f98947fdfb1cffb2e30'
      )
    );
  },
  methods: {
    handleAbort() {
      this.$emit('newTransactionFinished');
    },
    async handleFormSubmit() {
      const nonce = await this.web3.eth.getTransactionCount(
        this.address,
        'latest'
      );

      const transaction = {
        to: this.recipient,
        value: this.web3.utils.toWei(this.amount.toString(10), 'ether'),
        gas: 21000,
        nonce: nonce,
      };

      const signedTx = await this.web3.eth.accounts.signTransaction(
        transaction,
        this.privateKey
      );

      this.web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        (error, hash) => {
          if (!error) {
            console.log(
              `Transaction sent. Check it here: https://kovan.etherscan.io/tx/${hash}`
            );
            alert(
              `Transaction sent. Check it here: https://kovan.etherscan.io/tx/${hash}`
            );
            this.$emit('newTransactionFinished');
          } else {
            console.log(
              'Something went wrong while submitting your transaction:',
              error
            );
            alert(
              `Something went wrong while submitting your transaction: ${error.toString()}`
            );
          }
        }
      );
    },
  },
};
</script>
