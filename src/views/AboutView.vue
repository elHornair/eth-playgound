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
        About this project
      </p>
      <p class="link-container mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
        This is a playground project created by
        <a href="https://twitter.com/elHornair">@elHornair</a> for getting used
        with interacting with the
        <a href="https://ethereum.org">Ethereum</a>
        blockchain. I started out with
        <a href="https://web3js.readthedocs.io/">web3.js</a> but then switched
        to <a href="https://docs.ethers.io/">ethers.js</a> because it allows to
        use <a href="https://etherscan.io/">Etherscan</a> as a provider and
        Etherscan provides a simple API for getting all transactions an account
        was involved in. Also, ethers.js feels a lot more intuitive than
        web3.js.
      </p>
    </div>
  </div>
</template>
