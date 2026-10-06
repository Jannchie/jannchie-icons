import { pipeline } from '../modality'

// Hugging Face 任务：图片到视频（image › video）
export default ({ radius }) => pipeline(['image'], 'video', radius)
