// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Importado para router-outlet
import { HeaderComponent } from './shared/header/header.component'; // Importado
import { Footer } from './shared/footer/footer.component'; // Importado

@Component({
  selector: 'app-root',
  standalone: true, // <-- STANDALONE
  imports: [RouterOutlet, HeaderComponent, Footer],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-granet';
}