import { rounded } from '../geometry'

// Hugging Face 任务：掩码生成（Segment Anything）。一圈虚线选区里一大块不规则的实心色块：抠出来的那一块掩码
// 和 object-detection（四角 + 空心方框）、focus（四角 + 小圆点）拉开：这里每条边中间还有一段虚线，
// 中间是一块占了大半个选区、形状不规则的实心块
// 选区外缘 3–21：四个角各一个 L（臂的墨迹 3–7.5），每条边中间一段短线（墨迹 10.5–13.5），段与段之间空 3（16px 下 2 像素）
// 色块：墨迹约 6.5–17.5，离选区内缘 2；左上鼓、右下收的豆形
const blob = { d: 'M11 7.5C14 6.5 17 8.5 16.5 11.5C16.2 13.5 17 15 15 16.25C12.5 17.75 8 17 7.5 14C7.2 12 8.5 11.5 8.5 10C8.5 8.5 9.5 8 11 7.5Z', fill: true, round: true }

// 色块在描边版里已经是实心的，实心版和描边版相同，不单独导出 fill
export default ({ radius, stroke }) => {
  const h = stroke / 2
  const [a, b] = [3 + h, 21 - h]
  const corner = (x, y, dx, dy) => rounded([[x, y + dy * (4.5 - 2 * h)], [x, y], [x + dx * (4.5 - 2 * h), y]], Math.min(radius, 2), false)
  return [
    corner(a, a, 1, 1),
    corner(b, a, -1, 1),
    corner(b, b, -1, -1),
    corner(a, b, 1, -1),
    `M${10.5 + h} ${a}H${13.5 - h}`,
    `M${10.5 + h} ${b}H${13.5 - h}`,
    `M${a} ${10.5 + h}V${13.5 - h}`,
    `M${b} ${10.5 + h}V${13.5 - h}`,
    blob,
  ]
}
