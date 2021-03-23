import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
  profileForm = this.fb.group({
    source: [''],
    pickup: ['', [Validators.required, Validators.minLength(3)]],
    dropoff: ['', [Validators.required, Validators.minLength(3)]],
    name: ['', [Validators.required, Validators.minLength(3)]],
    mobile: ['', [Validators.required, Validators.minLength(10)]],
    date: [''],
    category: [''],
    items: this.fb.array([]),
  });

  get items() {
    return this.profileForm.get('items') as FormArray;
  }
  get name() {
    return this.profileForm.get('name');
  }
  get pickup() {
    return this.profileForm.get('pickup');
  }
  get dropoff() {
    return this.profileForm.get('dropoff');
  }
  get mobile() {
    return this.profileForm.get('mobile');
  }
  onsubmit() {
    console.log(this.profileForm.value);
  }
  addSubcategory() {
    if (this.profileForm.get(['category']).value === 'Air Conditioners')
      this.items.push(this.fb.control(''));
    else this.items.removeAt(0);
  }
}
