import { pipeline } from '../modality'

// Hugging Face 任务：深度估计（image › depth）
export default ({ radius }) => pipeline(['image'], 'depth', radius)
