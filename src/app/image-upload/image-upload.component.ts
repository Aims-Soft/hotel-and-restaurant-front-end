import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css',
})
export class ImageUploadComponent implements OnInit {
  @Input() imageUrl: any;
  @Input() fileName: any;
  @Input() pdfName: any;
  @Output() fileNameChange = new EventEmitter<string>(); // ✅ Added
  @Output() pdfNameChange = new EventEmitter<string>();

  image: any = '';
  imageExt: any;

  
  pdf: any = '';
  pdfExt: any;
  

  constructor() {}

  ngOnInit(): void {}

  // uploadFile(event: any, type: string) {
  //   if (type == 'images') {
  //     const target: DataTransfer = <DataTransfer>event.target;

  //     if (event.target.files[0].type == 'image/png') {
  //       this.imageExt = 'png';
  //       const imageFileName = target.files[0];

  //       this.fileName = imageFileName.name;
  //       this.fileNameChange.emit(this.fileName); // ✅ send name to parent

  //       let reader = new FileReader();
  //       let file = event.target.files[0];
  //       reader.onloadend = (e: any) => {
  //         this.image = reader.result;
  //         var splitImg = this.image.split(',')[1];
  //         this.image = splitImg;
  //       };

  //       if (event.target.files && event.target.files[0]) {
  //         reader.readAsDataURL(file);
  //         reader.onload = () => {
  //           $('#imagePreview').css(
  //             'background-image',
  //             'url(' + reader.result + ')'
  //           );
  //           $('#imagePreview').hide();
  //           $('#imagePreview').fadeIn(650);
  //         };
  //       }
  //     } else {
  //       alert('Only Png Image Allowed');
  //     }
  //   }
  //   else if(type == 'pdf'){
  //     const target: DataTransfer = <DataTransfer>event.target;

  //     if (event.target.files[0].type == 'application/pdf') {
  //       this.imageExt = 'pdf';
  //       const imageFileName = target.files[0];

  //       this.fileName = imageFileName.name;
  //       this.fileNameChange.emit(this.fileName);

  //       let reader = new FileReader();
  //       let file = event.target.files[0];
  //       reader.onloadend = (e: any) => {
  //         this.image = reader.result;
  //         var splitImg = this.image.split(',')[1];
  //         this.image = splitImg;
  //       };

  //       if (event.target.files && event.target.files[0]) {
  //         reader.readAsDataURL(file);
  //         reader.onload = () => {
  //           $('#imagePreview').css(
  //             'background-image',
  //             'url(' + reader.result + ')'
  //           );
  //           $('#imagePreview').hide();
  //           $('#imagePreview').fadeIn(650);
  //         };
  //       }
  //     } else {
  //       alert('Only Pdf is Allowed');
  //     }
  //   }
  // }
  uploadFile(event: any, type: string) {
    const target: DataTransfer = <DataTransfer>event.target;
    const file = event.target.files[0];

    if (type === 'images') {
      if (file.type !== 'image/png') {
        alert('Only PNG Image Allowed');
        return;
      }
      this.imageExt = 'png';
        this.fileName = file.name;
    this.fileNameChange.emit(this.fileName); // ✅ update parent

       let reader = new FileReader();
    reader.onload = (e: any) => {
      this.image = e.target.result;
    };
    reader.readAsDataURL(file);
    }

    if (type === 'pdf') {
      if (file.type !== 'application/pdf') {
        alert('Only PDF Allowed');
        return;
      }
      this.imageExt = 'pdf';

        this.pdfName = file.name;
    this.pdfNameChange.emit(this.pdfName); // ✅ update parent

    
    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.pdf = e.target.result;
    };
    reader.readAsDataURL(file);
    }

  }
}
