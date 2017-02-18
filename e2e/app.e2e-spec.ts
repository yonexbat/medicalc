import { MediappPage } from './app.po';

describe('mediapp App', function() {
  let page: MediappPage;

  beforeEach(() => {
    page = new MediappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
