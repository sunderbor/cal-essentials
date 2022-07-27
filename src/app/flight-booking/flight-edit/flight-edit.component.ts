import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightService } from '../flight-search/flight.service';
import { Flight } from '../../entities/flight';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
        updateOn: 'blur'
      },
      []
    ],
    to: [
      '',
      {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
        updateOn: 'blur'
      },
      []
    ],
    date: ['', [Validators.required, Validators.minLength(33), Validators.maxLength(33)], []]
  });

  message = '';

  constructor(private fb: FormBuilder, private flightService: FlightService) {}

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
