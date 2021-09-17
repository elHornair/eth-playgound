<template>
  <div class="space-y-10">
    <NewTransaction
      v-if="newTransactionData"
      v-bind="newTransactionData.account"
      @new-transaction-finished="handleNewTransactionFinished"
    ></NewTransaction>
    <Accounts @new-transaction-requested="handleNewTransactionRequested" />
  </div>
</template>

<script>
import Accounts from '@/components/Accounts';
import NewTransaction from '@/components/NewTransaction';

export default {
  name: 'AccountsView',
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
