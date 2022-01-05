import { serializeTokens } from './tokens'
import { SerializedFarmConfig } from './types'

const serializedTokens = serializeTokens()

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 1, 2) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'CAKE',
    lpAddresses: {
      43113: '0xa53C113d8bE8930aa8430806F837277dAa43b4e4',
      43114: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    token: serializedTokens.syrup,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'CAKE-AVAX LP',
    lpAddresses: {
      43113: '0x4c554D1Cc00d70A3E9787AE9133B76622EAa95Da',
      43114: '0x4c554D1Cc00d70A3E9787AE9133B76622EAa95Da',
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'USDC-AVAX LP',
    lpAddresses: {
      43113: '0x1f11c7A7aD5e13C5dDa3726eF3F3cd762DFf5C04',
      43114: '0x1f11c7A7aD5e13C5dDa3726eF3F3cd762DFf5C04',
    },
    token: serializedTokens.usdc,
    quoteToken: serializedTokens.wbnb,
  },
]

export default farms
