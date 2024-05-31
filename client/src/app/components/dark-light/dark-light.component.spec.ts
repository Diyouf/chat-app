import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkLightComponent } from './dark-light.component';

describe('DarkLightComponent', () => {
  let component: DarkLightComponent;
  let fixture: ComponentFixture<DarkLightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DarkLightComponent]
    });
    fixture = TestBed.createComponent(DarkLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
