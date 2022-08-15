import { TransalationPipe } from './transalation.pipe';

describe('TransalationPipe', () => {
  it('create an instance', () => {
    const pipe = new TransalationPipe();
    expect(pipe).toBeTruthy();
  });
  it('should return corresponding translation if translation key found', () => {
    const pipe = new TransalationPipe();
    const expected = 'Enter First Name';
    let value = "FIRSTNAME_PLACEHOLDER";
    expect(pipe.transform(value)).toEqual(expected);
  });
  it('should return empty string if translation key not found', () => {
    const pipe = new TransalationPipe();
    const expected = '';
    let value = "FIRSTNAMESS_PLACEHOLDER";
    expect(pipe.transform(value)).toEqual(expected);
  });
});
