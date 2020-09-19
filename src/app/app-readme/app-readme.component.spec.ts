import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppReadmeComponent } from './app-readme.component';

describe('AppReadmeComponent', () => {
  let component: AppReadmeComponent;
  let fixture: ComponentFixture<AppReadmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppReadmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppReadmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
