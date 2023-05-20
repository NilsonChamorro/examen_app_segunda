import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { MessageComponentModule } from '../message/message.module';

import { ListThemesPage } from './list-themes.page';

describe('ListThemesPage', () => {
  let component: ListThemesPage;
  let fixture: ComponentFixture<ListThemesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListThemesPage],
      imports: [IonicModule.forRoot(), MessageComponentModule, RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ListThemesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
