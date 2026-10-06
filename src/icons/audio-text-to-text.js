import { pipeline } from '../modality'

// Hugging Face 任务：音频 + 文本到文本（audio + text › text）
export default ({ radius }) => pipeline(['audio', 'text'], 'text', radius)
