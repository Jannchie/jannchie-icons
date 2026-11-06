import { priceCoins } from '../price'

// 价格 1 档（便宜，欧元）：1 层硬币，上面 3 层只留虚线点，顶上立一枚欧元硬币
export default opts => priceCoins('euro', 1, opts)

// 实心：亮着的层、立着的硬币填实，硬币里挖出货币符号
export const fill = opts => priceCoins('euro', 1, opts, { fill: true })
