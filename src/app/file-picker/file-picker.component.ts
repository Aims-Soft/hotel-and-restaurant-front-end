
import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { environment } from '../../environmentts/environment';
import { FileUtilService } from '../Services/File/file-util.service';

@Component({
  selector: 'app-file-picker',
  templateUrl: './file-picker.component.html'
})
export class FilePickerComponent {
  @Input() acceptTypes: string = 'image/*,.pdf';
  @Input() eDocPath: string = 'C:/inetpub/wwwroot/jobPortal/jobPortal-app/assets/Job-images/';
  @Output() fileSelected = new EventEmitter<any>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  baseEdocPath : string = environment.imageUrl;
  constructor(private fileUtil: FileUtilService) {}

  triggerSelect() {
    this.fileInput.nativeElement.click();
  }

  async onFileChange(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    const base64 = await this.fileUtil.fileToBase64(file);
    const ext = this.fileUtil.getFileExtension(file);

    this.fileSelected.emit({
      eDoc: base64,
      eDocExt: ext,
      eDocPath: this.baseEdocPath,
      fileName: file.name
    });
  }
}