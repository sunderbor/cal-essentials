import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnInit, Output } from '@angular/core';

import { Flight } from '../../entities/flight';

@Component({
  selector: 'flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightCardComponent implements OnInit, OnChanges {
  debug = true;

  @Input() item: Flight;
  @Input() isSelected: boolean;
  @Output() isSelectedChange = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<void>();

  constructor(private element: ElementRef, private zone: NgZone) {}

  ngOnChanges(): void {
    if (this.debug) {
      console.warn('[FlightCardComponent - ngOnChanges()]');
      console.log(this.item);
      console.log('isSelected: ' + this.isSelected);
    }
  }

  ngOnInit(): void {
    if (this.debug) {
      console.warn('[FlightCardComponent - ngOnInit()]');
      console.log(this.item);
      console.log('isSelected: ' + this.isSelected);
    }
  }

  select(): void {
    // this.isSelected = true;
    if (this.debug) {
      console.warn('[FlightCardComponent - select()]');
      console.log('isSelected: ' + true);
    }
    this.isSelectedChange.emit(true);
  }

  deselect(): void {
    // this.isSelected = false;
    if (this.debug) {
      console.warn('[FlightCardComponent - deselect()]');
      console.log('isSelected: ' + false);
    }
    this.isSelectedChange.emit(false);
  }

  blink(): void {
    // Dirty Hack used to visualize the change detector
    // let originalColor = this.element.nativeElement.firstChild.style.backgroundColor;
    this.element.nativeElement.firstChild.style.backgroundColor = 'crimson';
    //              ^----- DOM-Element

    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.element.nativeElement.firstChild.style.backgroundColor = 'white';
      }, 1000);
    });
  }
}
