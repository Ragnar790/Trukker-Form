import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  constructor(private fb: FormBuilder, public http: HttpClient) {}
  itemsList = [];
  sourceList = [];
  ngOnInit(): void {
    fetch('https://trukkerform-default-rtdb.firebaseio.com/Items.json')
      .then((res) => res.json())
      .then((res) => (this.itemsList = res));
    fetch('https://trukkerform-default-rtdb.firebaseio.com/Sources.json')
      .then((res) => res.json())
      .then((res) => (this.sourceList = res));
  }
  sourceDropdown: string = 'Select Source';
  categoryDropdown: string = 'Select Category';
  itemsAdded = [];
  // MIN DATE AND MAX DATE
  minDate = new Date();
  maxDate = '2023-12-31';
  //CALCULATE TOTAL PRICE
  calculateTotal() {
    let sum = 0;
    this.itemsAdded.forEach((item) => {
      sum += item.itemPrice;
    });
    // console.log('sum', sum);

    return sum;
  }
  get total() {
    return this.calculateTotal() + this.packingChargeHandler();
  }

  // CALCULATE VAT
  calculateVAT() {
    // let total = this.calculateTotal();
    let total = this.total;
    let vat = 0.05 * total;
    return vat;
  }
  get vat() {
    return this.calculateVAT();
  }
  // FINAL  QUOTE
  calculateFinalQuote() {
    return (
      this.calculateTotal() + this.calculateVAT() + this.packingChargeHandler()
    );
  }
  // PACKING CHARGE
  packingChargeHandler() {
    if (
      (document.querySelector('.packingCheckbox') as HTMLInputElement).checked
    ) {
      let total = this.calculateTotal();
      return 0.02 * total;
    } else {
      return 0;
    }
    // console.log(
    //   'p',
    //   (document.querySelector('.packingCheckbox') as HTMLInputElement).checked
    // );
  }
  get packingCharge() {
    return this.packingChargeHandler();
  }
  get finalQuote() {
    return this.calculateFinalQuote();
  }
  dateKeydownHandler() {
    return false;
  }
  // maxDate = new Date(this.minDate.setFullYear(this.minDate.getFullYear() + 3));
  profileForm = this.fb.group({
    source: ['', Validators.required],
    pickup: ['', [Validators.required, Validators.minLength(3)]],
    dropoff: ['', [Validators.required, Validators.minLength(3)]],
    name: [
      '',
      [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]{2,}')],
    ],
    mobile: ['', [Validators.pattern('[0-9 ]{10}'), Validators.required]],
    date: ['', Validators.required],
    category: ['', Validators.required],
    // items: this.fb.array([]),
    items: [[]],
    pickupTime: [''],
    dropoffTime: [''],
    pickupContactName: [
      '',
      [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]{2,}')],
    ],
    pickupMobile: ['', [Validators.pattern('[0-9 ]{10}'), Validators.required]],
    pickupAddress: ['', [Validators.required, Validators.minLength(3)]],
    deliveryContactName: [
      '',
      [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]{2,}')],
    ],
    deliveryMobile: [
      '',
      [Validators.pattern('[0-9 ]{10}'), Validators.required],
    ],
    dropoffAddress: ['', [Validators.required, Validators.minLength(3)]],
    itemDescription: [''],
    userEmail: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}'),
      ],
    ],
    specificTime: ['', [Validators.pattern('[00-23]+-[0-59]{2,2}')]],
  });
  get specificTime() {
    return this.profileForm.get('specificTime') as FormArray;
  }

  get items() {
    return this.profileForm.get('items') as FormArray;
  }
  get userEmail() {
    return this.profileForm.get('userEmail') as FormArray;
  }
  get dropoffAddress() {
    return this.profileForm.get('dropoffAddress') as FormArray;
  }
  get deliveryMobile() {
    return this.profileForm.get('deliveryMobile') as FormArray;
  }
  get deliveryContactName() {
    return this.profileForm.get('deliveryContactName') as FormArray;
  }
  get pickupMobile() {
    return this.profileForm.get('pickupMobile') as FormArray;
  }
  get pickupAddress() {
    return this.profileForm.get('pickupAddress') as FormArray;
  }
  get pickupContactName() {
    return this.profileForm.get('pickupContactName') as FormArray;
  }
  get pickupTime() {
    return this.profileForm.get('pickupTime') as FormArray;
  }
  get dropoffTime() {
    return this.profileForm.get('pickupTime') as FormArray;
  }

  get name() {
    return this.profileForm.get('name');
  }
  get source() {
    return this.profileForm.get('source');
  }
  get date() {
    return this.profileForm.get('date');
  }
  get category() {
    return this.profileForm.get('category');
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
    this.profileForm.patchValue({
      mobile: `+91${this.profileForm.get('mobile').value}`,
      deliveryMobile: `+91${this.profileForm.get('deliveryMobile').value}`,
      pickupMobile: `+91${this.profileForm.get('pickupMobile').value}`,
      date: new Date(this.profileForm.get('date').value).toISOString(),
    });
    // this.http
    //   .post(
    //     'https://trukkerform-default-rtdb.firebaseio.com/DeliveryDetails.json',
    //     this.profileForm.value
    //   )
    //   .subscribe((response) => {
    //     console.log('repsonse ', response);
    //   });
    if (
      (document.querySelector('.specificTimeToggler') as HTMLInputElement)
        .checked
    ) {
      this.profileForm.get('pickupTime').setValue('NA');
      this.profileForm.get('dropoffTime').setValue('NA');
    } else {
      this.profileForm.get('specificTime').setValue('NA');
    }
    console.log('profile', this.profileForm.value);
  }

  async addSubcategory() {
    // if (this.profileForm.get(['category']).value === 'Air Conditioners')
    //   this.items.push(this.fb.control(''));
    // else this.items.removeAt(0);
    // else {
    // console.log('cat', this.profileForm.get(['category']).value);

    await this.itemsAdded.push(
      this.itemsList[this.profileForm.get(['category']).value]
    );
    this.profileForm
      .get(['items'])
      .value.push(this.itemsList[this.profileForm.get(['category']).value]);
    document.querySelector('.selectCategory').classList.add('hide');
    // this.items.push(this.fb.control(''));
    this.showCart();
    this.calculateTotal();
    // }
  }
  showCart() {
    // console.log('items', this.profileForm.get(['items']).value);

    // console.log('added', this.itemsAdded);
    if (this.itemsAdded.length > 0) {
      document.querySelector('.card').classList.remove('hide');
    } else {
      document.querySelector('.card').classList.add('hide');
      document.querySelector('.selectCategory').classList.remove('hide');
    }
  }
  toggleCategoryVisibility() {
    if (document.querySelector('.selectCategory2').classList.contains('hide')) {
      // console.log('sdjhkhdkjhd');
      document.querySelector('.selectCategory2').classList.remove('hide');
    }
    // else console.log('asdd');
  }
  addSubcategory2() {
    // console.log('add hide');

    document.querySelector('.selectCategory2').classList.add('hide');
    this.addSubcategory();
  }
  proceedBtnHandler() {
    document.querySelector('.postProceed').classList.remove('hide');
  }

  isSelected: string = '';

  specificPickupTimeToggler() {
    if (
      (document.querySelector('.specificTimeToggler') as HTMLInputElement)
        .checked
    ) {
      document.querySelector('.specificTimeBox').classList.remove('hide');
      document.querySelector('.specificTimeInputs').classList.add('hide');
    } else {
      // this.specificTime.untouched;
      // this.specificTime.dirty = false;
      document.querySelector('.specificTimeInputs').classList.remove('hide');
      document.querySelector('.specificTimeBox').classList.add('hide');
    }
  }
  deleteBtnHandler(i) {
    // console.log('delete', i);
    this.itemsAdded.splice(i, 1);
    this.profileForm.get(['items']).value.splice(i, 1);
    this.showCart();
    console.log(this.profileForm.get(['items']).value);
  }
}
