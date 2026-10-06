import { pipeline } from '../modality'

// Hugging Face 任务：音频分类（audio › tag）
export default ({ radius }) => pipeline(['audio'], 'tag', radius)
