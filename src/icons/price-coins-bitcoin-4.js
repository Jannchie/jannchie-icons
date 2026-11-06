import { priceCoins } from '../price'

// 价格 4 档（昂贵，比特币）：4 层硬币堆满，顶上立一枚比特币硬币
export default opts => priceCoins('bitcoin', 4, opts)

// 实心：亮着的层、立着的硬币填实，硬币里挖出货币符号
export const fill = opts => priceCoins('bitcoin', 4, opts, { fill: true })
