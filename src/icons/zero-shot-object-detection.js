import { pipeline } from '../modality'

// Hugging Face 任务：零样本目标检测（image + any › detect）
export default ({ radius }) => pipeline(['image', 'any'], 'detect', radius)
