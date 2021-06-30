# Reactive Forms

- [Reactive Forms](#reactive-forms)
  - [Edit Flights](#edit-flights)
  - [Build-in Validators](#build-in-validators)

## Edit flights

In this exercise, you will create a reactive form for editing flights.

1. **If** you do not have a ``FlightEditComponent`` yet: Create a ``FlightEditComponent`` in the ``FlightBookingModule`` and call it up in the template of the ``FlightSearchComponent``.

2. Import the ``ReactiveFormsModule`` into your ``FlightBookingModule``.

    <details>
    <summary>Show source</summary>
    <p>

    ```typescript
    [...]
    import { ReactiveFormsModule } from '@angular/forms';
    [...]

    @NgModule({
        [...]
        imports: [
            [...]
            ReactiveFormsModule
        ],
        [...]
    })
    export class FlightBookingModule {
    }
    ```

    </p>
    </details>

3. Add a FormGroup with the name ``editForm`` to your ``FlightEditComponent``.

    <details>
    <summary>Show source</summary>
    <p>

    ```typescript

    [...]
    import {FormGroup} from '@angular/forms';

    @Component({[...]})
    export class FlightEditComponent implements OnInit {

        editForm: FormGroup;
    
        [...]
    }
    ```

    </p>
    </details>


4. Inject the FormBuilder into the ``FlightEditComponent``.

    <details>
    <summary>Show source</summary>
    <p>

    ```typescript
    import {[...], FormBuilder} from '@angular/forms';

    @Component({
        [...]
    })
    export class FlightEditComponent implements OnInit {
        [...]  
        constructor(private fb: FormBuilder) {
        }
        [...]
    }
    ```

    </p>
    </details>


5. Use the ``FormsBuilder`` in the ``ngOnInit`` method to create a ``FormGroup`` that describes a flight. Add this to the ``editForm``.

    <details>
    <summary>Show source</summary>
    <p>

    ```typescript

    export class FlightEditComponent implements OnInit {
        [...]  
        ngOnInit() {
            this.editForm = this.fb.group({
                id:   [1],
                from: [],
                to:   [],
                date: []
            });
        }
        [...]
    }
    ```

    </p>
    </details>


6. With the code completion of your IDE/editor, explore the methods of editForm. For demonstration, output the properties ``value``, ``valid``, ``touched`` and ``dirty`` on the console.

    <details>
    <summary>Show source</summary>
    <p>

    ```typescript

    export class FlightEditComponent implements OnInit {
        [...]  
        ngOnInit() {
            [...]
            console.log(this.editForm.value);
            console.log(this.editForm.valid);
            console.log(this.editForm.touched);
            console.log(this.editForm.dirty);
        }
        [...]
    }
    ```

    </p>
    </details>

7. Register for ``valueChanges`` on your ``editForm`` and output the received value on the console in order to keep up to date with changes to the form. Please note: If you cannot see any debug messages in your DevTools Console, please make sure you checked "Verbose" in your "Default Levels" settings.

    <details>
    <summary>Show source</summary>
    <p>

    ```typescript

    export class FlightEditComponent implements OnInit {
    [...]  
        ngOnInit() {
            [...]
            this.editForm.valueChanges.subscribe(v => {
                console.debug('changes', v);
            });
        }
    [...]
    }
    ```

    </p>
    </details>

8. Now switch to the file ``flight-edit.component.html``. Create a form there that you can link to the ``FormGroups`` in the ``editForm`` property.

    <details>
    <summary>Show source</summary>
    <p>

    ```html
    <form [formGroup]="editForm">
        <div class="form-group">
            <label>Id:</label>
            <input formControlName="id" class="form-control">
        </div>

        <div class="form-group">
            <label>Date:</label>
            <input formControlName="date" class="form-control">
        </div>

        <div class="form-group">
            <label>From:</label>
            <input formControlName="from" class="form-control">
        </div>

        <div class="form-group">
            <label>To:</label>
            <input formControlName="to" class="form-control">
        </div>

        <div class="form-group">
            <button (click)="save()" class="btn btn-default">Save</button>
        </div>

    </form>
    ```

    </p>
    </details>

9. Test your solution. If everything works, you should see every change you make to the form in the console output.

**Please note** if you cannot see your `FlightEditComponent`, don't forget to add id, e.g. to the `SearchFormComponent` at the bottom. If you cannot see any debug messages in your `DevTools Console`, please make sure you checked `Verbose` in your browsers `Default Levels` settings.

## Using Angular Validators

In this exercise you will validate the _from_ field with the built-in validators ``required`` and ``minlength``.

1. Switch to the flight-edit.component.ts file and specify when setting up the FormGroup that the from property is to be validated with ``required`` and ``minlength``. The latter validator is intended to ensure that at least three characters are recorded.

    <details>
    <summary>Show source</summary>
    <p>

    ```typescript		
    [...]
    ngOnInit(): void {
        this.editForm = this.fb.group({
            id:   [1],
            from: [null, [Validators.required, Validators.minLength(3)]],
            to:   [null],
            date: [null]
        });

    }
    [...]		
    ```	

    </p>
    </details>

2. Switch to the ``flight-edit.component.html`` file and enter the ``errors`` property of the ``from`` control there. You can use the built-in json pipe.

    <details>
    <summary>Show source</summary>
    <p>

    ```TypeScript
    <input  formControlName="from">		
    [...]           
    errors: {{editForm.controls['from'].errors | json}}	
    ```

    </p>
    </details> 

3. Also use the control's ``hasError`` method to find out whether the ``minlength`` error has occurred.

    <details>
    <summary>Show source</summary>
    <p>

    ```TypeScript
    <input  formControlName="from" [...] >		
    [...]
    <div class="text-danger" *ngIf="editForm.controls['from'].hasError('minlength')">		
        ...minlength...
    </div>		
    ```

    </p>
    </details>
