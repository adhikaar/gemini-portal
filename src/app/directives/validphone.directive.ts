import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';


export function phoneValidator(control: FormControl) {
  let validphone = control.value;
  if (validphone) {
    let validphone_nospace = validphone.replace(/\s/g,"");

    let phone_regex = /(6|7|8|9)\d{9}/;
    let phone_lastten = validphone_nospace.slice(-10);
    if (phone_lastten.match(phone_regex) == null) {
      return { validphone: true }
    }
  }
  return null;
}


@Directive({
  selector: '[validphone]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useValue: phoneValidator,
      multi: true
    }
  ]
})
export class PhoneValidator {
}
