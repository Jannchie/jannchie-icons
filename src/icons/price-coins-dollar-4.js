import { priceCoins } from '../price'

// 价格 4 档（昂贵，美元）：4 层硬币堆满，顶上立一枚美元硬币
export default opts => priceCoins('dollar', 4, opts)
