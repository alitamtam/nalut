import { Component, Input } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator'; // ✅ Import paginator module
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-card',
  standalone: true, // ✅ If using Angular 15+ standalone components
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
  imports: [CommonModule, MatCardModule, MatButtonModule, MatPaginatorModule] // ✅ Import modules here
})
export class NewsCardComponent {
  @Input() newsList: any[] = [];
  totalNews = 100;
  pageSize = 10;

  onPageChange(event: any) {
    console.log('Page changed:', event);
  }
}
