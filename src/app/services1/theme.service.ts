import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'smartcarwash-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDark = signal<boolean>(true);

  constructor() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const startDark = saved ? saved === 'dark' : prefersDark;
    this.setTheme(startDark);
  }

  toggle() {
    this.setTheme(!this.isDark());
  }

  setTheme(dark: boolean) {
    this.isDark.set(dark);
    document.body.classList.toggle('light-theme', !dark);
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
  }
}