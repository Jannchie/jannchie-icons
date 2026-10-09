// 开源协议：横放的证书（右下角压一个带绶带的印章），协议名写在证书上半部分
import { circle, rounded } from './geometry'
import { LABEL, line, snap } from './letters'

// 印章：圆心 (17, 16)，半径 2.5，压在证书右下角；遮挡刀，证书外框落在印章里的部分整段去掉
// 刀会把离印章 gap + 线宽 以内的线都断开：gap 0.5 时最粗字重（2）下是 2.5，协议名底边（y = 10.75）离印章顶（13.5）有 2.75，不会被切到
const SEAL = [17, 16, 2.5]
const seal = (h) => {
  const [x, y, r] = SEAL
  return [
    { d: circle(x, y, r), cut: true, occlude: true, gap: 0.5 },
    // 绶带：印章下方两条向外撇的短带，从圆上直接垂下；墨迹底端停在 22（中线 22 - h），和证书顶边离画布一样远
    // 绶带也当刀（不遮挡），自己不被印章的刀切断——否则粗字重下只剩两个点
    { d: `M${x - 1.25} ${y + r - 0.25}L${x - 1.75} ${22 - h}M${x + 1.25} ${y + r - 0.25}L${x + 1.75} ${22 - h}`, cut: true, gap: 0.5 },
  ]
}
// 证书外框：墨迹外沿固定在 x 2–22、y 2–17，字重加粗时向内长
const paper = (radius, h) => rounded([[2 + h, 2 + h], [22 - h, 2 + h], [22 - h, 17 - h], [2 + h, 17 - h]], Math.min(radius, 2))

// 协议名用细线（外框的 0.7 倍），和外框拉开层次；一行写在印章上方的空白里（中线 x 5.25–18.75，y 5.25–10.75，字高 5.5）
// 粗字重下外框内沿在 4、细线半宽 0.7，字离外框还有 0.5 多；字底离印章顶（13.5）2.75，印章的刀（粗字重 2.5）切不到
// 字宽按排字区算：三个字母字距 2、最宽 0.8 倍；四个字母（LGPL、AGPL）字距收到 1.75（粗字重细线 1.4 下还留 0.35），字宽约 2。
// 三个字母的整组吸附网格；四个字母不吸附：2 宽的字里吸附会把相邻两笔挤到只隔 1，A、G 被压成一团、G 和 P 粘在一起
const BOX = [5.25, 18.75]
export function license(text, radius, stroke = 1.5) {
  const h = stroke / 2
  const n = text.length
  const gap = n > 3 ? 1.75 : 2
  const sx = Math.min(0.8, (BOX[1] - BOX[0] - gap * (n - 1)) / (3.5 * n))
  const letters = line(text, [12, 8], sx, gap, 5.5 / 6, LABEL)
  return [paper(radius, h), ...seal(h), ...(n > 3 ? letters : snap(letters)).map(d => ({ d, thin: true }))]
}
// 没有协议名的通用证书：两行文字线
export const certificate = (radius, stroke = 1.5) => [paper(radius, stroke / 2), ...seal(stroke / 2), { d: 'M6 7H18M6 10.5H12.5', thin: true }]

export const LICENSES = {
  mit: { text: 'MIT', zh: 'MIT 许可证' },
  apache: { text: 'ASL', zh: 'Apache 许可证（Apache Software License）' },
  gpl: { text: 'GPL', zh: 'GNU 通用公共许可证' },
  lgpl: { text: 'LGPL', zh: 'GNU 宽通用公共许可证' },
  agpl: { text: 'AGPL', zh: 'GNU Affero 通用公共许可证' },
  bsd: { text: 'BSD', zh: 'BSD 许可证' },
  mpl: { text: 'MPL', zh: 'Mozilla 公共许可证' },
  isc: { text: 'ISC', zh: 'ISC 许可证' },
}
