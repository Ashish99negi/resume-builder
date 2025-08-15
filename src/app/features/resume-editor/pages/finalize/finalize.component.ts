import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeTemplateComponent } from '../resume-template/resume-template.component';
import { ResumeService } from '../../../../core/services/resume/resume.service';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finalize',
  standalone: true,
  imports: [CommonModule, ResumeTemplateComponent, MatButtonModule],
  templateUrl: './finalize.component.html',
  styleUrls: ['./finalize.component.css']
})
export class FinalizeComponent implements OnInit, OnDestroy, AfterViewInit {
  resumeData: any;
  pdfUrl: SafeResourceUrl | null = null;
  generatedPdf: jspdf | null = null;

  private resumeDataSubscription!: Subscription;
  private templateReadySubscription!: Subscription;
  private resumeTemplateElement: ElementRef | null = null;

  constructor(
    private resumeService: ResumeService,
    private sanitizer: DomSanitizer,
     private router: Router
  ) { }

  ngOnInit(): void {
    this.resumeDataSubscription = this.resumeService.resumeData$.subscribe(data => {
      this.resumeData = data;
      if (this.resumeTemplateElement) {
        this.generatePdfPreview();
      }
    });

    this.templateReadySubscription = this.resumeService.templateReady$.subscribe(element => {
      if (element) {
        this.resumeTemplateElement = element;
        if (this.resumeData) {
          this.generatePdfPreview();
        }
      }
    });
  }

  ngAfterViewInit(): void {
    // Fallback if everything is ready before view init
    if (this.resumeTemplateElement && this.resumeData) {
      this.generatePdfPreview();
    }
  }

  ngOnDestroy(): void {
    this.resumeDataSubscription.unsubscribe();
    this.templateReadySubscription.unsubscribe();
  }

  generatePdfPreview(): void {
    if (!this.resumeTemplateElement || !this.resumeTemplateElement.nativeElement) {
      console.log('Resume template element is not ready yet.');
      this.pdfUrl = null;
      return;
    }

    const data = this.resumeTemplateElement.nativeElement as HTMLElement;
    const scale = 3;
    const options = { scale, useCORS: true, logging: false };

    html2canvas(data, options).then((canvas: HTMLCanvasElement) => {
      const imgWidth = 210;
      const pageHeight = 297; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4');
      let position = 0;

      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      const overlap = 10;
      while (heightLeft > 0) {
        position = heightLeft - imgHeight + overlap;
        pdf.addPage();
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= (pageHeight - overlap);
      }

      this.generatedPdf = pdf;

      const blob = pdf.output('blob');
      const objectUrl = URL.createObjectURL(blob);
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
    }).catch(err => {
      console.error('PDF generation failed:', err);
      this.pdfUrl = null;
      this.generatedPdf = null;
    });
  }


  downloadPdf(): void {
    if (this.generatedPdf) {
      this.generatedPdf.save('resume.pdf');
    }
  }

   createAnother(): void {
     this.resumeService.resetResumeData();
    this.router.navigate(['/']);
  }

  goToPreviousPage() {
    this.router.navigate(['/']);
  }
}
