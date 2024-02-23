import { Component } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'imageCompress';
  compressedImageResult!: string | ArrayBuffer;
  constructor(private imageCompress: NgxImageCompressService) {}

    imgResultBeforeCompression: string = '';
    imgResultAfterCompression: string = '';

    compressFile() {
        this.imageCompress.uploadFile().then(({image, orientation}) => {
            this.imgResultBeforeCompression = image;
            console.log('Size in bytes of the uploaded image was:', this.imageCompress.byteCount(image));

            this.imageCompress
                .compressFile(image, orientation, 50, 50) // 50% ratio, 50% quality
                .then(compressedImage => {
                    this.imgResultAfterCompression = compressedImage;
                    this.compressedImageResult = compressedImage;
                    console.log('Size in bytes after compression is now:', this.imageCompress.byteCount(compressedImage));
                });
        });
    }
    downloadCompressedImage(): void {
      const link = document.createElement('a');
      link.href = this.compressedImageResult as string;
      link.download = 'compressed_image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
