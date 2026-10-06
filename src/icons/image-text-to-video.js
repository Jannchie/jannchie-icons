import { pipeline } from '../modality'

// Hugging Face 任务：图片 + 文本到视频（image + text › video）
export default ({ radius }) => pipeline(['image', 'text'], 'video', radius)
