import { pipeline } from '../modality'

// Hugging Face 任务：图片到 3D（image › cube）
export default ({ radius }) => pipeline(['image'], 'cube', radius)
