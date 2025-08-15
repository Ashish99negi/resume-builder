import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ResumeService } from '../../../../core/services/resume/resume.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './personal-info.component.html',
})
export class PersonalInfoComponent implements OnInit, OnDestroy {
  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
    pincode: ['', [Validators.required, Validators.pattern('^[0-9]{4,10}$')]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{7,15}$')]],
    email: ['', [Validators.required, Validators.email]],
  });
  
  private saveSubscription!: Subscription;

  constructor(private fb: FormBuilder, private resumeService: ResumeService) {}

  ngOnInit() {
    this.resumeService.resumeData$.subscribe((resumeData) => {
      if (resumeData?.personalInfo) {
        this.form.patchValue(resumeData.personalInfo);
      }
    });

    this.saveSubscription = this.resumeService.save$.subscribe(() => {
      this.resumeService.updateSection('personalInfo', this.form.value);
    });
  }
  
  ngOnDestroy() {
    this.saveSubscription.unsubscribe();
  }
}