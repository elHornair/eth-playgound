<template>
  <div>
    <NewTransaction
      v-if="newTransactionData"
      v-bind="newTransactionData.account"
      @new-transaction-finished="handleNewTransactionFinished"
    ></NewTransaction>
    <Account
      @new-transaction-requested="handleNewTransactionRequested"
    ></Account>
  </div>
</template>

<script>
import Account from '@/components/Account';
import NewTransaction from '@/components/NewTransaction';

export default {
  name: 'AccountView',
  components: {
    Account,
    NewTransaction,
  },
  data() {
    return {
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
