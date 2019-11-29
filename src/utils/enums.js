/**
 *  资产类型（1-建筑物、2-业权单位、3-车位、9-办公资产）
 * @param {*} assetType 资产类型
 */
export function getAssetType(assetType) {
  switch (assetType) {
    case "1":
      return "建筑物";
    case "2":
      return "业权单位";
    case "3":
      return "车位";
    case "9":
      return "办公资产";
    default:
      return "办公资产";
  }
}

