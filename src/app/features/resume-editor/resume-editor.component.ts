import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

import { PersonalInfoComponent } from './pages/personal-info/personal-info.component';
import { EducationComponent } from './pages/education/education.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { SkillsComponent } from './pages/skills/skills.component';


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
    SkillsComponent,],
  templateUrl: './resume-editor.component.html',
  styleUrls: ['./resume-editor.component.css'],
})
export class ResumeEditorComponent {}
