import { GAP } from '../clearance'
import { rounded } from '../geometry'
import { cutout, solid } from '../solid'
import { rotate } from '../transform'

// 发送（纸飞机）：机头朝上的纸飞机 + 中间折线，再顺时针旋转 deg 度；默认转 30°（与水平成 60°，和铅笔同角度）
// 折线画到机头顶点为止，线头由 finalize 的 tuckTips 缩进尖角里
export const plane = deg => ({ radius }) => [
  rotate(rounded([[12, 2.5], [19, 20], [12, 16], [5, 20]], Math.min(radius, 1)), deg),
  rotate('M12 2.5L12 16', deg),
]

// 实心版：左右两片机翼各自独立，中间沿折线挖开一道 GAP 宽的直缝：缝从机头的尖一直通到尾部凹口下面，两头都穿出轮廓
// （折线停在机头里会留一道两头带线帽的死槽，停在凹口的中线上又在凹口下面留一道细桥）
export const planeFill = deg => ({ radius }) => [
  solid(rotate(rounded([[12, 2.5], [19, 20], [12, 16], [5, 20]], Math.min(radius, 1)), deg)),
  cutout(rotate(`M${12 - GAP / 2} -2H${12 + GAP / 2}V18H${12 - GAP / 2}Z`, deg)),
]

export default plane(30)
export const fill = planeFill(30)
