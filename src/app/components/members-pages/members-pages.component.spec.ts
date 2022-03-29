import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersPagesComponent } from './members-pages.component';

describe('MembersPagesComponent', () => {
  let component: MembersPagesComponent;
  let fixture: ComponentFixture<MembersPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
