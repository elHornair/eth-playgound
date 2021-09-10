<template>
  <div class="space-y-10">
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
import Accounts from '@/components/Accounts';
import NewTransaction from '@/components/NewTransaction';

export default {
  name: 'Main',
  components: {
    Accounts,
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
