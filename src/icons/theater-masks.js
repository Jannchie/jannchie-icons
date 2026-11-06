import { clear, knock, solid } from '../solid'
import { GAP } from '../clearance'

// 戏剧面具（角色扮演、人设）：前面左下一张笑脸（喜剧），后面右上一张哭脸（悲剧）；两张脸同一个造型：
// 上沿微微拱起，两侧往下收成圆下巴。前面的脸是遮挡刀：后面的脸在它四周断开、被它挡住的部分删掉
const face = (cx, top, w = 11, h = 12.5) => {
  const [l, r] = [cx - w / 2, cx + w / 2]
  const f = v => +v.toFixed(3)
  return `M${f(l)} ${top}Q${cx} ${f(top - 1.2)} ${f(r)} ${top}C${f(r)} ${f(top + h * 0.55)} ${f(cx + w * 0.28)} ${f(top + h)} ${cx} ${f(top + h)}`
    + `C${f(cx - w * 0.28)} ${f(top + h)} ${f(l)} ${f(top + h * 0.55)} ${f(l)} ${top}Z`
}
const front = face(8.5, 8.5)
const back = face(15.5, 3.5)
// 笑脸：弯成 ∩ 的眼睛 + 上扬的嘴
// 五官往脸中间收：离两侧脸边至少 2.5（粗字重下也留得出空隙）
const comedy = ['M5.75 12.75Q6.5 11.75 7.25 12.75', 'M9.75 12.75Q10.5 11.75 11.25 12.75', 'M6.25 16Q8.5 19 10.75 16']
// 哭脸露出来的右半边：往外垂的眼睛 + 下撇的嘴
const tragedy = ['M17.25 7.25L19.25 8.25', 'M17 13Q18.5 11.5 20 13']

// 前脸的五官也标成刀：遮挡刀会删掉落在它内部的其他线，五官是刀就不会被删（它们离后面的脸很远，不会误裁）
export default () => [back, ...tragedy, { d: front, cut: true, occlude: true }, ...comedy.map(d => ({ d, cut: true }))]

// 实心：后面的脸一块、挖掉五官；前面的脸四周让出缝，再铺一块、挖掉五官
export const fill = () => [solid(back), knock(tragedy), clear(front, GAP), solid(front), knock(comedy)]
