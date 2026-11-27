import { knock, solid } from '../solid'
import { rotate } from '../transform'

// 橄榄球（英式橄榄球）：两头圆、中间胖的椭圆球身（长 20.5、最宽处 13.5，比 american-football 胖一圈，两头不带尖）+ 球皮的接缝——
// 两头各一道弧形的横缝（端片），两道横缝之间一道顺着球身的中缝；没有系带。竖着画再逆时针转 45°（\ 方向，和 american-football 的 / 相反）
// 和 american-football 区分：那个是两头尖的梭形 + 鱼骨形的系带
const t = d => rotate(d, -45)
const ball = t('M12 1.75C16.25 1.75 18.75 6.5 18.75 12C18.75 17.5 16.25 22.25 12 22.25C7.75 22.25 5.25 17.5 5.25 12C5.25 6.5 7.75 1.75 12 1.75Z')
// 横缝的两端落在球的轮廓上（y = 6 / 18 处 x = 6.41 / 17.59），中缝的两端落在横缝的弧顶上
const ARCS = ['6.41 6C10 7.75 14 7.75 17.59 6', '6.41 18C10 16.25 14 16.25 17.59 18']
const seam = t('M12 7.31V16.69')

export default () => [ball, ...ARCS.map(d => t(`M${d}`)), seam]

// 实心：球一块，三道接缝挖空；横缝两端顺着切线往外延长、穿出球身，球分成两个端片和中间左右两片
export const fill = () => [
  solid(ball),
  knock([t(`M4.41 5.03L${ARCS[0]}L19.59 5.03`), t(`M4.41 18.97L${ARCS[1]}L19.59 18.97`), seam]),
]
