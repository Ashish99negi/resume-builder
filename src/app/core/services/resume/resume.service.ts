import { Injectable, ElementRef } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private resumeDataSubject = new BehaviorSubject<any>({});
  public resumeData$ = this.resumeDataSubject.asObservable();

  private saveSubject = new Subject<void>();
  public save$ = this.saveSubject.asObservable();
  
  private templateReadySubject = new BehaviorSubject<ElementRef | null>(null);
  public templateReady$ = this.templateReadySubject.asObservable();

  updateSection(section: string, data: any): void {
    const currentData = this.resumeDataSubject.getValue();
    const newData = { ...currentData, [section]: data };
    this.resumeDataSubject.next(newData);
  }

  saveData(): void {
    this.saveSubject.next();
  }

  setTemplateElement(element: ElementRef): void {
    this.templateReadySubject.next(element);
  }

  public resetResumeData(): void {
    this.resumeDataSubject.next({});
  }
}
