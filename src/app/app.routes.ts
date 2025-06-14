import { Routes } from '@angular/router';
import { ResumeEditorComponent } from './features/resume-editor/resume-editor.component';

export const routes: Routes = [
  {
    path: 'resume-editor',
    component: ResumeEditorComponent,
    children: [
      { path: 'personal-info', loadComponent: () => import('./features/resume-editor/pages/personal-info/personal-info.component').then(m => m.PersonalInfoComponent) },
      { path: 'education', loadComponent: () => import('./features/resume-editor/pages/education/education.component').then(m => m.EducationComponent) },
      { path: 'experience', loadComponent: () => import('./features/resume-editor/pages/experience/experience.component').then(m => m.ExperienceComponent) },
      { path: 'skills', loadComponent: () => import('./features/resume-editor/pages/skills/skills.component').then(m => m.SkillsComponent) },
      { path: '', redirectTo: 'personal-info', pathMatch: 'full' },
    ]
  },
  {
    path: '',
    redirectTo: 'resume-editor',
    pathMatch: 'full',
  },
];
