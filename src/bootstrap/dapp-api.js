import Web3 from 'web3'
import multipleArbitrableTransaction from '@kleros/kleros-interaction/build/contracts/MultipleArbitrableTransaction.json'
import arbitrator from '@kleros/kleros-interaction/build/contracts/Arbitrator.json'

const env = process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV'
const ETHEREUM_PROVIDER = process.env[`REACT_APP_${env}_ETHEREUM_PROVIDER`]

let web3
if (process.env.NODE_ENV === 'test')
  web3 = new Web3(require('ganache-cli').provider())
else if (window.ethereum) web3 = new Web3(window.ethereum)
else if (window.web3 && window.web3.currentProvider)
  web3 = new Web3(window.web3.currentProvider)
else web3 = new Web3(new Web3.providers.HttpProvider(ETHEREUM_PROVIDER))

const getNetwork = async () => new Promise((resolve, reject) => {
  web3.eth &&
  web3.eth.net
  .getId()
  .then(networkID => {
  switch (networkID) {
      case 1:
      resolve('MAINNET')
      case 3:
       resolve('ROPSTEN')
      case 4:
       resolve('RINKEBY')
      case 42:
       resolve('KOVAN')
      default:
       resolve(null)
  }
  })
  .catch((err) => reject(err))
})

const ARBITRABLE_ADDRESS =
  process.env[`REACT_APP_${env}_ARBITRABLE_ADDRESS`]
const ARBITRATOR_ADDRESS =
  process.env[`REACT_APP_${env}_ARBITRATOR_ADDRESS`]
const FEE_TIMEOUT =
  process.env[`REACT_APP_${env}_FEE_TIMEOUT`]
const PATCH_USER_SETTINGS_URL =
  process.env[`REACT_APP_${env}_PATCH_USER_SETTINGS_URL`]

const multipleArbitrableTransactionEth = new web3.eth.Contract(
  multipleArbitrableTransaction.abi,
  ARBITRABLE_ADDRESS
)


const arbitratorEth = new web3.eth.Contract(
  arbitrator.abi,
  ARBITRATOR_ADDRESS // need to follow the arbitrator standard ERC 792
)

const ETHAddressRegExpCaptureGroup = '(0x[a-fA-F0-9]{40})'
const ETHAddressRegExp = /0x[a-fA-F0-9]{40}/
const strictETHAddressRegExp = /^0x[a-fA-F0-9]{40}$/

export {
  web3,
  ARBITRABLE_ADDRESS,
  ARBITRATOR_ADDRESS,
  FEE_TIMEOUT,
  PATCH_USER_SETTINGS_URL,
  ETHAddressRegExpCaptureGroup,
  ETHAddressRegExp,
  strictETHAddressRegExp,
  multipleArbitrableTransactionEth,
  arbitratorEth,
  getNetwork
}

setTimeout(
  () =>
    console.log(
      'Arbitrable Address: ',
      ARBITRABLE_ADDRESS,
      'Arbitrator Address: ',
      ARBITRATOR_ADDRESS,
      'Payment timeout: ',
      FEE_TIMEOUT,
      'URL to save email notification: ',
      PATCH_USER_SETTINGS_URL,
      'Web3: ',
      window.web3,
      'ARBITRATOR INTERFACE',
      arbitrator,
      'ARBITRBLE CONTRACT',
      multipleArbitrableTransactionEth
    ),
  1000
)
