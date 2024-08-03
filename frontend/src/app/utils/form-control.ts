import { FormGroup } from '@angular/forms';
import { ClientError } from '../client/client-error';

export function mapClientErrorToFormGroupControls(group: FormGroup) {
  return (error: ClientError) => {
    if (error.errors) {
      for (const [key, value] of Object.entries(error.errors)) {
        const control = group.get(key);
        if (control) {
          control.setErrors({ serverError: value });
        }
      }
    }
  };
}
