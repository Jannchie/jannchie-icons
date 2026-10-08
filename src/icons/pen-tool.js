import { circle, crisp, rounded } from '../geometry'
import { rotate } from '../transform'

// 钢笔工具（矢量）：先竖直画一个笔尖——尖 (12, 2)，两肩 (6.5, 12) / (17.5, 12)，收到底边 8.5–15.5（y = 15）；
// 尖到中间小圆（圆心 (12, 10.5)、半径 1.5）一道切缝；底下一块握把（8–16 × 17.5–21）——再逆时针转 45°，笔尖朝左上
export default ({ radius }) => [
  rounded([[12, 2, crisp(radius)], [17.5, 11], [15.5, 15], [8.5, 15], [6.5, 11]], Math.min(radius, 1.5)),
  'M12 2V9',
  circle(12, 10.5, 1.5),
  rounded([[8, 17.5], [16, 17.5], [16, 21], [8, 21]], Math.min(radius, 1)),
].map(d => rotate(d, -45))
