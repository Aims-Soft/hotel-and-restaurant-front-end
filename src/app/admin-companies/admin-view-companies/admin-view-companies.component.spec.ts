import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewCompaniesComponent } from './admin-view-companies.component';

describe('AdminViewCompaniesComponent', () => {
  let component: AdminViewCompaniesComponent;
  let fixture: ComponentFixture<AdminViewCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminViewCompaniesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminViewCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
