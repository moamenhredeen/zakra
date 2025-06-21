import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
import {Observable} from 'rxjs';

export type IBookmark = {
  id: string,
  title: string,
  description: string,
  url: string,
  user: string,
  expand?: {
    tags: ITag[],
    collection: ICollection
  }
  created: Date,
  updated: Date
}

export type ITag = {
  id: string
  name: string
}

export type ICollection = {
  id: string
  name: string
}

export type IGetResponse<T> = {
  page: number,
  perPage: number,
  totalPages: number,
  totalItems: number,
  items: T
}

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  #http = inject(HttpClient)

  getBookmarks(): Observable<IGetResponse<IBookmark[]>> {
    return this.#http.get<IGetResponse<IBookmark[]>>(`${environment.apiUrl}/collections/bookmarks/records?expand=collection,tags`, {
    })
  }
  
  getBookmarksByCollectionId(id: string): Observable<IGetResponse<IBookmark[]>> {
    return this.#http.get<IGetResponse<IBookmark[]>>(`${environment.apiUrl}/collections/bookmarks/records?filter=(collection='${id}')`)
  }
  
  getCollections(): Observable<IGetResponse<ICollection[]>> {
    return this.#http.get<IGetResponse<ICollection[]>>(`${environment.apiUrl}/collections/collections/records`)
  }
  
  getTags(): Observable<IGetResponse<ITag[]>> {
    return this.#http.get<IGetResponse<ITag[]>>(`${environment.apiUrl}/collections/tags/records`)
  }
  
  getCollectionById(id: string): Observable<ICollection> {
    return this.#http.get<ICollection>(`${environment.apiUrl}/collections/collections/records/${id}`)
  }
}

