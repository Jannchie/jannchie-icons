// GHS 危险品象形图（GHS01 → GHS09），键按编号顺序，预览页据此排序
// 外框是转 45° 的菱形；菱形里空间小，内容都标成细节（粗字重下线宽封顶），只保留 24px 能认的骨架
import { circle, rounded } from './geometry'
import { dot, eye } from './scene'

const diamond = radius => rounded([[12, 1.5], [22.5, 12], [12, 22.5], [1.5, 12]], Math.min(radius, 2))
export const detail = d => ({ d, detail: true })

// 火焰：左边一个高火舌、右边一个矮火舌，中间凹进去；(cx, bottom) 是底部中点，s 缩放
export const flame = (cx, bottom, s = 1) => {
  const p = (x, y) => `${cx + x * s} ${bottom - y * s}`
  return `M${p(0, 0)}C${p(-2.5, 0)} ${p(-3.75, 1.75)} ${p(-3.5, 3.75)}C${p(-3.25, 6)} ${p(-1.5, 7)} ${p(-1.5, 10)}C${p(0.5, 8.75)} ${p(1.5, 7)} ${p(1, 4.75)}C${p(1.75, 5.25)} ${p(2.25, 6)} ${p(2.5, 7)}C${p(3.75, 5.5)} ${p(4, 3.25)} ${p(3.25, 1.75)}C${p(2.5, 0.5)} ${p(1.5, 0)} ${p(0, 0)}Z`
}
// 爆炸的锯齿轮廓：上半圈尖角交替，两端落在 y = cy
const burst = (cx, cy) => {
  const pts = []
  for (let i = 0; i <= 8; i++) {
    const a = Math.PI * (1 + i / 8)
    const r = i % 2 ? 6.5 : 4.25
    pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r])
  }
  return rounded(pts, 0.25, false)
}

export const GHS = {
  // GHS01 爆炸物：炸开的球，上方一圈锯齿状的爆炸轮廓
  'explosive': { zh: 'GHS01 爆炸物', paths: () => [circle(12, 14.25, 2), burst(12, 15.5)].map(detail) },
  // GHS02 易燃：火焰 + 底线
  'flammable': { zh: 'GHS02 易燃', paths: () => [flame(12, 15), 'M9.5 17H14.5'].map(detail) },
  // GHS03 氧化性：圆上火焰（火焰缩到 0.7，火舌尖离菱形框的上角留开）
  'oxidizing': { zh: 'GHS03 氧化性', paths: () => [flame(12, 13, 0.7), circle(12, 15.5, 2.25)].map(detail) },
  // GHS04 压缩气体：横躺的气瓶，右端瓶颈 + 阀门
  'gas-cylinder': {
    zh: 'GHS04 压缩气体',
    paths: r => [rounded([[6, 10], [15, 10], [15, 15], [6, 15]], Math.min(r, 2.5)), 'M15 12.5H17.5', 'M17.5 10.5V14.5'].map(detail),
  },
  // GHS05 腐蚀性：斜着的试管往下滴液，落在缺了一块的金属条上
  'corrosive': {
    zh: 'GHS05 腐蚀性',
    paths: r => [
      rounded([[8.5, 7.5], [14.5, 10.5], [13.75, 12], [7.75, 9]], Math.min(r, 1)),
      dot(15, 13.75, 1.5),
      'M8.5 16.5H13.5L14.75 15.5L16 16.5',
    ].map(p => (typeof p === 'string' ? detail(p) : p)),
  },
  // GHS06 急性毒性：骷髅 + 交叉骨
  'toxic': {
    zh: 'GHS06 急性毒性',
    paths: () => [
      detail('M9 10.5A3 3 0 1 1 15 10.5V12H9Z'),
      eye(10.75, 9.75, 1.5),
      eye(13.25, 9.75, 1.5),
      detail('M8.5 14L15.5 18'),
      detail('M15.5 14L8.5 18'),
    ],
  },
  // GHS07 有害：感叹号
  'harmful': { zh: 'GHS07 有害', paths: () => [detail('M12 6.5V13.5'), dot(12, 16.5)] },
  // GHS08 健康危害：半身人像，胸口一个星爆
  'health-hazard': {
    zh: 'GHS08 健康危害',
    paths: () => [
      circle(12, 7.5, 1.75),
      'M7.5 17.5V15C7.5 12.5 9.5 11 12 11C14.5 11 16.5 12.5 16.5 15V17.5',
      'M12 13V17M10.27 14L13.73 16M13.73 14L10.27 16',
    ].map(detail),
  },
  // GHS09 环境危害：枯树 + 翻肚的死鱼
  'environment': {
    zh: 'GHS09 环境危害',
    paths: () => [
      'M9.5 12.5V6M9.5 9L7.5 7M9.5 8L11.5 6.5',
      'M8 15.5C9.5 14 12.5 14 14.5 15.5C12.5 17 9.5 17 8 15.5ZM14.5 15.5L16.5 14V17Z',
      'M6.5 12.5H12.5',
    ].map(detail),
  },
}

export const ghsFrame = diamond
