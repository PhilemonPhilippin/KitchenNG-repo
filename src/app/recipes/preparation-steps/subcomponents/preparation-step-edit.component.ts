import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreparationStepService } from '../../services/preparation-step.service';
import { IPreparationStep } from '../../models/dtos/preparation-step';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPreparationStepRequest } from '../../models/requests/preparation-step-request';
import { EMPTY, Subject, catchError, takeUntil } from 'rxjs';

@Component({
  selector: 'preparation-step-edit',
  templateUrl: './preparation-step-edit.component.html',
})
export class PreparationStepEditComponent implements OnInit, OnDestroy {
  @Output() closingEdit = new EventEmitter();
  @Output() editSuccess = new EventEmitter();

  preparationStep: IPreparationStep | undefined;
  errorMessage: string = '';
  statusCode: number = 0;
  recipeId: number = 0;
  id: number = 0;
  private destroy$: Subject<void> = new Subject<void>();

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
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.recipeId = Number(this.route.snapshot.paramMap.get('recipeid'));
    if (this.id && this.recipeId) {
      this.errorMessage = '';
      this.preparationStepService
        .getPreparationStep(this.id, this.recipeId)
        .pipe(
          takeUntil(this.destroy$),
          catchError((err) => {
            console.log('Error while fetching the preparation step: ' + err);
            this.errorMessage =
              'An error occured while fetching the preparation step.';
            return EMPTY;
          })
        )
        .subscribe((preparationStep) => {
          this.preparationStep = preparationStep;
          this.initializeFormControls(preparationStep);
        });
    }
  }

  private initializeFormControls(preparationStep: IPreparationStep): void {
    this.preparationStepForm.setValue({
      title: preparationStep.title,
      stepNumber: preparationStep.stepNumber,
      step: preparationStep.step,
    });
  }

  onSubmit(): void {
    this.statusCode = 0;
    this.errorMessage = '';

    if (this.preparationStep && this.preparationStepForm.valid) {
      const step: IPreparationStepRequest = {
        title: this.preparationStepForm.value.title || '',
        stepNumber: this.preparationStepForm.value.stepNumber || 0,
        step: this.preparationStepForm.value.step || '',
      };

      this.preparationStepService
        .editPreparationStep(this.id, this.recipeId, step)
        .pipe(
          takeUntil(this.destroy$),
          catchError((err) => {
            console.log('Error while editing preparation step: ' + err);
            this.errorMessage =
              'An error occurred while editing the preparation step';
            return EMPTY;
          })
        )
        .subscribe({
          next: (response) => {
            this.statusCode = response.status;
            if (response.status === 204) {
              this.editSuccess.emit();
              this.closeEdit();
            }
          },
        });
    }
  }

  closeEdit(): void {
    this.closingEdit.emit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
