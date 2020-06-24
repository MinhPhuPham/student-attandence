import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistoriesPage } from './histories.page';

describe('HistoriesPage', () => {
  let component: HistoriesPage;
  let fixture: ComponentFixture<HistoriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
