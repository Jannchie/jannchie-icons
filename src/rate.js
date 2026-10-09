// 倍率文字（×0.5、×2 …）：乘号 + 数字 + 小数点，整体居中
// 整组共用同一个字高、基线和乘号大小，放在一起高低一致；放不下时只把数字横向压窄，不缩字高
// 字形只有字母和数字，乘号是一个小叉、小数点是一个点，单独画
import { segments, samples } from './clip'
import { glyph, LABEL, snap } from './letters'
import { dot } from './scene'
import { translate } from './transform'

const H = 7 // 字高：数字占 8.5–15.5，竖直居中
const TOP = 12 - H / 2
const CROSS = 3 // 乘号边长，中心对齐数字的半高
const ASPECT = 0.95 // 数字不压窄时的宽高比，和分级图标一样

// 一组路径中线的横向范围
function spanX(list) {
  let [x0, x1] = [Infinity, -Infinity]
  for (const p of list) {
    for (const s of segments(typeof p === 'string' ? p : p.d)) {
      for (const g of s.segs) {
        for (const [x] of samples(g, 12))
          [x0, x1] = [Math.min(x0, x), Math.max(x1, x)]
      }
    }
  }
  return [x0, x1]
}

// 数字和小数点从 x = 0 排开，整组横竖笔画对齐像素网格（只看相对位置，整组平移由渲染时的 hinting 处理）
// 按每个字形中线的实际范围排（不用字宽）：0、1 这类窄字两边不留空，挤的 ×0.75、×1.25 里每个数字能宽一点
// gap：相邻两笔中线的间距；point：数字的笔画到小数点圆心的距离
const ink = (c, sx) => spanX([glyph(c, 0, TOP, sx, H / 6, LABEL)])
function digits(chars, sx, gap, point) {
  const out = []
  let x = 0
  chars.forEach((c, i) => {
    if (c === '.') {
      x += point - gap
      out.push(dot(x, TOP + H - 0.25, 1.5)) // 小点：直径等于线宽
      x += point
    }
    else {
      const [a, b] = ink(c, sx)
      out.push(glyph(c, x - a, TOP, sx, H / 6, LABEL))
      x += b - a + gap
    }
  })
  return snap(out)
}

// 乘号左端和最后一笔右端的墨迹停在 2 和 22（中线 2 + h、22 - h），字重加粗时向内长；
// 字距随线宽放宽：留白常规 0.5、粗字重 0.25（中线间距 2、2.25），小数点两边再多留 0.25（圆点直径等于线宽）；
// 最宽的 ×0.75、×1.25 撑满，数字横向压窄（吸附网格后还放不下就再压一点）
export function rate(text, stroke = 1.5) {
  const h = stroke / 2
  const chars = [...text]
  const gap = 1.25 + h
  const point = gap + 0.25
  const width = 20 - stroke
  const fixed = chars.reduce((w, c, i) => w + (c === '.' ? 2 * point - gap : i ? gap : 0), CROSS + gap)
  const units = chars.reduce((w, c) => w + (c === '.' ? 0 : ink(c, 1).reduce((a, b) => b - a)), 0)
  let sx = Math.min(H / 6 * ASPECT, (width - fixed) / units)
  let out, d0, d1
  for (;; sx -= 0.01) {
    out = digits(chars, sx, gap, point);
    [d0, d1] = spanX(out)
    // 吸附会把相邻两笔挪近（最近只保证隔 1），挤到留白不足 0.25 的也再压窄重排
    const spans = out.map(p => spanX([p]))
    if (CROSS + gap + d1 - d0 <= width + 1e-6 && spans.every((s, i) => !i || s[0] - spans[i - 1][1] >= stroke + 0.25 - 1e-6))
      break
  }
  // 按中线的实际范围左右居中（窄字 1 的字形不在字宽正中、吸附也会挪动笔画）
  const left = 12 - (CROSS + gap + d1 - d0) / 2
  const [cx, r] = [left + CROSS / 2, CROSS / 2]
  const dx = left + CROSS + gap - d0
  return [
    `M${cx - r} ${12 - r}L${cx + r} ${12 + r}`,
    `M${cx + r} ${12 - r}L${cx - r} ${12 + r}`,
    ...out.map(p => (typeof p === 'string' ? translate(p, dx, 0) : { ...p, d: translate(p.d, dx, 0) })),
  ]
}
