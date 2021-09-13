// TODO: add constants for the mutations / actions
// TODO: maybe web3 should be in here and everything should be done through actions?

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

const actions = {};

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
