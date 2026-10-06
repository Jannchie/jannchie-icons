import { pipeline } from '../modality'

// Hugging Face 任务：无条件图片生成（any › image）
export default ({ radius }) => pipeline(['any'], 'image', radius)
