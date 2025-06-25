import { Component,  inject, input } from '@angular/core';
import { BookmarkService, IBookmark, ICollection, IGetResponse } from '../bookmark.service';
import { MatCard, MatCardTitle, MatCardHeader, MatCardActions, MatCardSubtitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { httpResource, HttpResourceRef } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { TitleCasePipe } from '@angular/common';

@Component({
  templateUrl: './tag.html',
  imports: [
    MatCard,
    MatCardActions,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatIcon,
    TitleCasePipe
  ],
})
export class Tag  {
  
  #bookmarkService = inject(BookmarkService)

  id = input.required<string>()

  collection!: HttpResourceRef<ICollection | undefined>
  bookmarks!: HttpResourceRef<IGetResponse<IBookmark[]> | undefined>

  constructor() {
    this.collection = httpResource<ICollection>(() => `${environment.apiUrl}/collections/tags/records/${this.id()}`,)
    this.bookmarks = httpResource<IGetResponse<IBookmark[]>>(() => `${environment.apiUrl}/collections/bookmarks/records?filter=(tags~'${this.id()}')&expand=tags`,)
  }
}
