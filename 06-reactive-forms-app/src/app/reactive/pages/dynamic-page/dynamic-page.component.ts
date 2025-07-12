import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  Form,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
  styleUrl: './dynamic-page.component.css',
})
export class DynamicPageComponent {
  private formBuilder = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.formBuilder.array(
      [
        ['Metal Gear', Validators.required],
        ['The Witcher', Validators.required],
        ['Dark Souls', Validators.required],
      ],
      [Validators.minLength(3)]
    ),
  });

  newFavorite = this.formBuilder.control('', Validators.required);

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddFavorite() {
    if (this.newFavorite.invalid) {
      this.newFavorite.markAsTouched();
      return;
    }

    this.favoriteGames.push(
      this.formBuilder.control(this.newFavorite.value, Validators.required)
    );
    this.newFavorite.reset();
  }

  onRemoveFavorite(index: number) {
    this.favoriteGames.removeAt(index);
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log('Form submitted:', this.myForm.value);
    this.myForm.reset();
    this.favoriteGames.clear();
  }
}
