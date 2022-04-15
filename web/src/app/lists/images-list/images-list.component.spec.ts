import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AddImageComponent } from 'src/app/forms/add-image/add-image.component';
import { EditImageComponent } from 'src/app/forms/edit-image/edit-image.component';
import { ApiService } from 'src/app/services/api.service';
import { MockApiService, MOCK_IMAGES } from 'src/app/services/api.service.mock';
import { TablifyModule } from '../tablify/tablify.module';
import { ImagesListComponent } from './images-list.component';


describe('ImagesListComponent', () => {
  let component: ImagesListComponent;
  let fixture: ComponentFixture<ImagesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useValue: new MockApiService() },
      ],
      imports: [
        HttpClientModule,
        MatSnackBarModule,
        MatDialogModule,
        TablifyModule,
        NoopAnimationsModule,
      ],
      declarations: [
        ImagesListComponent,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('editImage() should call openEditImageDialog()', () => {
    const i1 = MOCK_IMAGES[0]
    spyOn(component, 'openEditImageDialog')
    component.editImage(i1)
    expect(component.openEditImageDialog).toHaveBeenCalledWith(i1)
  });

  it('addImage() should call openAddImageDialog()', () => {
    spyOn(component, 'openAddImageDialog')
    component.addImage()
    expect(component.openAddImageDialog).toHaveBeenCalled()
  });

  it('openEditImageDialog() should open the dialog and load the datasource on close', () => {
    // TODO: test that dialog.afterAllClosed is set up
    const data = MOCK_IMAGES[0]
    spyOn(component.dialog, 'open')
    component.openEditImageDialog(data)
    expect(component.dialog.open).toHaveBeenCalledWith(EditImageComponent, {width: '80%', data})
  })

  it('openAddImageDialog() should open the dialog and load the datasource on close', () => {
    // TODO: test that dialog.afterAllClosed is set up
    spyOn(component.dialog, 'open')
    component.openAddImageDialog()
    expect(component.dialog.open).toHaveBeenCalledWith(AddImageComponent, {width: '80%'})
  })

  it('syncWithFilesystem() should call apiService.syncImages and datasource.load', () => {
    spyOn(component['apiService'], 'syncImages').and.callThrough()
    spyOn(component.dataSource, 'load')
    component.syncWithFilesystem()
    expect(component['apiService'].syncImages).toHaveBeenCalled()
    expect(component.dataSource.load).toHaveBeenCalled()
  })
});
