import { pipeline } from '../modality'

// Hugging Face 任务：语音活动检测（audio › check）
export default ({ radius }) => pipeline(['audio'], 'check', radius)
