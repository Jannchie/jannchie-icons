import { priceCoins } from '../price'

// 价格 4 档（昂贵，人民币 / 日元）：4 层硬币堆满，顶上立一枚人民币 / 日元硬币
export default opts => priceCoins('yen', 4, opts)
