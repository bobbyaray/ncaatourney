import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakepicksComponent } from './makepicks.component';

describe('MakepicksComponent', () => {
  let component: MakepicksComponent;
  let fixture: ComponentFixture<MakepicksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakepicksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakepicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
