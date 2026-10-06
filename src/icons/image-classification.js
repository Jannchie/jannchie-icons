import { pipeline } from '../modality'

// Hugging Face 任务：图片分类（image › tag）
export default ({ radius }) => pipeline(['image'], 'tag', radius)
