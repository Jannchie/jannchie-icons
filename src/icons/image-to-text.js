import { pipeline } from '../modality'

// Hugging Face 任务：图片到文本（image › text）
export default ({ radius }) => pipeline(['image'], 'text', radius)
