import { Component, input,output } from '@angular/core';

@Component({
  selector: 'app-star-button',
  imports: [],
  templateUrl: './star-button.component.html',
  styleUrl: './star-button.component.css'
})
export class StarButtonComponent {

  disable=input.required<boolean>();
  selected=input.required<boolean>();
  clickEvent=output<Event>();

  Onclick(event:Event){
    this.clickEvent.emit(event);
  }
}
