import { pipeline } from '../modality'

// Hugging Face 任务：图片 + 文本到图片（image + text › image）
export default ({ radius }) => pipeline(['image', 'text'], 'image', radius)
