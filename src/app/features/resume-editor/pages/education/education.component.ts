import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EducationModalComponent } from './education-modal/education-modal.component';
import { ResumeService } from '../../../../core/services/resume/resume.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent implements OnInit, OnDestroy {
  educations: any[] = [];
  private saveSubscription!: Subscription;

  constructor(private dialog: MatDialog, private resumeService: ResumeService) {}

  ngOnInit() {
     this.saveSubscription = this.resumeService.resumeData$.subscribe((resumeData) => {
      if (resumeData?.educations) {
        this.educations = resumeData.educations;
      }
    });
    this.saveSubscription = this.resumeService.save$.subscribe(() => {
      this.resumeService.updateSection('educations', this.educations);
    });
  }

  ngOnDestroy() {
    this.saveSubscription.unsubscribe();
  }

  openEducationModal(education?: any): void {
    const dialogRef = this.dialog.open(EducationModalComponent, {
      width: '700px',
      disableClose: true,
      data: education || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (education) {
          const index = this.educations.findIndex(e => e === education);
          if (index !== -1) {
            this.educations[index] = result;
          }
        } else {
          this.educations.push(result);
        }
        this.resumeService.updateSection('educations', this.educations);
      }
    });
  }

  deleteEducation(education: any): void {
    const index = this.educations.indexOf(education);
    if (index !== -1) {
      this.educations.splice(index, 1);
      this.resumeService.updateSection('educations', this.educations);
    }
  }
}