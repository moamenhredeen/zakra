import { Component, inject } from '@angular/core';
import { LayoutService } from '../../layout/layout.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.html',
  styleUrl: './create-collection.scss',
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButton,
    MatIconButton,
    MatIcon
  ],
})
export class CreateCollection {
  #layoutService = inject(LayoutService)
  
  closeDetailsPanel(){
    this.#layoutService.closeDetailsPanel()
  }
}
