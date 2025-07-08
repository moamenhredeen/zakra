import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
import {Observable} from 'rxjs';
import { CreateBookmarkRequest, CreateBookmarkResponse, CreateCollectionRequest, CreateCollectionResponse, DeleteBookmarkResponse, DeleteCollectionResponse, GetBookmarksResponse, GetCollectionsResponse, PaginatedResponse, UpdateBookmarkRequest, UpdateBookmarkResponse } from '@zakra/api-spec';


@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  #http = inject(HttpClient)

  // ---------------------------- bookmarks ----------------------------

  getBookmarks(): Observable<PaginatedResponse<GetBookmarksResponse>> {
    return this.#http.get<PaginatedResponse<GetBookmarksResponse>>(`${environment.apiUrl}/bookmark`, {
    })
  }
  
  createBookmark(bookmark: CreateBookmarkRequest): Observable<CreateBookmarkResponse> {
    return this.#http.post<CreateBookmarkResponse>(`${environment.apiUrl}/bookmark`, bookmark)
  }
  
  updateBookmark(bookmark: UpdateBookmarkRequest): Observable<UpdateBookmarkResponse> {
    return this.#http.put<UpdateBookmarkResponse>(`${environment.apiUrl}/bookmark/${bookmark.id}`, bookmark)
  }
  
  deleteBookmark(id: number): Observable<DeleteBookmarkResponse> {
    return this.#http.delete<DeleteBookmarkResponse>(`${environment.apiUrl}/bookmark/${id}`)
  }
  
  
  // ---------------------------- collections ----------------------------

  getCollections(): Observable<PaginatedResponse<GetCollectionsResponse>> {
    return this.#http.get<PaginatedResponse<GetCollectionsResponse>>(`${environment.apiUrl}/bookmark/collections`)
  }
  
  createCollection(collection: CreateCollectionRequest): Observable<CreateCollectionResponse> {
    return this.#http.post<CreateCollectionResponse>(`${environment.apiUrl}/bookmark/collections`, collection)
  }
  
  deleteCollection(id: number): Observable<DeleteCollectionResponse> {
    return this.#http.delete<DeleteCollectionResponse>(`${environment.apiUrl}/bookmark/collections/${id}`)
  }
}

