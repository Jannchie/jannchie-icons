import { oval } from '../geometry'
import { eye } from '../scene'
import { hole, knock, solid } from '../solid'

// 企鹅：正面站立。上窄下宽的蛋形身子（6.5–17.5 × 2.75–20.5）+ 肚子上一块椭圆的白肚皮（9–15 × 11.5–18，和上面的喙隔开）
// + 两只眼睛 + 眼睛之间往下的小三角喙 + 身子两侧往外下方撇的一对鳍（线）
const body = 'M12 2.75C15.5 2.75 17.5 5.5 17.5 9.5V15.5C17.5 18.75 15.25 20.5 12 20.5C8.75 20.5 6.5 18.75 6.5 15.5V9.5C6.5 5.5 8.5 2.75 12 2.75Z'
// k：往里收的量（实心版的洞开到描边版肚皮的中心线）
const belly = (k = 0) => oval(12, 14.75, 3 - k, 3.25 - k)
const eyes = [eye(10, 6.25, 1.75), eye(14, 6.25, 1.75)]
const beak = { d: 'M11 7.75H13L12 9.25Z', fill: true }
const flippers = ['M6.5 10.5C5 12 4.25 14 4.25 16.25', 'M17.5 10.5C19 12 19.75 14 19.75 16.25']

export default () => [body, belly(), ...eyes, beak, ...flippers]

// 实心：黑身子、白肚皮——身子一块，肚皮挖成洞，眼睛和喙挖空；鳍照旧是线
export const fill = ({ stroke }) => [
  solid(body),
  hole(belly(stroke / 2)),
  knock([...eyes, { ...beak, round: true }]),
  ...flippers,
]
