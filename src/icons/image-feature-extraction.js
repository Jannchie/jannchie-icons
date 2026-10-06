import { pipeline } from '../modality'

// Hugging Face 任务：图片特征提取（image › vector）
export default ({ radius }) => pipeline(['image'], 'vector', radius)
