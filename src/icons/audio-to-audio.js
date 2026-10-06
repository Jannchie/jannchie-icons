import { pipeline } from '../modality'

// Hugging Face 任务：音频到音频（audio › audio）
export default ({ radius }) => pipeline(['audio'], 'audio', radius)
