import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PreparationStepService } from '../../services/preparation-step.service';
import { IPreparationStepRequest } from '../../models/requests/preparation-step-request';
import { EMPTY, Subject, catchError, takeUntil } from 'rxjs';

@Component({
  selector: 'preparation-step-add',
  templateUrl: './preparation-step-add.component.html',
})
export class PreparationStepAddComponent implements OnDestroy {
  @Output() closingAdd = new EventEmitter();
  @Output() addSuccessful = new EventEmitter();
  @Input() recipeId: number = 0;

  statusCode: number = 0;
  errorMessage: string = '';
  private destroy$: Subject<void> = new Subject<void>();

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
    this.errorMessage = '';
    this.statusCode = 0;

    if (this.preparationStepForm.valid) {
      const preparationStep: IPreparationStepRequest = {
        title: this.preparationStepForm.value.title as string,
        stepNumber: this.preparationStepForm.value.stepNumber as number,
        step: this.preparationStepForm.value.step as string,
      };

      this.preparationStepService
        .addPreparationStep(this.recipeId, preparationStep)
        .pipe(
          takeUntil(this.destroy$),
          catchError((err) => {
            console.log('Error adding preparation step: ' + err);
            this.errorMessage =
              'An error occurred while adding the preparation step.';
            return EMPTY;
          })
        )
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
        });
    }
  }

  closeAdd(): void {
    this.closingAdd.emit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
