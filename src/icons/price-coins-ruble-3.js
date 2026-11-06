import { priceCoins } from '../price'

// 价格 3 档（偏贵，卢布）：3 层硬币，上面 1 层只留虚线点，顶上立一枚卢布硬币
export default opts => priceCoins('ruble', 3, opts)

// 实心：亮着的层、立着的硬币填实，硬币里挖出货币符号
export const fill = opts => priceCoins('ruble', 3, opts, { fill: true })
