import { priceCoins } from '../price'

// 价格 3 档（偏贵，欧元）：3 层硬币，上面 1 层只留虚线点，顶上立一枚欧元硬币
export default opts => priceCoins('euro', 3, opts)
