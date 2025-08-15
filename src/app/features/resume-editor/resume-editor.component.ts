import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

import { PersonalInfoComponent } from './pages/personal-info/personal-info.component';
import { EducationComponent } from './pages/education/education.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { ResumeService } from '../../core/services/resume/resume.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resume-editor',
  standalone: true,
  imports: [
    MatStepperModule,
    MatButtonModule,
    CommonModule,
    MatInputModule,
    PersonalInfoComponent,
    EducationComponent,
    ExperienceComponent,
    SkillsComponent,
    SummaryComponent,
    RouterModule 
  ],
  templateUrl: './resume-editor.component.html',
  styleUrls: ['./resume-editor.component.css'],
})
export class ResumeEditorComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') stepper!: MatStepper;
  
  private resumeDataSubscription!: Subscription;

  constructor(private router: Router, private resumeService: ResumeService) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  onContinue() {
    this.resumeService.saveData();
    if (this.stepper.selectedIndex === 4) {
      this.router.navigate(['/finalize']);
    } else {
      this.stepper.next();
    }
  }

  onBack() {
    this.stepper.previous();
  }
}