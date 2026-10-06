import { mirror } from '../transform'

// 入耳式耳机：左边一只「圆头 + 竖柄」的耳塞（柄从圆头右下方伸下来，底端圆头），右边是它的镜像
const bud = 'M11 8.5A3.5 3.5 0 1 0 8.5 11.85V19.5A1.25 1.25 0 0 0 11 19.5Z'
export default () => [bud, mirror(bud)]
