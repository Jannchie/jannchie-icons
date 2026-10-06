import { pipeline } from '../modality'

// Hugging Face 任务：视频 + 文本到文本（video + text › text）
export default ({ radius }) => pipeline(['video', 'text'], 'text', radius)
