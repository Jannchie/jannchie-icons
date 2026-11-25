import { GAP } from '../clearance'
import { eye } from '../scene'
import { clear, knock, solid } from '../solid'

// 贴纸：一张圆贴纸（半径 9），右下角撕起来卷回去——圆从 (21, 12) 逆时针绕到 (12, 21)，缺的那一角是一片叶子形的卷边：
// 外侧是斜的直边（揭开的边缘），内侧是往圆心鼓的弧（卷回来的纸边）；贴纸上一张笑脸。圆形 + 卷边 + 笑脸，和方形折角的 sticky-note 区分开
const arc = 'M21 12A9 9 0 1 0 12 21'
const curl = 'C12 16 16 12 21 12'
const eyes = [eye(8.5, 9.5), eye(14, 9.5)]
const smile = 'M8 13C9 14.75 11.5 15 12.75 13.5'

// 外轮廓一笔闭合（圆弧 + 斜的直边）；卷回来的弧两头各缩进半个线宽，线头收在外轮廓的线里（三条线头挤在同一个角上，尖角模式下会冒头）
export default ({ stroke }) => {
  const h = stroke / 2
  return [`${arc}Z`, `M12 ${21 - h}C12 16 16 12 ${21 - h} 12`, ...eyes, smile]
}

// 实心：贴纸本体（圆弧 + 卷边的弧）一块，笑脸挖空；卷起来的那一角是前面单独的一片，本体在它四周让出缝
export const fill = () => {
  const flap = `M12 21${curl}Z`
  return [
    solid(`${arc}${curl}Z`),
    knock([...eyes, { d: smile, round: true }]),
    clear(flap, GAP),
    solid(flap),
  ]
}
