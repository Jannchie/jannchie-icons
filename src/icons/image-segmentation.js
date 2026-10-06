import { pipeline } from '../modality'

// Hugging Face 任务：图片分割（image › segment）
export default ({ radius }) => pipeline(['image'], 'segment', radius)
