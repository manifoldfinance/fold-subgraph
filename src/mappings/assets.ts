import { Address } from '@graphprotocol/graph-ts';
import { Asset } from '../types/schema';
import { Token } from '../types/FOLD/Token';

import { DeFiName, DeFiSymbol } from './constants';

export function createAsset(assetAddress: string): Asset {
  let asset = new Asset(assetAddress);
  // Leaving this here for Integration with staking version of FOLD token
  if (
    assetAddress == '0xd084944d3c05CD115C09d072B9F44bA3E0E45921' ||
    assetAddress == '0xd084944d3c05CD115C09d072B9F44bA3E0E45921'
  ) {
    asset.decimals = 18;
  } else {
    asset.decimals = 18;
  }

  // Can call the read-only functions of an ERC20 contract with below bind
  let contract = Token.bind(Address.fromString(assetAddress));
  asset.name = DeFiName.get(assetAddress) as string;
  asset.symbol = DeFiSymbol.get(assetAddress) as string;
  //  asset.category = get(assetAddress) as string
  //  asset.decimals = contract.decimals() ? contract.decimals() : null
  return asset;
}
