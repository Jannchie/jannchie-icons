import { priceCoins } from '../price'

// 价格 2 档（中等，欧元）：2 层硬币，上面 2 层只留虚线点，顶上立一枚欧元硬币
export default opts => priceCoins('euro', 2, opts)
