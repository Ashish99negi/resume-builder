import { Routes } from '@angular/router';
import { ResumeEditorComponent } from './resume-editor.component';
import { PersonalInfoComponent } from './pages/personal-info/personal-info.component';
import { EducationComponent } from './pages/education/education.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { SkillsComponent } from './pages/skills/skills.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: ResumeEditorComponent,
    children: [
      { path: 'personal-info', component: PersonalInfoComponent },
      { path: 'education', component: EducationComponent },
      { path: 'experience', component: ExperienceComponent },
      { path: 'skills', component: SkillsComponent },
      { path: '', redirectTo: 'personal-info', pathMatch: 'full' },
    ],
  },
];
