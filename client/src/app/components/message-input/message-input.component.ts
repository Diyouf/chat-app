import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageInputComponent {
  message = '';

  @Output() messageSent = new EventEmitter<string>();

  sendMessage(): void {
    if (this.message.trim() !== '') {
      console.log(this.message)
      this.messageSent.emit(this.message);
      this.message = '';
    }
  }
}
