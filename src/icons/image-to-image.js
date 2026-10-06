import { pipeline } from '../modality'

// Hugging Face 任务：图片到图片（image › image）
export default ({ radius }) => pipeline(['image'], 'image', radius)
