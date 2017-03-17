import { DateFilterPipe } from './datefilter.pipe';

describe('DateFilterPipe', () => {
  let pipe = new DateFilterPipe();

  it('transforms today date to "Today"', () => {
    let today = new Date();
    expect(pipe.transform(today)).toBe('Today');
  });

  it('transforms tomorrow date to "Tomorrow"', () => {
    let today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    expect(pipe.transform(tomorrow)).toBe('Tomorrow');
  });

  it('transforms date which is not today or tomorrow to EEE, MMM dd', () => {
    let date = new Date();
    date.setMonth(0);
    date.setDate(31);
    date.setYear(1990);
    expect(pipe.transform(date)).toBe('Wed, Jan 31');
  });

  it('transforms date which is not todat or tomorrow to "EEE, MMM" if regexp provided', () => {
    let date = new Date();
    date.setMonth(0);
    date.setDate(31);
    date.setYear(1990);
    expect(pipe.transform(date, "EEE, MMM")).toBe('Wed, Jan');
  });
});
