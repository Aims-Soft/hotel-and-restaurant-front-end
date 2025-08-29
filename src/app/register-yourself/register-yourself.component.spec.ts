import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterYourselfComponent } from './register-yourself.component';

describe('RegisterYourselfComponent', () => {
  let component: RegisterYourselfComponent;
  let fixture: ComponentFixture<RegisterYourselfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterYourselfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterYourselfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
