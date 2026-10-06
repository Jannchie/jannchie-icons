import { pipeline } from '../modality'

// Hugging Face 任务：特征提取（text › vector）
export default ({ radius }) => pipeline(['text'], 'vector', radius)
