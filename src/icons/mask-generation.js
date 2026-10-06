import { pipeline } from '../modality'

// Hugging Face 任务：掩码生成（image › mask）
export default ({ radius }) => pipeline(['image'], 'mask', radius)
