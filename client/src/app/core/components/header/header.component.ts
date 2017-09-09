import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output
} from '@angular/core';
import { User } from '../../../auth/models/User';
import { APP_CONFIG } from '../../../config/app.config';
import { AppConfig } from '../../../config/AppConfig';

@Component({
  selector: 'ba-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() isLoggedIn: boolean;
  @Input() user: User;
  @Output() onSignout = new EventEmitter();

  signout(event: MouseEvent) {
    event.preventDefault();
    this.onSignout.emit();
  }

  constructor(@Inject(APP_CONFIG) private config: AppConfig) { }
}
