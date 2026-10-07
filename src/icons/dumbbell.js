import { rounded } from '../geometry'
import { mirror } from '../transform'

// 哑铃：横放，中心线 y = 12.5（横杆落在 .5 上）。每端一块大杠铃片（6.5–9.5 × 6.5–18.5）连着外侧一块小片（3.5–6.5 × 9.5–15.5），
// 两块拼成一个闭合的阶梯形；横杆两端垂直接在内侧大片上。右端按 x = 12 镜像
const plate = radius => rounded([[6.5, 6.5], [9.5, 6.5], [9.5, 18.5], [6.5, 18.5], [6.5, 15.5], [3.5, 15.5], [3.5, 9.5], [6.5, 9.5]], Math.min(radius, 1))
export default ({ radius }) => [plate(radius), mirror(plate(radius)), 'M9.5 12.5H14.5']
