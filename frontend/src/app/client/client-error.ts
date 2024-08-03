import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class ClientError extends Error {
  type: 'server' | 'network';
  status: number;
  errors?: Record<string, string[]>;
  private constructor(res: HttpErrorResponse) {
    super();
    this.name = 'ClientError';
    this.status = res.status;
    if (res.status === 0) {
      this.type = 'network';
      this.message = 'Network error!';
      return;
    }
    this.type = 'server';
    this.message = res.error?.message || 'Something went wrong!';
    this.errors = res.error?.errors;
  }

  static handleError(res: HttpErrorResponse) {
    return throwError(() => new ClientError(res));
  }
}
