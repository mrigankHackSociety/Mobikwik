import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSavedCardComponent } from './manage-saved-card.component';

describe('ManageSavedCardComponent', () => {
  let component: ManageSavedCardComponent;
  let fixture: ComponentFixture<ManageSavedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSavedCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSavedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
