import { Component, effect, HostBinding, OnInit, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Chat app';
  isAuthRoute: boolean = false;
  darkMode = signal<boolean>(JSON.parse(localStorage.getItem('darkMode') || 'false') as boolean);

  constructor(private router: Router,private overlayContainer: OverlayContainer) {
    effect(() => {
      localStorage.setItem('darkMode', JSON.stringify(this.darkMode()))
    });
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isAuthRoute = this.router.url.includes('/auth');
    });
  }

  isAuth(): boolean {
    return this.isAuthRoute;
  }

  @HostBinding('class.dark') get mode() {
    return this.darkMode();
  }

  onDarkModeChange(darkMode: boolean) {
    this.darkMode.set(darkMode);
    this.applyDarkModeClass();
  }

  private applyDarkModeClass() {
    const overlayContainerElement = this.overlayContainer.getContainerElement();
    if (this.darkMode()) {
      overlayContainerElement.classList.add('dark');
    } else {
      overlayContainerElement.classList.remove('dark');
    }
  }
}
