import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-proceed-form',
  templateUrl: './post-proceed-form.component.html',
  styleUrls: ['./post-proceed-form.component.css'],
})
export class PostProceedFormComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  isSelected: string = '';

  specificPickupTimeToggler() {
    console.log('handler');

    if (
      (document.querySelector('.specificTimeToggler') as HTMLInputElement)
        .checked
    ) {
      console.log('show');

      document.querySelector('.specificTimeBox').classList.remove('hide');
    } else {
      console.log('hide');

      document.querySelector('.specificTimeBox').classList.add('hide');
    }
  }
}
