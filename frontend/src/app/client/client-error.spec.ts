import { ClientError } from './client-error';

describe('ClientError', () => {
  it('should create an instance', () => {
    expect(new ClientError()).toBeTruthy();
  });
});
