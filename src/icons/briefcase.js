import { plain, waist } from '../briefcase'

// 公文包：箱体 + 提手 + 腰线
export default ({ radius }) => [...plain(radius), waist]
