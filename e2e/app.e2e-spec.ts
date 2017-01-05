import { RoomCardPage } from './app.po';

describe('room-card App', function() {
  let page: RoomCardPage;

  beforeEach(() => {
    page = new RoomCardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
