import { ProjectsStorePage } from './app.po';

describe('projects-store App', () => {
  let page: ProjectsStorePage;

  beforeEach(() => {
    page = new ProjectsStorePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
