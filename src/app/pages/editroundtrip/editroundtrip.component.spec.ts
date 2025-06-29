import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditroundtripComponent } from './editroundtrip.component';

describe('EditroundtripComponent', () => {
  let component: EditroundtripComponent;
  let fixture: ComponentFixture<EditroundtripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditroundtripComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditroundtripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
