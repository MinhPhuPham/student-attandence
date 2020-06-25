import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListStudentsHisPage } from './list-students-his.page';

describe('ListStudentsHisPage', () => {
  let component: ListStudentsHisPage;
  let fixture: ComponentFixture<ListStudentsHisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListStudentsHisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListStudentsHisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
