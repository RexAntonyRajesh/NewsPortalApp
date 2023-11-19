import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleAddEditComponent } from './article-add-edit.component';

describe('ArticleAddEditComponent', () => {
  let component: ArticleAddEditComponent;
  let fixture: ComponentFixture<ArticleAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
