import { Component, inject, OnInit } from '@angular/core';
import { BookmarkService } from '../bookmark.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { GetBookmarksResponse } from '@zakra/api-spec';



@Component({
  templateUrl: './list.html',
  styleUrl: './list.scss',
  imports: [
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIcon,
  ],
})
export class List implements OnInit {

  #bookmarkService = inject(BookmarkService)

  displayedColumns: string[] = ['select', 'title', 'description', 'url', 'collection', 'tags'];
  dataSource = new MatTableDataSource<GetBookmarksResponse>([]) ;
  selection = new  SelectionModel<GetBookmarksResponse>(true, []);



  ngOnInit(): void {
    this.loadData()
  }
  
  loadData(){
    this.#bookmarkService.getBookmarks().subscribe({
      next: res => {
        this.dataSource.data = res.items  
      }
    })
  }
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: GetBookmarksResponse): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  } 

}
