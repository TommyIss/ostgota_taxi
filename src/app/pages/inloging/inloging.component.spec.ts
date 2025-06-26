import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlogingComponent } from './inloging.component';

describe('InlogingComponent', () => {
  let component: InlogingComponent;
  let fixture: ComponentFixture<InlogingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlogingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InlogingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
