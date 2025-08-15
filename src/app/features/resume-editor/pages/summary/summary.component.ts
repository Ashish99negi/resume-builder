import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { ResumeService } from '../../../../core/services/resume/resume.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuillModule,
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent implements OnInit, OnDestroy {
  form: FormGroup;
  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['clean'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }]
    ]
  };

  private saveSubscription!: Subscription;

  constructor(private fb: FormBuilder, private resumeService: ResumeService) {
    this.form = this.fb.group({
      summary: ['']
    });
  }

  ngOnInit() {
     this.saveSubscription = this.resumeService.resumeData$.subscribe((resumeData) => {
      if (resumeData?.summary) {
        this.form.patchValue(resumeData.summary);
      }
    });
    this.saveSubscription = this.resumeService.save$.subscribe(() => {
      this.resumeService.updateSection('summary', this.form.value);
    });
  }

  ngOnDestroy() {
    this.saveSubscription.unsubscribe();
  }

  get summaryControl(): FormControl {
    return this.form.get('summary') as FormControl;
  }
}