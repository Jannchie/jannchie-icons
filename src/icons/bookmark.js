import { bookmark } from '../symbols'

// 书签：符号放到 2.6 倍，吸附网格后外框落在 7.5–16.5 × 3.5–19.7（下角是尖缺口两侧的小圆角），
// 中心取 12.5 让顶边和下角离画布上下边一样远
export default ({ radius }) => bookmark([12, 12.5], 2.6, radius)
