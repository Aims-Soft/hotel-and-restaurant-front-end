import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDiscriptionComponent } from './company-discription.component';

describe('CompanyDiscriptionComponent', () => {
  let component: CompanyDiscriptionComponent;
  let fixture: ComponentFixture<CompanyDiscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyDiscriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyDiscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
