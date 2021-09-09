<template>
  <div class="hello">
    <h1>Ethereum Playground</h1>
    <ul>
      <li>Address: {{ address }}</li>
      <li>Balance: {{ balance }} ETH</li>
    </ul>
  </div>
</template>

<script>

import Web3 from 'web3';

const web3 = new Web3(
  new Web3.providers.HttpProvider('https://kovan.infura.io/v3/39009bec93694f98947fdfb1cffb2e30')
);

export default {
  name: 'HelloWorld',
  props: {
    address: String
  },
  data() {
    return {
      balance: Number
    }
  },
  created() {
    web3.eth.getBalance(this.address, (err, wei) => {
      this.balance = web3.utils.fromWei(wei, 'ether');
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
</style>
