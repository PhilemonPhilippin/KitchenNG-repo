import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PreparationStepService } from './preparation-step.service';
import { IPreparationStepAddRequest } from './preparation-step-add-request';

@Component({
  selector: 'preparation-step-add',
  templateUrl: './preparation-step-add.component.html',
})
export class PreparationStepAddComponent {
  statusCode: number = 0;
  @Output() closingAdd = new EventEmitter();
  @Input() recipeId: string = '';
  errorMessages: string[] = [];

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
    const preparationStep: IPreparationStepAddRequest = {
      title: this.preparationStepForm.value.title as string,
      stepNumber: this.preparationStepForm.value.stepNumber as number,
      step: this.preparationStepForm.value.step as string,
    };
    this.preparationStepService
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
          }
        },
        error: (err) => this.errorMessages.push(err),
      });
  }

  closeAdd(): void {
    this.closingAdd.emit();
  }
}
