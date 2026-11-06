import { priceCoins } from '../price'

// 价格 1 档（便宜，英镑）：1 层硬币，上面 3 层只留虚线点，顶上立一枚英镑硬币
export default opts => priceCoins('pound', 1, opts)

// 实心：亮着的层、立着的硬币填实，硬币里挖出货币符号
export const fill = opts => priceCoins('pound', 1, opts, { fill: true })
