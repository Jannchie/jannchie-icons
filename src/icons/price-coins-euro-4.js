import { priceCoins } from '../price'

// 价格 4 档（昂贵，欧元）：4 层硬币堆满，顶上立一枚欧元硬币
export default opts => priceCoins('euro', 4, opts)
