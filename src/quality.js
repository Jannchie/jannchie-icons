// 画质标识：横向圆角外框 + 框里放大的线条字母（2–3 个字，整体居中）
import { rounded } from './geometry'
import { LABEL, line, snap } from './letters'

// 字母都是 7.2 高；两个字母 4.2 宽，三个字母横向压窄到 3（否则挤不下）
// 字母间距 2.5：减去线宽后还留约 1 的空，不会粘连
const H = 1.2
const widthOf = n => (n > 2 ? 0.85 : 1.2)
const GAP = 2.5

export const QUALITIES = {
  'sd': { text: 'SD', zh: '标清' },
  'hd': { text: 'HD', zh: '高清' },
  'fhd': { text: 'FHD', zh: '全高清 1080p' },
  'uhd': { text: 'UHD', zh: '超高清' },
  '2k': { text: '2K', zh: '2K' },
  '4k': { text: '4K', zh: '4K' },
  '8k': { text: '8K', zh: '8K' },
  'hdr': { text: 'HDR', zh: '高动态范围' },
  'blu-ray': { text: 'BD', zh: '蓝光（Blu-ray Disc）' },
}

export function quality(text, radius) {
  return [
    rounded([[2.5, 5.5], [21.5, 5.5], [21.5, 18.5], [2.5, 18.5]], Math.min(radius, 2.5)),
    // 框里的小字：切角标签字形、内部细线，整组横竖笔画吸到 .5 网格（和文件扩展名同一套写法）
    ...snap(line(text, [12, 12], widthOf(text.length), GAP, H, LABEL)).map(d => ({ d, thin: true })),
  ]
}
