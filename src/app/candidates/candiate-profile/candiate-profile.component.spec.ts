import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandiateProfileComponent } from './candiate-profile.component';

describe('CandiateProfileComponent', () => {
  let component: CandiateProfileComponent;
  let fixture: ComponentFixture<CandiateProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandiateProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CandiateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
