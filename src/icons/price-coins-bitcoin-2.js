import { priceCoins } from '../price'

// 价格 2 档（中等，比特币）：2 层硬币，上面 2 层只留虚线点，顶上立一枚比特币硬币
export default opts => priceCoins('bitcoin', 2, opts)

// 实心：亮着的层、立着的硬币填实，硬币里挖出货币符号
export const fill = opts => priceCoins('bitcoin', 2, opts, { fill: true })
