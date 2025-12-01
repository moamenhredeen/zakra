import { Component, input } from '@angular/core';

@Component({
  templateUrl: './tag.html',
})
export class Tag  {

  id = input.required<string>()
}
