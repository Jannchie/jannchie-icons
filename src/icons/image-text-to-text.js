import { pipeline } from '../modality'

// Hugging Face 任务：图片 + 文本到文本（image + text › text）
export default ({ radius }) => pipeline(['image', 'text'], 'text', radius)
