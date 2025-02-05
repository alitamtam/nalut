import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator'; // ✅ Add this
import { NewsCardComponent } from './components/news-card/news-card.component';
import { NewsListComponent } from './components/news-list/news-list.component';

@NgModule({
  declarations: [
    NewsCardComponent,
    NewsListComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule // ✅ Import here
  ],
  exports: [
    NewsCardComponent,
    NewsListComponent
  ]
})
export class NewsModule { }
