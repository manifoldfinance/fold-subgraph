import { TypedMap } from '@graphprotocol/graph-ts';

export let DeFiCategory = new TypedMap<string, string>();
export let DeFiName = new TypedMap<string, string>();
export let DeFiSymbol = new TypedMap<string, string>();

// FOLD
DeFiCategory.set('0xd084944d3c05CD115C09d072B9F44bA3E0E45921', 'Protocol, Infrastructure, MEV');
DeFiName.set('0xd084944d3c05CD115C09d072B9F44bA3E0E45921', 'Manifold Token');
DeFiSymbol.set('0xd084944d3c05CD115C09d072B9F44bA3E0E45921', 'FOLD');
