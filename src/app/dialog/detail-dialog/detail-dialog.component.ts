import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MarkdownService} from '../../service/markdown.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail-dialog.component.html',
  styleUrls: ['./detail-dialog.component.css'],
  providers: [MarkdownService]
})
export class DetailDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private markService: MarkdownService,
    private sanitizer: DomSanitizer
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  convertText() {
    return this.markService.convert(this.data.detail.content);
  }

  close() {
    this.dialogRef.close();
  }
}
