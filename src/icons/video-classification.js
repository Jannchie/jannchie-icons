import { pipeline } from '../modality'

// Hugging Face 任务：视频分类（video › tag）
export default ({ radius }) => pipeline(['video'], 'tag', radius)
