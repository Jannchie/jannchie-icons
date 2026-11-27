import { rounded } from '../geometry'
import { stacked } from '../solid'
import { rotate, translate } from '../transform'

// 马桶搋子（皮搋子）：一根有粗细的长木柄（宽 3 的圆头木棍，比皮碗长得多）+ 柄底下小而扁的两段式皮碗——上面一个圆顶（宽 8.5、高 3.5），
// 圆顶坐在一圈更宽、往外翻的裙边上（折线宽 10.5，碗口宽 13.5，平底），折线就是裙边的顶边；
// 竖着画（柄顶在 0、碗口在 18.5），再顺时针转 45°：皮碗在左下、柄朝右上（和 shovel、rake 同一个方向），转完挪一点让墨迹居中
// 靠「长木棍 + 两段式的扁皮碗 + 斜放」认出来：细线柄加一个光滑的圆顶，直立着像铃铛、吊灯
const t = d => translate(rotate(d, 45), 0.15, -0.2)
// 柄的两条边落在圆顶上（x = 10.5 / 13.5 处圆顶高 11.69）
const handle = radius => rounded([[10.5, 11.69], [10.5, 0], [13.5, 0], [13.5, 11.69]], Math.min(radius, 1.5), false)
const dome = 'M7.75 15C7.75 12.76 9.62 11.5 12 11.5C14.38 11.5 16.25 12.76 16.25 15'
const skirt = 'M5.25 18.5C6.45 18 6.75 16.75 6.75 15H17.25C17.25 16.75 17.55 18 18.75 18.5Z'

export default ({ radius }) => [handle(radius), dome, skirt].map(t)

// 实心：木柄、圆顶、裙边各一块，从后往前叠（柄插在圆顶后面，圆顶坐在裙边后面），交界处各让出一道缝
export const fill = ({ radius }) => stacked(t(`${handle(radius)}V13.5H10.5Z`), t(`${dome}Z`), t(skirt))
