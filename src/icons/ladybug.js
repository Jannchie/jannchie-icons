import { GAP } from '../clearance'
import { circle, meet } from '../geometry'
import { dot } from '../scene'
import { cutout, knock, stacked } from '../solid'

// 瓢虫：俯视，头朝上。圆身子（圆心 (12, 13.5)、半径 7.5）+ 顶上露出半圆的头（圆心 (12, 6.25)、半径 3.25，两端落在身子的圆上）
// + 身子中间一道竖线分开两片鞘翅 + 四个圆斑点。圆身 + 斑点是瓢虫的记号；不画腿：加上六条腿就和 bug（调试）混在一起了
const [bx, by, R] = [12, 13.5, 7.5]
const [hx, hy, r] = [12, 6.25, 3.25]
const f = v => +v.toFixed(3)
const [a, b] = meet([bx, by], R, [hx, hy], r)
const body = circle(bx, by, R)
const head = `M${f(b[0])} ${f(b[1])}A${r} ${r} 0 0 1 ${f(a[0])} ${f(a[1])}`
const seam = [[12, by - R], [12, by + R]]
const spots = [dot(8.75, 11.75, 2.25), dot(15.25, 11.75, 2.25), dot(9, 16.75, 2.25), dot(15, 16.75, 2.25)]

export default () => [body, head, `M${seam[0].join(' ')}V${seam[1][1]}`, ...spots.map(p => ({ ...p, round: true }))]

// 实心：头封口一块，身子在头四周让出缝；身子一块，中缝从身子顶上一直挖穿到底（上端平头，停在头下面的缝里，不切到头；同 bug），斑点挖空
export const fill = ({ stroke }) => {
  const h = stroke / 2
  return [
    ...stacked(`${head}Z`, body),
    cutout(`M${12 - h} ${by - R - h - GAP}H${12 + h}V24H${12 - h}Z`),
    knock(spots.map(p => ({ ...p, round: true }))),
  ]
}
