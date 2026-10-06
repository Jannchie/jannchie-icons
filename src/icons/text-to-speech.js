import { pipeline } from '../modality'

// Hugging Face 任务：文本到语音（text › speech）
export default ({ radius }) => pipeline(['text'], 'speech', radius)
