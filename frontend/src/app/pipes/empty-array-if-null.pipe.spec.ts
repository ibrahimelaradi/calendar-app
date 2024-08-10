import { EmptyArrayIfNullPipe } from './empty-array-if-null.pipe';

describe('EmptyArrayIfNullPipe', () => {
  it('create an instance', () => {
    const pipe = new EmptyArrayIfNullPipe();
    expect(pipe).toBeTruthy();
  });
});
