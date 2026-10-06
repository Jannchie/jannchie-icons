import { pipeline } from '../modality'

// Hugging Face 任务：文本生成（any › text）
export default ({ radius }) => pipeline(['any'], 'text', radius)
