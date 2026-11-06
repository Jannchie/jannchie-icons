import { shell } from '../battery'
import { knock, solid } from '../solid'

// 充电中：电池壳 + 中间一道闪电
export default ({ radius }) => [...shell(radius), 'M12 9L9.25 12H13L10.25 15']

// 实心：电池壳填实，闪电挖空，正极帽照旧是线
export const fill = ({ radius }) => {
  const [body, cap] = shell(radius)
  return [solid(body), knock('M12 9L9.25 12H13L10.25 15'), cap]
}
