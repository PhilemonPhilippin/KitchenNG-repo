import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PreparationStepService } from '../preparation-step.service';
import { IPreparationStepRequest } from '../models/preparation-step-request';
import { Subscription } from 'rxjs';

@Component({
  selector: 'preparation-step-add',
  templateUrl: './preparation-step-add.component.html',
})
export class PreparationStepAddComponent implements OnDestroy {
  statusCode: number = 0;
  @Output() closingAdd = new EventEmitter();
  @Output() addSuccessful = new EventEmitter();
  @Input() recipeId: number = 0;
  errorMessages: string[] = [];
  sub!: Subscription;

  constructor(private preparationStepService: PreparationStepService) {}

  preparationStepForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    stepNumber: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(2147483647),
    ]),
    step: new FormControl('', [Validators.required, Validators.maxLength(500)]),
  });

  onSubmit(): void {
    const preparationStep: IPreparationStepRequest = {
      title: this.preparationStepForm.value.title as string,
      stepNumber: this.preparationStepForm.value.stepNumber as number,
      step: this.preparationStepForm.value.step as string,
    };
    this.sub = this.preparationStepService
      .addPreparationStep(this.recipeId, preparationStep)
      .subscribe({
        next: (response) => {
          this.statusCode = response.status;
          if (this.statusCode == 201) {
            this.preparationStepForm.setValue({
              title: '',
              stepNumber: 0,
              step: '',
            });
            this.addSuccessful.emit();
            this.closeAdd();
          }
        },
        error: (err) => this.errorMessages.push(err),
      });
  }

  closeAdd(): void {
    this.closingAdd.emit();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
