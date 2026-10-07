import { glyph } from '../letters'

// 商标 ™：放大的 T 和 M 并排；按字宽 3.5 放大到 5（缩放 10/7），T 的竖画、M 的两条竖边和顶边都落在 .5 上
const k = 5 / 3.5
export default () => [glyph('T', 4, 7.5, k), glyph('M', 13.5, 7.5, k)]
