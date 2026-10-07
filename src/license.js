// 开源协议：横放的证书（右下角压一个带绶带的印章），协议名写在证书上半部分
import { circle, rounded } from './geometry'
import { line, textWidth } from './letters'

// 印章：圆心 (17, 16)，半径 2.5，压在证书右下角；遮挡刀，证书外框落在印章里的部分整段去掉
// 刀会把离印章 gap + 线宽 以内的线都断开：gap 0.5 时最粗字重（2）下是 2.5，协议名底边（y = 10.5）离印章顶（13.5）有 3，不会被切到
const SEAL = [17, 16, 2.5]
const seal = () => {
  const [x, y, r] = SEAL
  return [
    { d: circle(x, y, r), cut: true, occlude: true, gap: 0.5 },
    // 绶带：印章下方两条向外撇的短带
    `M${x - 1.25} ${y + r - 0.25}L${x - 1.75} 22M${x + 1.25} ${y + r - 0.25}L${x + 1.75} 22`,
  ]
}
const paper = radius => rounded([[2.5, 2.5], [21.5, 2.5], [21.5, 16.5], [2.5, 16.5]], Math.min(radius, 2))

// 协议名用细线（外框的 0.7 倍），和外框拉开层次；一行写在印章上方的空白里（x 5.5–18.5，y 5.5–10.5，字高 5），
// 离外框留 3、离印章留 3；字多时横向压窄
const GAP = 2
export function license(text, radius) {
  const sx = Math.min(0.8, (13 - GAP * (text.length - 1)) / textWidth(text))
  return [paper(radius), ...seal(), ...line(text, [12, 8], sx, GAP, 5 / 6).map(d => ({ d, thin: true }))]
}
// 没有协议名的通用证书：两行文字线
export const certificate = radius => [paper(radius), ...seal(), { d: 'M6 7H18M6 10.5H12.5', thin: true }]

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
