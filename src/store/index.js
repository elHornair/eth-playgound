import { createStore } from 'vuex';
import accounts from '@/store/modules/accounts';

const debug = process.env.NODE_ENV !== 'production';

const store = createStore({
  strict: debug,
  state: {},
  actions: {
    initializeStore({ initialState }) {
      if (window.localStorage.getItem('state')) {
        this.replaceState({
          ...initialState,
          ...JSON.parse(localStorage.getItem('state')),
        });
      }
    },
  },
  modules: {
    accounts,
  },
});

store.subscribe((mutation, state) => {
  // this wouldn't be secure enough for prod => the accounts would have to be encrypted
  // because localStorage is not a safe place to store private keys
  window.localStorage.setItem('state', JSON.stringify(state));
});

store.dispatch('initializeStore');

export default store;
