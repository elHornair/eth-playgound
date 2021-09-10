<template>
  <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
    <div class="lg:text-center pt-10">
      <h1
        class="text-base text-indigo-600 font-semibold tracking-wide uppercase"
      >
        Etherli
      </h1>
      <p
        class="
          mt-2
          text-3xl
          leading-8
          font-extrabold
          tracking-tight
          text-gray-900
          sm:text-4xl
        "
      >
        Welcome Home
      </p>
      <p class="link-container mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
        This is a playground project created by
        <a href="https://twitter.com/elHornair">@elHornair</a> for getting used
        with <a href="https://web3js.readthedocs.io/">web3.js</a> and the
        <a href="https://ethereum.org">Ethereum</a>
        blockchain.
      </p>
    </div>

    <ERC20Box
      :web3="web3"
      address="0xf894289f63b0b365485cee34aa50681f295f84b4"
    ></ERC20Box>
    <NewTransaction
      v-if="newTransactionData"
      :web3="web3"
      v-bind="newTransactionData.account"
      @new-transaction-finished="handleNewTransactionFinished"
    ></NewTransaction>
    <Accounts
      :web3="web3"
      @new-transaction-requested="handleNewTransactionRequested"
    />
  </div>
</template>

<script>
import Web3 from 'web3';
import ERC20Box from '@/components/ERC20Box';
import Accounts from '@/components/Accounts';
import NewTransaction from '@/components/NewTransaction';

export default {
  name: 'Main',
  components: {
    Accounts,
    ERC20Box,
    NewTransaction,
  },
  data() {
    return {
      web3: null,
      newTransactionData: null,
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
    handleNewTransactionFinished() {
      this.newTransactionData = null;
    },
    handleNewTransactionRequested(data) {
      this.newTransactionData = data;
    },
  },
};
</script>
