import { solid } from '../solid'
import { rotate, scale, translate } from '../transform'
import { TILT, frame, tail } from './devil-tail'

// 小恶魔的尾巴·黑桃尖：和 devil-tail 同一条 S 形尾巴，尾尖换成一枚大的扑克黑桃（尖朝外，和箭头尖同一个朝向）
// 黑桃只有两瓣圆头：尖顶往下两肩先往里凹、再鼓成两个圆瓣，两瓣在底下收成一个凹口——不画黑桃的柄，
// 尾巴从凹口顺着黑桃的朝向直着接出来一小段再拐弯，它自己就是柄
const SPADE = 'M12 3C11 6.5 4.5 8.5 4.5 13C4.5 15.4 6.2 17 8.4 17C10.1 17 11.4 16 12 14.25C12.6 16 13.9 17 15.6 17C17.8 17 19.5 15.4 19.5 13C19.5 8.5 13 6.5 12 3Z'
const [APEX, NOTCH] = [[12, 3], 14.25] // 尖端、凹口的 y（缩放前）
const K = 0.8
const TIP = [18.3, 2.75]
const tip = translate(scale(rotate(SPADE, TILT, APEX), K, APEX), TIP[0] - APEX[0], TIP[1] - APEX[1])
const line = tail(frame(TIP), (NOTCH - APEX[1]) * K, 4.25)

export default () => [tip, line]

// 实心：黑桃填实，尾巴照旧是线
export const fill = () => [solid(tip), line]
