import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreparationStepService } from './preparation-step.service';
import { IPreparationStep } from './preparation-step';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'preparation-step-edit',
  templateUrl: './preparation-step-edit.component.html',
})
export class PreparationStepEditComponent implements OnInit {
  @Output() closingEdit = new EventEmitter();
  preparationStep: IPreparationStep | undefined;
  errorMessage: string = '';
  statusCode: number = 0;

  preparationStepForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    stepNumber: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(2147483647),
    ]),
    step: new FormControl('', [Validators.required, Validators.maxLength(500)]),
  });

  constructor(
    private route: ActivatedRoute,
    private preparationStepService: PreparationStepService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const recipeId = this.route.snapshot.paramMap.get('recipeid');
    if (id && recipeId) {
      this.preparationStepService
        .getPreparationStep(id, recipeId)
        .subscribe((preparationStep) => {
          this.preparationStep = preparationStep;
          this.preparationStepForm = new FormGroup({
            title: new FormControl(preparationStep.title, [
              Validators.required,
              Validators.maxLength(50),
            ]),
            stepNumber: new FormControl<number>(preparationStep.stepNumber, [
              Validators.required,
              Validators.min(1),
              Validators.max(2147483647),
            ]),
            step: new FormControl(preparationStep.step, [
              Validators.required,
              Validators.maxLength(500),
            ]),
          });
        });
    }
  }

  onSubmit(): void {
    this.statusCode = 0;
    if (this.preparationStep && this.preparationStepForm.valid) {
      const step: IPreparationStep = {
        id: this.preparationStep.id,
        title: this.preparationStepForm.value.title as string,
        stepNumber: this.preparationStepForm.value.stepNumber as number,
        step: this.preparationStepForm.value.step as string,
        recipeId: this.preparationStep.recipeId,
      };

      this.preparationStepService.editPreparationStep(step).subscribe({
        next: (response) => {
          this.statusCode = response.status;
        },
        error: (err) => (this.errorMessage = err),
      });
    }
  }

  closeEdit(): void {
    this.closingEdit.emit();
  }
}
