import { pipeline } from '../modality'

// Hugging Face 任务：视频到视频（video › video）
export default ({ radius }) => pipeline(['video'], 'video', radius)
