import { ChangeDetectionStrategy, Component } from '@angular/core';
import { rxToggle } from 'rxlize';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  readonly isOpen = rxToggle();
}
