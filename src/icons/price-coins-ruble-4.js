import { priceCoins } from '../price'

// 价格 4 档（昂贵，卢布）：4 层硬币堆满，顶上立一枚卢布硬币
export default opts => priceCoins('ruble', 4, opts)
