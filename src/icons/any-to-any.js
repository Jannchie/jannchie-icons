import { pipeline } from '../modality'

// Hugging Face 任务：任意到任意（any › any）
export default ({ radius }) => pipeline(['any'], 'any', radius)
