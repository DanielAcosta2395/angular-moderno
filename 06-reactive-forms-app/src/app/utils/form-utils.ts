import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';

export class FormUtils {
  static getTextError(errors: ValidationErrors): string | null {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required';
        case 'minlength':
          return `Minimum length is ${errors['minlength'].requiredLength}`;
        case 'min':
          return `Minimum value is ${errors['min'].min}`;
        default:
          return `Unknown error: ${key}`;
      }
    }

    return null;
  }

  static isValidField(form: FormGroup, field: string): boolean | null {
    return !!form.controls[field].errors && form.controls[field].touched;
  }

  static getFieldError(form: FormGroup, field: string): string | null {
    const errors = form.controls[field].errors;
    if (!errors) return null;
    return this.getTextError(errors);
  }

  static isValidFieldInArray(
    formArray: FormArray,
    index: number
  ): boolean | null {
    return !!formArray.at(index).errors && formArray.at(index).touched;
  }

  static getFieldErrorInArray(
    formArray: FormArray,
    index: number
  ): string | null {
    if (formArray.controls.length === 0) return null;

    const errors = formArray.controls[index].errors ?? {};

    return this.getTextError(errors);
  }
}
