import { priceCoins } from '../price'

// 价格 4 档（昂贵，卢比）：4 层硬币堆满，顶上立一枚卢比硬币
export default opts => priceCoins('rupee', 4, opts)
