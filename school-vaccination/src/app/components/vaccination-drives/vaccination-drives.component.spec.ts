import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationDrivesComponent } from './vaccination-drives.component';

describe('VaccinationDrivesComponent', () => {
  let component: VaccinationDrivesComponent;
  let fixture: ComponentFixture<VaccinationDrivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaccinationDrivesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaccinationDrivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
