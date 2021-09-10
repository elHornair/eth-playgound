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
  </div>
</template>

<script>
import Web3 from 'web3';
import ERC20Box from '@/components/ERC20Box';

export default {
  name: 'Home',
  components: {
    ERC20Box,
  },
  data() {
    return {
      web3: null,
    };
  },
  created() {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(
        'https://kovan.infura.io/v3/39009bec93694f98947fdfb1cffb2e30'
      )
    );
  },
};
</script>
