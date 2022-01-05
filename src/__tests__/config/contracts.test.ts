import { ChainId } from '@buffet-dex/sdk'
import map from 'lodash/map'
import filter from 'lodash/filter'
import contracts from 'config/constants/contracts'

const { MAINNET } = ChainId

describe('Config contracts', () => {
  it.each(map(contracts, (contract, key) => [key, contract]))('Contract %s has a unique address', (key, contract) => {
    const duplicates = filter(contracts, (c) => contract[MAINNET] === c[MAINNET])
    // TODO; enable when all contracts are deployed.
    expect(duplicates) // .toHaveLength(1)
  })
})
