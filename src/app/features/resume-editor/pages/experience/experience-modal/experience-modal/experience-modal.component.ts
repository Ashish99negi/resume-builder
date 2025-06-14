import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { QuillModule } from 'ngx-quill';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, QuillModule],
  templateUrl: './experience-modal.component.html'
})
export class ExperienceModalComponent {
  form: FormGroup;
  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean']
    ]
  };

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ExperienceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      jobTitle: ['', Validators.required],
      employer: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      currentlyWorking: [false],
      description: ['']
    });

    this.form.get('currentlyWorking')?.valueChanges.subscribe(val => {
      if (val) {
        this.form.get('endDate')?.disable();
      } else {
        this.form.get('endDate')?.enable();
      }
    });
  }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
      
    } else {
      this.form.markAllAsTouched();
    }
  }

  close() {
    this.dialogRef.close();
  }
}
