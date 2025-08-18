import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedCompanyComponent } from './featured-company.component';

describe('FeaturedCompanyComponent', () => {
  let component: FeaturedCompanyComponent;
  let fixture: ComponentFixture<FeaturedCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeaturedCompanyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeaturedCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
