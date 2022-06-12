
import { BigInt, BigDecimal, log } from '@graphprotocol/graph-ts'
import { Asset, User, UserApproval} from '../types/schema'
import { createAsset } from './assets'
import {
  Approval,
  Transfer
} from '../types/ERC20/Token'

let zeroBD = BigDecimal.fromString('0')

function createUser(
  userId: string
): User {
  let UserStats = new User(userId)
  UserStats.balance = zeroBD
  UserStats.save()
  return UserStats as User
}

function exponentToBigDecimal(decimals: i32): BigDecimal {
  let bd = BigDecimal.fromString('1')
  for (let i = 0; i < decimals; i++) {
    bd = bd.times(BigDecimal.fromString('10'))
  }
  return bd
}

export function handleApproval(event: Approval): void {
  // this is the address specified in the config/mainnet.json file
  let assetID = event.address.toHexString()
  let asset = Asset.load(assetID)
  if (asset == null) {
    asset = createAsset(assetID)
    asset.save()
  }
  let AssetDecimals = asset.decimals
  let AssetDecimalsBD: BigDecimal = exponentToBigDecimal(AssetDecimals)
  let approvalID = event.params.owner.toHexString().concat('-').concat(event.params.spender.toHexString())
  let approval = UserApproval.load(approvalID)
  if (approval == null) {
    approval = new UserApproval(approvalID)
    approval.count = BigInt.fromI32(0)
    approval.value = zeroBD
  }
  approval.count = approval.count + BigInt.fromI32(1)
  approval.owner = event.params.owner.toHex()
  approval.spender = event.params.spender
  approval.value = approval.value.plus(
    event.params.value
    .toBigDecimal()
    .div(AssetDecimalsBD)
    .truncate(AssetDecimals),
  )
  approval.save()
}

export function handleTransfer(event: Transfer): void {
  // this is the address specified in the config/mainnet.json file
  let assetID = event.address.toHexString()
  let asset = Asset.load(assetID)
  if (asset == null) {
    asset = createAsset(assetID)
    asset.save()
  }
  let AssetDecimals = asset.decimals
  let AssetDecimalsBD: BigDecimal = exponentToBigDecimal(AssetDecimals)
  let userFromID = event.params.from.toHex()
  if (userFromID != assetID) {
    let UserStatsFrom = User.load(userFromID)
    if (UserStatsFrom == null) {
      UserStatsFrom = createUser(userFromID)
    }
    UserStatsFrom.balance = UserStatsFrom.balance.minus(
      event.params.value
        .toBigDecimal()
        .div(AssetDecimalsBD)
        .truncate(AssetDecimals),
    )
    UserStatsFrom.save()
  }
  let userToID = event.params.to.toHex()
  if (userToID != assetID) {
    let UserStatsTo = User.load(userToID)
    if (UserStatsTo == null) {
      UserStatsTo = createUser(userToID)
    }
    UserStatsTo.balance = UserStatsTo.balance.plus(
      event.params.value
        .toBigDecimal()
        .div(AssetDecimalsBD)
        .truncate(AssetDecimals),
    )
    UserStatsTo.save()
  }
}
