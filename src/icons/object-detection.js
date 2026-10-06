import { pipeline } from '../modality'

// Hugging Face 任务：目标检测（image › detect）
export default ({ radius }) => pipeline(['image'], 'detect', radius)
