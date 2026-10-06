import { pipeline } from '../modality'

// Hugging Face 任务：文本到 3D（text › cube）
export default ({ radius }) => pipeline(['text'], 'cube', radius)
