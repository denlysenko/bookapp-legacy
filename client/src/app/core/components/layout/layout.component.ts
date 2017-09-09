import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ba-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {
  @Input() isLoggedIn: boolean;
}
