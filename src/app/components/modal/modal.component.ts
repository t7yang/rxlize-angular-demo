import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @Input() isActive: boolean | null = false;

  @Output() closed = new EventEmitter();
}
