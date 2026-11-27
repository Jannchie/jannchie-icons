import { crisp, rounded } from '../geometry'
import { solid } from '../solid'

// 路灯（老式的灯笼顶路灯）：灯杆（x = 12）顶着一盏上宽下窄的玻璃灯笼（8.5–15.5 收到 10–14，6.5–12.5），灯笼上面一顶伸出檐的尖顶（7–17，尖在 2.5）；
// 灯杆半腰一根横档（9.5–14.5 在 15.5，老路灯上靠梯子用的），底下一条底座线（8.5–15.5 在 20.5）
// 靠「尖顶的灯笼 + 高灯杆 + 横档」认出来；lamp-floor 是上窄下宽的布灯罩、没有尖顶；带弯臂和光线的新式路灯太像 shower
const lantern = radius => rounded([[8.5, 6.5], [15.5, 6.5], [14, 12.5], [10, 12.5]], Math.min(radius, 1))
const roof = radius => rounded([[7, 6.5], [12, 2.5, crisp(radius)], [17, 6.5]], Math.min(radius, 0.5))
const post = 'M12 12.5V20.5'
const bar = 'M9.5 15.5H14.5'
const base = 'M8.5 20.5H15.5'

export default ({ radius }) => [lantern(radius), roof(radius), post, bar, base]

// 实心：尖顶一块，灯笼的玻璃照旧是空的（亮着的灯）；灯杆、横档、底座照旧是线
export const fill = ({ radius }) => [solid(roof(radius)), lantern(radius), post, bar, base]
