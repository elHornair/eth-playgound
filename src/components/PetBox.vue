<template>
  <div class="box">
    <h2 class="box__title">Pet Box</h2>
    <p>
      This box talks to the actual pet box contract located at
      <a
        :href="`https://kovan.etherscan.io/address/${contractAddress}`"
        class="font-medium text-indigo-600 hover:text-indigo-500"
        >{{ contractAddress }}</a
      >
    </p>
    <h3 class="font-medium text-gray-900 mt-2">Pet owners</h3>
    <ul>
      <li v-for="(adopter, index) in adopters" :key="index">
        Pet #{{ index }} is owned by
        <span v-if="adopter === '0x0000000000000000000000000000000000000000'">
          Nobody
          <button
            class="font-medium text-indigo-600 hover:text-indigo-500"
            @click="handleClaim(index)"
          >
            Claim it
          </button>
        </span>
        <span v-else>
          {{ adopter }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { ethers } from 'ethers';
import { mapGetters } from 'vuex';

import { SigningKeychain } from '@radixdlt/account';
import { Mnemonic } from '@radixdlt/crypto';

const provider = new ethers.providers.EtherscanProvider(
  'kovan',
  process.env.VUE_APP_ETHERSCAN_API_KEY
);

const abi = [
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'adopters',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: 'petId',
        type: 'uint256',
      },
    ],
    name: 'adopt',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: 'petId',
        type: 'uint256',
      },
    ],
    name: 'free',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'getAdopters',
    outputs: [
      {
        internalType: 'address[16]',
        name: '',
        type: 'address[16]',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

export default {
  name: 'PetBox.vue',
  computed: {
    ...mapGetters('accounts', {
      accounts: 'allFormatted',
    }),
  },
  props: {
    contractAddress: {
      type: String,
      default: '0x6ac6fabd9374240e3b70f1cb29e0a5a5e37d0384',
    },
  },
  data() {
    return {
      smartContractPets: undefined,
      adopters: [],
    };
  },
  created() {
    const wallet = new ethers.Wallet(this.accounts[0].privateKey);
    const signer = wallet.connect(provider);

    this.smartContractPets = new ethers.Contract(
      this.contractAddress,
      abi,
      signer
    );

    this.updateAdopters();

    this.testRadix();
  },
  methods: {
    async testRadix() {
      const mnemonic = Mnemonic.generateNew();
      const keystoreEncryptionPassword = 'some-pw';

      SigningKeychain.byEncryptingMnemonicAndSavingKeystore({
        mnemonic,
        password: keystoreEncryptionPassword,
        save: function (keystore) {
          console.log('keystore:');
          console.log(keystore);

          return new Promise((resolve) => {
            // TODO: write file here
            resolve('okydokes');
          });
        },
      }).andThen((signingKeyChain) => {
        console.log('mnemonic:');
        console.log(signingKeyChain.revealMnemonic());
      });
    },
    async updateAdopters() {
      this.adopters = await this.smartContractPets.getAdopters();
    },
    handleClaim(index) {
      this.smartContractPets.adopt(parseInt(index)).then((res) => {
        console.log(res);
        alert('Successfully adopted. Good choice!');
        this.updateAdopters();
      });
    },
  },
};
</script>
