import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstadoCocherasComponent } from './estado-cocheras.component';

describe('EstadoCocheraComponent', () => {
  let component: EstadoCocherasComponent;
  let fixture: ComponentFixture<EstadoCocherasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstadoCocherasComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoCocherasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
