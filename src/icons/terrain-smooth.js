import { crisp, rounded } from '../geometry'

// 抹平地形：上面一道起伏的地形线（两个整波，峰谷各差 2），下面一条平直的地平线 (y = 20.5)，
// 中间一个向下的 V 形箭头表示「从起伏变平」；V 的两翼 45°，尖在 (12, 15.5)
const h = 19 / 4 // 半个波长
let wave = 'M2.5 7'
for (let i = 0; i < 4; i++) {
  const [x0, k] = [2.5 + i * h, i % 2 ? 1 : -1]
  wave += `C${x0 + h * 0.36} ${7 + k * 3} ${x0 + h * 0.64} ${7 + k * 3} ${x0 + h} 7`
}
export default ({ radius }) => [
  wave,
  rounded([[9, 12.5], [12, 15.5], [15, 12.5]], crisp(radius), false),
  'M2.5 20.5H21.5',
]
