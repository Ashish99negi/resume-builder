import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule, MatChipInputEvent } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, of, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ResumeService } from '../../../../core/services/resume/resume.service';

export interface Skill {
  name: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
  ],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit, OnDestroy {
  form: FormGroup;
  skills: Skill[] = [];
  allSkills: string[] = [
    'JavaScript', 'Python', 'Java', 'C++', 'Angular', 'React', 'Vue', 'Node.js',
    'Django', 'Spring', 'MongoDB', 'SQL', 'Git', 'Docker', 'Kubernetes', 'AWS',
    'Teamwork', 'Communication', 'Problem Solving', 'Leadership'
  ];
  filteredSkills: Observable<string[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  
  @ViewChild('skillInputRef') skillInputRef!: ElementRef<HTMLInputElement>;

  private saveSubscription!: Subscription;

  constructor(private fb: FormBuilder, private resumeService: ResumeService) {
    this.form = this.fb.group({
      skillInput: ['']
    });
    this.filteredSkills = this.form.get('skillInput')!.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => (skill ? this._filter(skill) : this.allSkills.slice()))
    );
  }

  ngOnInit() {
     this.saveSubscription = this.resumeService.resumeData$.subscribe((resumeData) => {
      if (resumeData?.skills) {
        this.skills = resumeData.skills;
      }
    });

    this.saveSubscription = this.resumeService.save$.subscribe(() => {
      this.resumeService.updateSection('skills', this.skills);
    });
  }

  ngOnDestroy() {
    this.saveSubscription.unsubscribe();
  }

  get skillInput(): FormControl {
    return this.form.get('skillInput') as FormControl;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.skills.some(skill => skill.name.toLowerCase() === value.toLowerCase())) {
      this.skills.push({ name: value });
      this.resumeService.updateSection('skills', this.skills);
    }
    event.chipInput.clear();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
    if (value && !this.skills.some(skill => skill.name.toLowerCase() === value.toLowerCase())) {
      this.skills.push({ name: value });
      this.resumeService.updateSection('skills', this.skills);
    }
    this.skillInputRef.nativeElement.value = '';
    this.form.get('skillInput')!.setValue('');
  }

  remove(skill: Skill): void {
    const index = this.skills.indexOf(skill);
    if (index >= 0) {
      this.skills.splice(index, 1);
      this.resumeService.updateSection('skills', this.skills);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allSkills.filter(skill => skill.toLowerCase().includes(filterValue));
  }
}