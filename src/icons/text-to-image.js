import { pipeline } from '../modality'

// Hugging Face 任务：文本到图片（text › image）
export default ({ radius }) => pipeline(['text'], 'image', radius)
