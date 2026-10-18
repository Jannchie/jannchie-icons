import { priceCoins } from '../price'

// 价格 4 档（昂贵，比特币）：4 层硬币堆满，顶上立一枚比特币硬币
export default opts => priceCoins('bitcoin', 4, opts)
