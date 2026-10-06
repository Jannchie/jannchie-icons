import { pipeline } from '../modality'

// Hugging Face 任务：完形填空（text › blank）
export default ({ radius }) => pipeline(['text'], 'blank', radius)
