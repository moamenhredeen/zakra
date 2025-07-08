import {Component, inject, OnInit, Renderer2, signal} from '@angular/core';
import { Router, RouterLink, RouterOutlet} from '@angular/router';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatIcon} from '@angular/material/icon'
import {
  MatListItem,
  MatListItemIcon, MatListItemMeta,
  MatListItemTitle,
  MatListSubheaderCssMatStyler,
  MatNavList
} from '@angular/material/list';
import {MatIconButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import { ThemeService } from './theme.service';
import { BookmarkService } from '../bookmark/bookmark.service';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { LayoutService } from './layout.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { LoadingService } from './loading.service';
import { GetCollectionsResponse } from '@zakra/api-spec';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  imports: [
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    MatListItem,
    MatNavList,
    MatIconButton,
    MatIcon,
    MatToolbar,
    RouterOutlet,
    RouterLink,
    MatListItemTitle,
    MatListItemIcon,
    MatListItemMeta,
    TitleCasePipe,
    AsyncPipe,
    MatProgressBarModule,
    MatListSubheaderCssMatStyler
  ],
})
export class Layout implements OnInit {

  #router = inject(Router)
  #themeService = inject(ThemeService)
  #bookmarkService = inject(BookmarkService)
  #layoutService = inject(LayoutService)
  #loadingService = inject(LoadingService)

  loading = this.#loadingService.loading
  collections = signal<GetCollectionsResponse[]>([])
  detailsSideOpened$ = this.#layoutService.detailsPanelOpened$

  sidenavOpened = signal<boolean>(true)

  ngOnInit(): void {
    this.#bookmarkService.getCollections().subscribe({
      next: res => {
        this.collections.set(res.items)
      }
    })
  }

  navItems: {name: string, url: string, icon: string}[] = [
    {name: 'Dashboard', url: '/app/bookmark/dashboard', icon: 'dashboard'},
    {name: 'All Bookmarks', url: '/app/bookmark/list', icon: 'filter_list'},
  ]

  isRouteActive(url: string): boolean {
    return this.#router.url === url
  }

  toggleSidebar() {
    this.sidenavOpened.set(!this.sidenavOpened())
  }

  toggleTheme(){
    this.#themeService.toggleDarkMode()
  }

  openDetails(page: string) {
    this.#router.navigate(['app', 'bookmark', {outlets: { details: page}}])
    this.#layoutService.openDetailsPanel()
  }

  deleteTag(event: MouseEvent, id: string) {
    event.stopImmediatePropagation()
  }

  deleteCollection(event: MouseEvent, id: string) {
    event.stopImmediatePropagation()
  }
}
