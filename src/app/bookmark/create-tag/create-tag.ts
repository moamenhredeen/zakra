import {Component, inject} from '@angular/core';
import {LayoutService} from '../../layout/layout.service';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-create-tag',
  imports: [
    MatIcon,
    MatFormField,
    MatLabel,
    MatInput,
    MatLabel,
    MatFormField,
    MatButton,
    MatIconButton
  ],
  templateUrl: './create-tag.html',
  styleUrl: './create-tag.scss'
})
export class CreateTag {
  #layoutService = inject(LayoutService)

  closeDetailsPanel(){
    this.#layoutService.closeDetailsPanel()
  }
}
