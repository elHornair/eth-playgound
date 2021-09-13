import Web3 from 'web3';

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    'https://kovan.infura.io/v3/39009bec93694f98947fdfb1cffb2e30'
  )
);

const state = () => ({
  all: [],
});

const getters = {
  all(state) {
    return state.all;
  },
  total(state, getters) {
    return getters.all.length;
  },
  getByAddress: (state) => (address) => {
    return state.all.find((account) => account.address === address);
  },
};

const actions = {
  createAccount({ getters, commit }) {
    const newAccount = web3.eth.accounts.create();
    newAccount.name = `My Account ${getters.total + 1}`;

    web3.eth.getBalance(newAccount.address, (err, wei) => {
      newAccount.balance = Number.parseFloat(
        web3.utils.fromWei(wei, 'ether')
      ).toPrecision(2);

      commit({
        type: 'addAccount',
        newAccount: newAccount,
      });
    });
  },
};

const mutations = {
  addAccount(state, payload) {
    state.all = [...state.all, payload.newAccount];
  },
  removeAccount(state, payload) {
    state.all = state.all.filter(
      (account) => account.address !== payload.accountAddress
    );
  },
  updateAccountBalance(state, payload) {
    state.all = state.all.map((account) => {
      if (account.address === payload.accountAddress) {
        account.balance = payload.accountBalance;
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
