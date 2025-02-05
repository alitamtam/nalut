import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { NewsCardComponent } from './modules/news/components/news-card/news-card.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent,RouterOutlet,CommonModule,NewsCardComponent], // Import Navbar here
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'nalut-city-frontend';
}
