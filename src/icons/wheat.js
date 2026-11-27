import { solid } from '../solid'
import { rotate } from '../transform'

// 麦穗：一根斜 45° 的麦秆（从左下到右上）+ 秆上七粒麦粒：顶上一粒顺着秆，下面三对左右分开、朝上斜出去（人字形排列）。先竖着画（秆在 x = 12，从 25 到 3.75），再顺时针转 45°
// 麦粒是两头尖的叶形（长 5.25、最宽约 2.25）：从秆上的一点出发，朝 deg 方向伸出去再回到起点
// 人字形排开的麦粒 + 一根秆是麦穗的记号：和 leaf / leaves（一两片大叶子）、sprout（两片子叶）区分开
const f = v => +v.toFixed(2)
function grain([bx, by], deg, length) {
  const [c, s] = [Math.cos(deg * Math.PI / 180), Math.sin(deg * Math.PI / 180)]
  // along：沿麦粒的长轴，side：垂直于长轴
  const P = (along, side) => `${f(bx + along * c - side * s)} ${f(by + along * s + side * c)}`
  return `M${P(0, 0)}C${P(length * 0.2, 1.9)} ${P(length * 0.7, 1.65)} ${P(length, 0)}C${P(length * 0.7, -1.65)} ${P(length * 0.2, -1.9)} ${P(0, 0)}Z`
}
const tilt = d => rotate(d, 45)
const grains = [
  grain([12, 3.75], -90, 5.25),
  ...[8.75, 13.5, 18.25].flatMap(y => [grain([12, y], -132, 5.25), grain([12, y], -48, 5.25)]),
].map(tilt)

export default () => [...grains, tilt('M12 3.75V25')]

// 实心：麦粒各填实（挨着的连成一串）；最下面一对麦粒以下的麦秆照旧是线
export const fill = () => [solid(grains), tilt('M12 18.25V25')]
