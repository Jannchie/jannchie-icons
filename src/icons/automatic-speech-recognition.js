import { pipeline } from '../modality'

// Hugging Face 任务：语音识别（speech › text）
export default ({ radius }) => pipeline(['speech'], 'text', radius)
