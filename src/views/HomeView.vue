<template>
  <div class="space-y-10">
    <div class="lg:text-center">
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
        See this box below? It gets it's information from the Ethereum
        blockchain. You can also create an account and send around some fake
        ETH.
      </p>
    </div>

    <ERC20Box address="0xf894289f63b0b365485cee34aa50681f295f84b4"></ERC20Box>
  </div>
</template>

<script>
import ERC20Box from '@/components/ERC20Box';

export default {
  name: 'HomeView',
  components: {
    ERC20Box,
  },
  data() {
    return {
      web3: null,
    };
  },
};
</script>
