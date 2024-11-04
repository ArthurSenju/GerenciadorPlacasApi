import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirComponent } from './inserir.component';

describe('InserirComponent', () => {
  let component: InserirComponent;
  let fixture: ComponentFixture<InserirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InserirComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InserirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
