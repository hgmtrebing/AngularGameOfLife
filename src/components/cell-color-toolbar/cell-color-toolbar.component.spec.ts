import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellColorToolbarComponent } from './cell-color-toolbar.component';

describe('CellColorToolbarComponent', () => {
  let component: CellColorToolbarComponent;
  let fixture: ComponentFixture<CellColorToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CellColorToolbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CellColorToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
