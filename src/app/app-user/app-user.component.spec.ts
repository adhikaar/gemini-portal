import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUser } from './app-dashboard.component';

describe('AppUser', () => {
  let component: AppUser;
  let fixture: ComponentFixture<AppUser>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppUser ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
