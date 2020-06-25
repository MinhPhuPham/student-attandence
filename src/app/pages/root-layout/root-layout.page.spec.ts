import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RootLayoutPage } from './root-layout.page';

describe('RootLayoutPage', () => {
  let component: RootLayoutPage;
  let fixture: ComponentFixture<RootLayoutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootLayoutPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RootLayoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
