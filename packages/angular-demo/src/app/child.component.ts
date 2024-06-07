/* eslint-disable */
// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols,JSMethodCanBeStatic
import {
	AfterContentInit,
	AfterViewInit,
	Component,
	EventEmitter,
	input,
	output,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
	model,
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, ValidationErrors, Validator } from '@angular/forms';
import { Observable } from 'rxjs';
import { ParentDirective } from './parent.directive';
import { NestedInterface, TestInterface, TestObjectType, TestType } from './internal-types';

@Component({
	selector: 'app-child',
	template: `Child works`,
})
export class ChildComponent
	extends ParentDirective<string>
	implements
		OnInit,
		OnChanges,
		OnDestroy,
		AfterViewInit,
		AfterContentInit,
		OnDestroy,
		Validator,
		ControlValueAccessor
{
	/**
	 * Uninitialized value of string | undefined type.
	 */
	valueOrUndefined: string | undefined;

	/**
	 * Optional, uninitialized of string type.
	 */
	valueOrOptional?: string;

	/**
	 * Value initialized with string literal and implicit type.
	 */
	stringValue = '';

	/**
	 * Value initialized with boolean literal and implicit type.
	 */
	booleanValue = true;

	/**
	 * Value initialized with boolean literal and explicit type.
	 */
	booleanValueTyped: boolean = true;

	/**
	 * Value initialized with number literal and explicit type.
	 */
	numberValue = 10;

	/**
	 * Value initialized with object literal and implicit (any) type.
	 */
	objectValue = {};

	focusEvent?: FocusEvent;

	/**
	 * Uninitialized value of type function or undefined.
	 */
	functionValue: ((p1: string, p2: TestType, p3: NestedInterface) => string) | undefined;

	/**
	 * Value initialized with string literal. The explicit type is an alias
	 * for a union. In the description only "TestType" should be printed.
	 * In the details, the alias should be expanded to the union.
	 */
	valueWithType: TestType = '';

	/**
	 * Value initialized with an object literal. The explicit type is an interface.
	 * In the description only "TestInterface" should be printed. In the details,
	 * the interface should be expanded with its properties.
	 */
	valueWithInterface: TestInterface<string> = {};

	// Should not be included in the resulting types
	private privateValue: string = 'test';

	// Should not be included in the resulting types
	protected protectedValue: string = 'test';

	/**
	 * A setter. The type "string" should be picked from the parameters.
	 */
	set stringSetter(value: string) {}

	/**
	 *  A getter. The type "string" should be picked implicitly from the return value.
	 */
	get stringGetter() {
		return '';
	}

	/**
	 * This is an input.
	 */
	@Input() simpleInput?: string = 'defaultValue2';

	/**
	 * This is an input with an alias. The alias should be printed instead of the field name.
	 */
	// eslint-disable-next-line @angular-eslint/no-input-rename
	@Input('childInputWithAlias') inputWithAlias?: string;

	/**
	 * This is an input with a default value override. The override should be
	 * preferred over the initializer.
	 * @default "Overridden"
	 */
	@Input() inputWithDefaultOverride?: string = 'bla';

	@Input()
	nestedGenericType?: Observable<ReadonlyArray<TestInterface<boolean>>>;

	/**
	 * This is an output.
	 */
	@Output() simpleOutput = new EventEmitter<string>();

	/**
	 * This is an output with an alias.
	 */
	// eslint-disable-next-line
	@Output('simpleOutputWithAlias') simpleOutputWithAlias = new EventEmitter<string>();

	/**
	 * This is a setter input with an alias and default override
	 * @default false
	 */
	// eslint-disable-next-line @angular-eslint/no-input-rename
	@Input('setterInputWithAlias')
	set setterInput(value: string[]) {}

	get setterInput() {
		return [];
	}

	@Input() alternativeArrayInput?: string[];

	@Input() arrayInput?: Array<string>;

	@Input() readonlyArrayInput?: ReadonlyArray<string>;

	@Input() testObjectTypeInput?: TestObjectType<string>;

	/**
	 * Simple input signal
	 */
	signalInput = input();

	/**
	 * Simple input signal of type `string`
	 */
	signalInputString = input<string>();

	/**
	 * Simple input signal of type `string` with default
	 */
	signalInputStringWithDefault = input<string>('empty');

	/**
	 * Input signal with object type
	 */
	signalInputObject = input<TestObjectType<string>>();

	/**
	 * Input signal with object type and default
	 */
	signalInputObjectWithDefault = input<TestObjectType<string>>({
		x: 42,
		y: 42,
		z: '-42',
		nestedObjectType: {
			typeFromGrandparent: '42',
		},
	});

	/**
	 * Required input signal
	 */
	signalRequiredInput = input.required<boolean>();

	/**
	 * Signal output
	 */
	signalOutput = output<boolean>();

	/**
	 * Signal output
	 */
	signalOutputObject = output<TestObjectType<TestObjectType<number>>>();

	/**
	 * Simple model signal (input/output)
	 */
	signalModel = model();

	/**
	 * Simple model signal of type `string` (input/output)
	 */
	signalModelString = model<string>();

	/**
	 * Simple model signal of type `string` with default (input/output)
	 */
	signalModelStringWithDefault = model<string>('42');

	/**
	 * Model signal with object type (input/output)
	 */
	signalModelObject = model<TestObjectType<string>>();

	/**
	 * Model signal with object type and default (input/output)
	 */
	signalModelObjectWithDefault = model<TestObjectType<string>>({
		x: 42,
		y: 42,
		z: '-42',
		nestedObjectType: {
			typeFromGrandparent: '42',
		},
	});

	/**
	 * This is some normal setter with a defaultValue override
	 * @default "someValue2"
	 */
	set someNormalSetter(test: string) {}

	_val = 1;

	/**
	 * A setter that also has a respective getter
	 * @default 1
	 */
	set bothSetterAndGetter(val: number) {
		this._val = val;
	}

	get bothSetterAndGetter() {
		return this._val;
	}

	constructor() {
		super();
	}

	ngOnInit() {}

	ngOnChanges() {}

	ngAfterViewInit() {}

	ngAfterContentInit() {}

	ngOnDestroy() {}

	/**
	 * Public method with parameter and return value description
	 * @param valA The first parameter of this function
	 * @param valB The second parameter of this function
	 * @return Returns the empty string in all cases.
	 */
	public publicMethod(valA: string, valB: string): string {
		return '';
	}

	private privateMethod(val: string): string {
		return '';
	}

	protected protectedMethod(val: string): string {
		return '';
	}

	/**
	 * Needed internally, but needs to be public
	 *
	 * @exclude-docs
	 */
	public methodExcludedViaDocs(): void {}

	validate(control: AbstractControl): ValidationErrors | null {
		return null;
	}

	registerOnChange(fn: any): void {}

	registerOnTouched(fn: any): void {}

	registerOnValidatorChange(fn: () => void): void {}

	setDisabledState(isDisabled: boolean): void {}

	writeValue(obj: any): void {}
}
