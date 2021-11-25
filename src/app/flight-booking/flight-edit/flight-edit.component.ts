import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightService } from '../flight-search/flight.service';
import { Flight } from '../../entities/flight';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { validateCity } from '../shared/validation/city-validator';
import { validateRoundTrip } from '../shared/validation/round-trip-validator';

@Component({
  selector: 'flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.css']
})
export class FlightEditComponent implements OnChanges, OnInit {
  @Input() flight: Flight;

  editForm: FormGroup = this.fb.group({
    id: [0, Validators.required, []],
    from: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          validateCity(['Graz', 'Wien', 'Hamburg', 'Berlin'])
        ],
        updateOn: 'blur'
      },
      []
    ],
    to: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          validateCity(['Graz', 'Wien', 'Hamburg', 'Berlin'])
        ],
        updateOn: 'blur'
      },
      []
    ],
    date: ['', [Validators.required, Validators.minLength(33), Validators.maxLength(33)], []]
  });

  message = '';

  constructor(private fb: FormBuilder, private flightService: FlightService) {
    this.editForm.validator = validateRoundTrip;
  }

  ngOnChanges(): void {
    if (this.editForm && this.flight) {
      this.editForm.patchValue(this.flight);
    }
  }

  ngOnInit(): void {
    this.editForm.valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged((a, b) => a.id === b.id && a.from === b.from && a.to === b.to && a.date === b.date)
      )
      .subscribe((value) => {
        console.log(value);
      });
  }

  save(): void {
    this.flightService.save(this.editForm.value).subscribe({
      next: (flight) => {
        this.message = 'Success!';
      },
      error: (errResponse) => {
        console.error('Error', errResponse);
        this.message = 'Error!';
      }
    });
  }
}
