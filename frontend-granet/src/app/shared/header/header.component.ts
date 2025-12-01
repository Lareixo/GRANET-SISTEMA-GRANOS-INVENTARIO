// src/app/shared/header/header.component.ts
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationStart, Event } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuCollapsed = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event: Event): event is NavigationStart => event instanceof NavigationStart)
    ).subscribe(() => {
      this.closeMenu();
    });
  }

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  closeMenu() {
    this.isMenuCollapsed = true;
  }
}