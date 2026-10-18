import { priceCoins } from '../price'

// 价格 4 档（昂贵，韩元）：4 层硬币堆满，顶上立一枚韩元硬币
export default opts => priceCoins('won', 4, opts)
