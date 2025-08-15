import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeService } from '../../../../core/services/resume/resume.service';
import { QuillViewHTMLComponent } from 'ngx-quill';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-resume-template',
  standalone: true,
  imports: [CommonModule, QuillViewHTMLComponent],
  templateUrl: './resume-template.component.html',
  styleUrls: ['./resume-template.component.css']
})
export class ResumeTemplateComponent implements OnInit, AfterViewInit {
  resumeData: any;

  @ViewChild('resumeContent', { read: ElementRef }) resumeContentElement!: ElementRef;

  constructor(private resumeService: ResumeService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.resumeService.resumeData$.subscribe(data => {
      this.resumeData = data;
    });
  }

  ngAfterViewInit(): void {
    if (this.resumeContentElement) {
      this.resumeService.setTemplateElement(this.resumeContentElement);
    }
  }
}
