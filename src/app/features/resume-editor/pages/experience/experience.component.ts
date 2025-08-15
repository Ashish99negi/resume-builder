import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ExperienceModalComponent } from './experience-modal/experience-modal/experience-modal.component';
import { ResumeService } from '../../../../core/services/resume/resume.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ExperienceModalComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent implements OnInit, OnDestroy {
  experiences: any[] = [];
  private saveSubscription!: Subscription;

  constructor(private dialog: MatDialog, private resumeService: ResumeService) { }

  ngOnInit() {
    this.saveSubscription = this.resumeService.save$.subscribe(() => {
      this.resumeService.updateSection('experience', this.experiences);
    });

    this.saveSubscription = this.resumeService.resumeData$.subscribe((resumeData) => {
      if (resumeData?.experience) {
        this.experiences = resumeData.experience;
      }
    });

    this.saveSubscription = this.resumeService.save$.subscribe(() => {
      this.resumeService.updateSection('experience', this.experiences);
    });
  }

  ngOnDestroy() {
    this.saveSubscription.unsubscribe();
  }

  openExperienceModal(exp?: any): void {
    const dialogRef = this.dialog.open(ExperienceModalComponent, {
      width: '700px',
      disableClose: true,
      autoFocus: false,
      data: exp
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (exp) {
          const index = this.experiences.indexOf(exp);
          if (index !== -1) {
            this.experiences[index] = { ...result, expanded: false };
          }
        } else {
          this.experiences.push({ ...result, expanded: false });
        }
        this.resumeService.updateSection('experience', this.experiences);
      }
    });
  }

  deleteExperience(exp: any) {
    const index = this.experiences.indexOf(exp);
    if (index !== -1) {
      this.experiences.splice(index, 1);
      this.resumeService.updateSection('experience', this.experiences);
    }
  }

  editExperience(exp: any) {
    this.openExperienceModal(exp);
  }
}