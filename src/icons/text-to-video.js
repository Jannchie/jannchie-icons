import { pipeline } from '../modality'

// Hugging Face 任务：文本到视频（text › video）
export default ({ radius }) => pipeline(['text'], 'video', radius)
