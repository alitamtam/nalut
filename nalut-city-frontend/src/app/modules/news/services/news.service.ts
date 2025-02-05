import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { News } from '../models/news';


@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private news: News[] = [
    {
      id: 1,
      title: 'New Infrastructure Project Launched in Nalut',
      description: 'The city is investing in major infrastructure upgrades...',
      imageUrl: 'assets/news/infrastructure.jpg',
      publishedAt: new Date(),
    },
    {
      id: 2,
      title: 'Nalut Festival 2025 Announced',
      description: 'The annual festival is set to take place with various events...',
      imageUrl: 'assets/news/festival.jpg',
      publishedAt: new Date(),
    },
  ];

  constructor() {}

  getNews(): Observable<News[]> {
    return of(this.news); // Replace with an HTTP call when using a real API
  }
}
