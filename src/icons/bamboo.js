import { rounded } from '../geometry'
import { knock, solid } from '../solid'
import { mirror, translate } from '../transform'

// 竹子：一根竖直的竹竿（10.5–13.5 × 3.5–20.5），两道竹节（8.5 / 15.5）把它分成三截；
// 上面的竹节往右上长出一片尖叶，下面的竹节往左上长出一片（上面那片的镜像，下移 7）
const culm = radius => rounded([[10.5, 3.5], [13.5, 3.5], [13.5, 20.5], [10.5, 20.5]], Math.min(radius, 1))
const nodes = ['M10.5 8.5H13.5', 'M10.5 15.5H13.5']
const leaf = 'M13.5 8.5C14.5 6 17 4.75 20.5 5.25C20 8.25 17 9.5 13.5 8.5Z'
const leaves = [leaf, mirror(translate(leaf, 0, 7))]

export default ({ radius }) => [culm(radius), ...nodes, ...leaves]

// 实心：竹竿一块，两道竹节整条挖穿，竹竿分成三截；两片叶子各一块
export const fill = ({ radius }) => [solid(culm(radius)), knock(['M8.5 8.5H15.5', 'M8.5 15.5H15.5']), solid(leaves)]
