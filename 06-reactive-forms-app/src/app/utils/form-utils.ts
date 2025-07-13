import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

async function sleep() {
  return new Promise((resolve) => setTimeout(resolve, 2500));
}

export class FormUtils {
  static namePattern = '^([a-zA-Z]+) ([a-zA-Z]+)$';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextError(errors: ValidationErrors): string | null {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required';
        case 'minlength':
          return `Minimum length is ${errors['minlength'].requiredLength}`;
        case 'min':
          return `Minimum value is ${errors['min'].min}`;
        case 'email':
          return 'Invalid email format';
        case 'emailTaken':
          return 'Email is already taken';
        case 'usernameTaken':
          return 'Username is already taken';
        case 'pattern':
          if (errors['pattern'].requiredPattern === this.namePattern) {
            return 'Field must contain Name and lastname';
          }
          if (errors['pattern'].requiredPattern === this.emailPattern) {
            return 'Valid email is required';
          }
          break;
        case 'fieldsNotEqual':
          return 'Fields must be equal';
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

  static isFieldOneAndTwoEqual(fieldOne: string, fieldTwo: string) {
    return (formGroup: AbstractControl) => {
      const fieldOneValue = formGroup.get(fieldOne)?.value;
      const fieldTwoValue = formGroup.get(fieldTwo)?.value;

      return fieldOneValue === fieldTwoValue
        ? null
        : {
            fieldsNotEqual: true,
          };
    };
  }

  static async checkingServerResponse(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    await sleep();
    const value = control.value;

    if (value === 'admin@hotmail.com') {
      return { emailTaken: true };
    }

    return null;
  }

  static checkingUsername(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (value === 'dany2342') {
      return { usernameTaken: true };
    }

    return null;
  }
}
