import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ExperienceModalComponent } from './experience-modal/experience-modal/experience-modal.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ExperienceModalComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  experiences: any[] = [];

  constructor(private dialog: MatDialog) { }

  openExperienceModal(): void {
    const dialogRef = this.dialog.open(ExperienceModalComponent, {
      width: '700px',
      disableClose: true,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Debug log: ensure description is present
        console.log('Saved experience:', result);
        this.experiences.push({
          ...result,
          expanded: false
        });

        // this.experiences.push(result);
      }
    });
  }

  editExperience(exp: any) {
    // You can prefill modal here
    console.log('Edit:', exp);
  }

  deleteExperience(exp: any) {
    const index = this.experiences.indexOf(exp);
    if (index !== -1) {
      this.experiences.splice(index, 1);
    }
  }

}
