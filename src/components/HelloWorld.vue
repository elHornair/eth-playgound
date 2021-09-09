<template>
  <div>
    <h1>Ethereum Playground</h1>

    <h2>ERC-20 Token Contract</h2>
    <ul>
      <li>Address: {{ erc20Address }}</li>
      <li>Name: {{ erc20Name }}</li>
      <li>Symbol: {{ erc20Symbol }}</li>
      <li>Total Supply: {{ erc20TotalSupply }}</li>
    </ul>

    <NewTransaction v-if="newTransactionData" :web3="web3" v-bind="newTransactionData.account"></NewTransaction>

    <div class="max-w-screen-sm shadow overflow-hidden border-b border-gray-200 sm:rounded-lg px-6 py-4 bg-white text-left">
      <h2 class="text-2xl mb-8">Accounts</h2>

      <ul role="list" class="-my-6 divide-y divide-gray-200">
        <li v-for='(account, index) in accounts' :key='account.address + "-" + account.balance' class="py-6 flex">
          <div class="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" class="w-full h-full object-center object-cover">
          </div>
          <div class="ml-4 flex-1 flex flex-col">
            <div>
              <div class="flex justify-between text-base font-medium text-gray-900">
                <h3>
                  <a href="#">
                    {{ account.name }}
                  </a>
                </h3>
                <p v-if="account.balance" class="ml-4">
                  {{ account.balance }} ETH
                </p>
              </div>
              <p class="mt-1 text-sm text-gray-500">
                {{ account.address }}
              </p>
            </div>
            <div class="flex-1 flex items-end justify-between text-sm">
              <p class="text-gray-500">
                <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500" @click="sendFromAccount(index)">Send</button>
              </p>
              <div class="flex">
                <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500" @click="removeAccount(index)">Remove</button>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <button
        type="button"
        class="mt-8 float-right bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        @click="addAccount"
      >
        Add Account
      </button>
    </div>

  </div>
</template>

<script>

import Web3 from 'web3';
import NewTransaction from "@/components/NewTransaction";

const erc20Abi = [{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"finishMinting","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_releaseTime","type":"uint256"}],"name":"mintTimelocked","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[],"name":"MintFinished","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];

export default {
  name: 'HelloWorld',
  components: {
    NewTransaction
  },
  props: {
    erc20Address: String
  },
  data() {
    return {
      web3: null,
      newTransactionData: null,
      erc20Name: '',
      erc20Symbol: '',
      erc20TotalSupply: '',
      accountsRaw: [],
      accounts: []
    }
  },
  watch: {
    accountsRaw: {
      handler() {
        // this wouldn't be secure enough for prod => the accounts would have to be encrypted
        // because localStorage is not a safe place to store private keys
        window.localStorage.setItem('accounts', JSON.stringify(this.accountsRaw));

        // get balance from blockchain for each account
        this.accounts = [...this.accountsRaw];

        this.accounts.forEach((account) => {
          this.web3.eth.getBalance(account.address, (err, wei) => {
            account.balance = Number.parseFloat(this.web3.utils.fromWei(wei, 'ether')).toPrecision(2);
          });
        });
      },
      deep: true,
    },
  },
  methods: {
    addAccount() {
      const newAccount = this.web3.eth.accounts.create();
      newAccount.name = `My Account ${this.accountsRaw.length + 1}`;
      this.accountsRaw = [...this.accountsRaw, newAccount];
    },
    removeAccount(clickedIndex) {
      if (window.confirm('Are you sure? You will loose access to your funds.')) {
        this.accountsRaw = this.accountsRaw.filter((account, accountIndex) => accountIndex !== clickedIndex );
      }
    },
    sendFromAccount(clickedIndex) {
      this.newTransactionData = {
        account: this.accountsRaw[clickedIndex]
      }
    }
  },
  created() {
    this.web3 = new Web3(
        new Web3.providers.HttpProvider('https://kovan.infura.io/v3/39009bec93694f98947fdfb1cffb2e30')
    );

    const smartContract = new this.web3.eth.Contract(erc20Abi, this.erc20Address);

    // get all methods: console.log(smartContract.methods);
    smartContract.methods.name().call((err, result) => (this.erc20Name = result));
    smartContract.methods.symbol().call((err, result) => (this.erc20Symbol = result));
    smartContract.methods.totalSupply().call((err, result) => (this.erc20TotalSupply = result));

    if (window.localStorage.getItem('accounts')) {
      this.accountsRaw = JSON.parse(window.localStorage.getItem('accounts'));
    }
  }
}
</script>
