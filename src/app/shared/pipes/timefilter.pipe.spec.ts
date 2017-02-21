import { TimeFilterPipe } from './timefilter.pipe';

describe('TimeFilterPipe', () => {
  let pipe = new TimeFilterPipe();

  it('removes minutes when they equal to zero', () => {
    let date = new Date();
    date.setMinutes(0);
    date.setHours(15);
    expect(pipe.transform(date)).toBe('3PM');
  });

  it('doesn\'t remove minutes when they equal to zero', () => {
    let date = new Date();
    date.setMinutes(35);
    date.setHours(15);
    expect(pipe.transform(date)).toBe('3:35PM');
  });

  it('removes zone format if set explicity', () => {
    let date = new Date();
    date.setMinutes(35);
    date.setHours(15);
    expect(pipe.transform(date, false)).toBe('3:35');
  });

});
