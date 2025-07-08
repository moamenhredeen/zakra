import { Component, inject, input } from '@angular/core';
import { BookmarkService } from '../bookmark.service';
import { MatCard, MatCardTitle, MatCardHeader, MatCardActions, MatCardSubtitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { httpResource, HttpResourceRef } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { TitleCasePipe } from '@angular/common';
import { GetBookmarksResponse, GetCollectionsResponse, PaginatedResponse } from '@zakra/api-spec';

@Component({
  templateUrl: './collection.html',
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
export class Collection  {
  
  #bookmarkService = inject(BookmarkService)

  id = input.required<string>()

  collection!: HttpResourceRef<GetCollectionsResponse | undefined>
  bookmarks!: HttpResourceRef<PaginatedResponse<GetBookmarksResponse> | undefined>

  constructor() {
    this.collection = httpResource<GetCollectionsResponse>(() => `${environment.apiUrl}/bookmark/collections/${this.id()}`,)
    this.bookmarks = httpResource<PaginatedResponse<GetBookmarksResponse>>(() => `${environment.apiUrl}/bookmark/collections/${this.id()}`,)
  }
}
