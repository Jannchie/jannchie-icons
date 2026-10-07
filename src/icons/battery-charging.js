import { shell } from '../battery'

// 充电中：电池壳 + 中间一道闪电
export default ({ radius }) => [...shell(radius), 'M12 8.5L9.25 11.5H13L10.25 14.5']
