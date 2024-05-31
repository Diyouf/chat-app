import { Component, EventEmitter, Output, signal, HostBinding } from '@angular/core';

@Component({
  selector: 'app-dark-light',
  templateUrl: './dark-light.component.html',
  styleUrls: ['./dark-light.component.css']
})
export class DarkLightComponent {
  darkMode = signal<boolean>(false);

  @Output() darkModeChange = new EventEmitter<boolean>();

  toggleDarkMode() {
    this.darkMode.set(!this.darkMode());
    this.darkModeChange.emit(this.darkMode());
  }
}
