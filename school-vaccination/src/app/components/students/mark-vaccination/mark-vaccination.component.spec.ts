import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkVaccinationComponent } from './mark-vaccination.component';

describe('MarkVaccinationComponent', () => {
  let component: MarkVaccinationComponent;
  let fixture: ComponentFixture<MarkVaccinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkVaccinationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkVaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
