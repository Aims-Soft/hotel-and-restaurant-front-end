import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyJobUserComponent } from './company-job-user.component';

describe('CompanyJobUserComponent', () => {
  let component: CompanyJobUserComponent;
  let fixture: ComponentFixture<CompanyJobUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyJobUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyJobUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
