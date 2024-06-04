import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-dark-light',
  templateUrl: './dark-light.component.html',
  styleUrls: ['./dark-light.component.css']
})
export class DarkLightComponent implements OnInit {
  @Output() darkModeChange = new EventEmitter<boolean>();
  darkMode!: boolean;

  ngOnInit() {
    this.darkMode = JSON.parse(localStorage.getItem('darkMode') ?? 'false') as boolean;
    this.darkModeChange.emit(this.darkMode);
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.darkModeChange.emit(this.darkMode);
    localStorage.setItem('darkMode', JSON.stringify(this.darkMode));
  }
}
