import { Component, HostListener, OnInit ,Inject,PLATFORM_ID} from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { isPlatformBrowser } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';

@Component({
  imports: [
    CommonModule,
    MatSlideToggleModule,
     MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbar,
    MatIconModule],
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
  })
  export class NavbarComponent implements OnInit {
    isMobile = false;
  
    constructor(@Inject(PLATFORM_ID) private platformId: object) {}
  
    ngOnInit() {
      this.checkScreenSize();
    }
  
    @HostListener('window:resize', [])
    checkScreenSize() {
      if (isPlatformBrowser(this.platformId)) {
        // ✅ Fix for window undefined error in SSR
        this.isMobile = window.innerWidth < 768;
      }
    }
  }