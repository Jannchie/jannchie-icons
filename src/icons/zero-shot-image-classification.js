import { pipeline } from '../modality'

// Hugging Face 任务：零样本图片分类（image + any › tag）
export default ({ radius }) => pipeline(['image', 'any'], 'tag', radius)
