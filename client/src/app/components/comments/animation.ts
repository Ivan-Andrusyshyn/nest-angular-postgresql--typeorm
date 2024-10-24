import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const openCloseAnimation = trigger('openClose', [
  state(
    'open',
    style({
      height: '150px',
      opacity: 1,
    })
  ),
  state(
    'closed',
    style({
      height: '0',
      opacity: 0,
    })
  ),
  transition('open => closed', [animate('0.4s')]),
  transition('closed => open', [animate('0.4s')]),
]);
