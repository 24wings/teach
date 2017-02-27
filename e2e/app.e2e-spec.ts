import { TechPage } from './app.po';

describe('tech App', () => {
  let page: TechPage;

  beforeEach(() => {
    page = new TechPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
