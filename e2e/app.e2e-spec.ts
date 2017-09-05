import { SsAng4Page } from './app.po';

describe('ss-ang4 App', () => {
  let page: SsAng4Page;

  beforeEach(() => {
    page = new SsAng4Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
