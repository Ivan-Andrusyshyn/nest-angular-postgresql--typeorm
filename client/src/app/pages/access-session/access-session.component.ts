import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-access-session',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './access-session.component.html',
  styleUrl: './access-session.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessSessionComponent {}
