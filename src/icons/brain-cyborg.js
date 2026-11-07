import { RIGHT_TRACES } from '../brain-circuit'
import { brainFill, LEFT_FOLDS, MIDLINE, outline } from './brain'

// 半机械脑：左半是脑褶皱，右半是电路走线
export default () => [outline(), MIDLINE, ...LEFT_FOLDS, ...RIGHT_TRACES]

// 实心：脑叶一块，挖掉脑沟、左半的褶皱和右半的走线
export const fill = () => brainFill([...LEFT_FOLDS, ...RIGHT_TRACES])
