import { knock, solid } from '../solid'
import { image } from '../symbols'

// 图片：相框（方框 + 太阳点 + 45° 山）
export default ({ radius }) => image([12, 12], 2.4, radius)

// 实心：方框填实，太阳点挖空，山形线挖空：山形线两端在描边版里正好落在框边的中线上，线帽只擦到外缘、留一道细桥，
// 这里两端顺着 45° 的走向各伸出框外 2 个线宽，左下角的山体自成一块（image-plus、image-sparkle 共用）
export const imageFill = ([frame, sun, ridge], stroke) => {
  const pts = ridge.match(/-?[\d.]+/g).map(Number)
  const [[sx, sy], [ex, ey]] = [pts.slice(0, 2), pts.slice(-2)]
  const e = +(2 * stroke / Math.SQRT2).toFixed(3)
  return [solid(frame), knock([sun, `M${+(sx - e).toFixed(3)} ${+(sy + e).toFixed(3)}L${ridge.slice(1)}L${+(ex + e).toFixed(3)} ${+(ey + e).toFixed(3)}`])]
}
export const fill = ({ radius, stroke }) => imageFill(image([12, 12], 2.4, radius), stroke)
