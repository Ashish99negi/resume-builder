import { Routes } from '@angular/router';
import { ResumeEditorComponent } from './features/resume-editor/resume-editor.component';
import { FinalizeComponent } from './features/resume-editor/pages/finalize/finalize.component';

export const routes: Routes = [
  {
    path: 'resume-editor',
    component: ResumeEditorComponent,
    children: [
      { path: '', loadComponent: () => import('./features/resume-editor/pages/personal-info/personal-info.component').then(m => m.PersonalInfoComponent) },
      { path: 'education', loadComponent: () => import('./features/resume-editor/pages/education/education.component').then(m => m.EducationComponent) },
      { path: 'experience', loadComponent: () => import('./features/resume-editor/pages/experience/experience.component').then(m => m.ExperienceComponent) },
      { path: 'skills', loadComponent: () => import('./features/resume-editor/pages/skills/skills.component').then(m => m.SkillsComponent) },
      { path: 'summary', loadComponent: () => import('./features/resume-editor/pages/summary/summary.component').then(m => m.SummaryComponent) },
      { path: '', redirectTo: '', pathMatch: 'full' },
    ]
  },
  {
    path: 'finalize',
    component: FinalizeComponent
  },
  {
    path: '',
    redirectTo: 'resume-editor',
    pathMatch: 'full',
  },
];