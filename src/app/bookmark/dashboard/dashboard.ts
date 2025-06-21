import {Component, inject, signal} from '@angular/core';
import {MatIconButton} from "@angular/material/button";
import {BookmarkService, IBookmark, IGetResponse} from "../bookmark.service";
import {MatCard, MatCardActions, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";


@Component({
  templateUrl: './dashboard.html',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardActions,
    MatCardSubtitle,
    MatIconButton,
    MatIcon,
  ],
})
export class Dashboard {


  #bookmarkService = inject(BookmarkService)
  bookmarks = signal<IBookmark[]>([])
  totalBookmarks = signal<number>(0)
  totalCollections = signal<number>(0)
  totalTags = signal<number>(0)

  ngOnInit() {
    this.#bookmarkService.getBookmarks().subscribe({
      next: res => {
        this.bookmarks.set(res.items)
        this.totalBookmarks.set(res.totalItems)
      },
      error: err => {
        console.log(err)
      }
    })
    
    this.#bookmarkService.getCollections().subscribe({
      next: res => {
        this.totalCollections.set(res.totalItems)
      }
    })

    this.#bookmarkService.getTags().subscribe({
      next: res => {
        this.totalTags.set(res.totalItems)
      }
    })
  }

}
