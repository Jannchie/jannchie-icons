import { shell } from '../battery'

// 充电中：电池壳 + 中间一道闪电
export default ({ radius }) => [...shell(radius), 'M12 9L9.25 12H13L10.25 15']
