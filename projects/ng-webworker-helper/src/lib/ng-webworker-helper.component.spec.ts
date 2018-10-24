import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgWebworkerHelperComponent } from './ng-webworker-helper.component';

describe('NgWebworkerHelperComponent', () => {
  let component: NgWebworkerHelperComponent;
  let fixture: ComponentFixture<NgWebworkerHelperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgWebworkerHelperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgWebworkerHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
