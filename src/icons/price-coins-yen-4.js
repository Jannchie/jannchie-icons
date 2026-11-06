import { priceCoins } from '../price'

// 价格 4 档（昂贵，人民币 / 日元）：4 层硬币堆满，顶上立一枚人民币 / 日元硬币
export default opts => priceCoins('yen', 4, opts)

// 实心：亮着的层、立着的硬币填实，硬币里挖出货币符号
export const fill = opts => priceCoins('yen', 4, opts, { fill: true })
