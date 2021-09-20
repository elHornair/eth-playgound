import { ethers } from 'ethers';

const provider = new ethers.providers.EtherscanProvider(
  'kovan',
  process.env.VUE_APP_ETHERSCAN_API_KEY
);

const state = () => ({
  all: [],
});

const getters = {
  allFormatted(state) {
    return state.all.map((account) => {
      const accountFormatted = { ...account };

      accountFormatted.balance = Number.parseFloat(
        ethers.utils.formatEther(account.balance)
      ).toFixed(6);

      return accountFormatted;
    });
  },
  total(state) {
    return state.all.length;
  },
  getFormattedByAddress: (state, getters) => (address) => {
    return getters.allFormatted.find((account) => account.address === address);
  },
  getFormattedTransactions: (state) => (address) => {
    const account = state.all.find((account) => account.address === address);

    if (!account || !account.transactions) {
      return [];
    }

    return account.transactions.map((transaction) => {
      const transactionOutgoing = transaction.from === address;
      const transactionDate = new Date(transaction.timestamp * 1000); // ethereum uses seconds, but JS wants milliseconds

      return {
        hash: transaction.hash,
        time: `${('0' + transactionDate.getHours()).slice(-2)}:${(
          '0' + transactionDate.getMinutes()
        ).slice(-2)}`,
        date: `${('0' + transactionDate.getDate()).slice(-2)}.${(
          '0' +
          (transactionDate.getMonth() + 1)
        ).slice(-2)}.${transactionDate.getFullYear()}`,
        value: (
          ethers.utils.formatEther(transaction.value) *
          (transactionOutgoing ? -1 : 1)
        ).toFixed(6),
        account: {
          name: 'Unknown', // TODO: lookup in address book and/or ENS
          address: transactionOutgoing ? transaction.to : transaction.from,
        },
      };
    });
  },
};

const actions = {
  createAccount({ getters, commit }) {
    const newAccount = ethers.Wallet.createRandom();
    newAccount.name = `My Account #${getters.total + 1}`;
    newAccount.balance = 0;

    commit({
      type: 'addAccount',
      newAccount: newAccount,
    });
  },
  updateAccountBalancesFromBlockchain({ state, dispatch }) {
    state.all.forEach((account) => {
      dispatch('updateAccountBalanceFromBlockchain', account);
    });
  },
  async updateAccountBalanceFromBlockchain({ commit }, account) {
    const balance = await provider.getBalance(account.address);

    commit({
      type: 'updateAccountBalance',
      address: account.address,
      balance: balance,
    });
  },
  async updateAccountTransactionsFromBlockchain({ commit }, account) {
    const history = await provider.getHistory(account.address);

    commit({
      type: 'updateAccountTransactions',
      address: account.address,
      transactions: history.map((transaction) => {
        return {
          hash: transaction.hash,
          from: transaction.from,
          to: transaction.to,
          value: transaction.value,
          timestamp: transaction.timestamp,
        };
      }),
    });
  },
};

const mutations = {
  addAccount(state, payload) {
    state.all = [...state.all, payload.newAccount];
  },
  removeAccount(state, payload) {
    // TODO: only soft delete
    state.all = state.all.filter(
      (account) => account.address !== payload.accountAddress
    );
  },
  updateAccountBalance(state, payload) {
    state.all = state.all.map((account) => {
      if (account.address === payload.address) {
        account.balance = payload.balance;
      }

      return account;
    });
  },
  updateAccountTransactions(state, payload) {
    state.all = state.all.map((account) => {
      if (account.address === payload.address) {
        account.transactions = payload.transactions.sort((a, b) => {
          return b.timestamp - a.timestamp;
        });
      }

      return account;
    });
  },
  updateAccountName(state, payload) {
    state.all = state.all.map((account) => {
      if (account.address === payload.address) {
        account.name = payload.name;
      }

      return account;
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
