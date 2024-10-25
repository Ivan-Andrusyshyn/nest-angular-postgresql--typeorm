import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-running-line',
  standalone: true,
  imports: [],
  templateUrl: './running-line.component.html',
  styleUrl: './running-line.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RunningLineComponent {}
