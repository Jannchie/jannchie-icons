import { RIGHT_TRACES } from '../brain-circuit'
import { LEFT_FOLDS, MIDLINE, outline } from './brain'

// 半机械脑：左半是脑褶皱，右半是电路走线
export default () => [outline(), MIDLINE, ...LEFT_FOLDS, ...RIGHT_TRACES]
