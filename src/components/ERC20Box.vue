<template>
  <div class="box">
    <h2 class="box__title">ERC-20 Box</h2>
    <ul>
      <li>Address: {{ address }}</li>
      <li>Name: {{ tokenName }}</li>
      <li>Symbol: {{ tokenSymbol }}</li>
      <li>Total Supply: {{ tokenTotalSupply }}</li>
    </ul>
  </div>
</template>

<script>
import { ethers } from 'ethers';

const provider = new ethers.providers.EtherscanProvider(
  'kovan',
  process.env.VUE_APP_ETHERSCAN_API_KEY
);

const erc20Abi = [
  {
    constant: true,
    inputs: [],
    name: 'mintingFinished',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_from', type: 'address' },
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'unpause',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_amount', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'finishMinting',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'pause',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_amount', type: 'uint256' },
      { name: '_releaseTime', type: 'uint256' },
    ],
    name: 'mintTimelocked',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { name: '_owner', type: 'address' },
      { name: '_spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: 'remaining', type: 'uint256' }],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    payable: false,
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'to', type: 'address' },
      { indexed: false, name: 'value', type: 'uint256' },
    ],
    name: 'Mint',
    type: 'event',
  },
  { anonymous: false, inputs: [], name: 'MintFinished', type: 'event' },
  { anonymous: false, inputs: [], name: 'Pause', type: 'event' },
  { anonymous: false, inputs: [], name: 'Unpause', type: 'event' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'owner', type: 'address' },
      { indexed: true, name: 'spender', type: 'address' },
      { indexed: false, name: 'value', type: 'uint256' },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'from', type: 'address' },
      { indexed: true, name: 'to', type: 'address' },
      { indexed: false, name: 'value', type: 'uint256' },
    ],
    name: 'Transfer',
    type: 'event',
  },
];

export default {
  name: 'ERC20Box',
  props: {
    address: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      smartContract: undefined,
      tokenName: '',
      tokenSymbol: '',
      tokenTotalSupply: '',
    };
  },
  created() {
    this.smartContract = new ethers.Contract(this.address, erc20Abi, provider);

    this.updateTokenName();
    this.updateTokenSymbol();
    this.updateTokenTotalSupply();
  },
  methods: {
    async updateTokenName() {
      this.tokenName = await this.smartContract.name();
    },
    async updateTokenSymbol() {
      this.tokenSymbol = await this.smartContract.symbol();
    },
    async updateTokenTotalSupply() {
      this.tokenTotalSupply = await this.smartContract.totalSupply();
    },
  },
};
</script>
