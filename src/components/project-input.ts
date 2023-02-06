import { Component } from "./base-component";
import { Validatable, validate } from "../util/validation";
import { autobind } from "../decorators/autobind";
import { projectState } from "../state/project-state";

export class ProjectInput extends Component <HTMLDivElement, HTMLFormElement> {
    // if you don't declare class fields, you get '...your variable/ property name' does not exist on
    // type '...your class'! HTMLTemplateElement is missing content error: so we should type cast to 
    // tell TS about this (as keyword)! or: <...> preceeding the declaration. ! means not Null.
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement; 

    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
        this.configure(); // adds event listener
    }
    // public methods are first by convention
    configure() {
        this.element.addEventListener('submit',
        this.submitHandler)
    }

    renderContent() {}
    
    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const titleValidatable: Validatable = {value: enteredTitle, required: true}
        const descriptionValidatable: Validatable = {value: enteredDescription, 
            required: true, 
            minLength: 5
        };
        const peopleValidatable: Validatable = {value: +enteredPeople, 
            required: true, 
            min: 1
        };
        if (!validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)) {
            alert('Invalid input, please try again!');
            return;
        } else {
            this.clearInputs();
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    @autobind
    private submitHandler(e: Event) {
        e.preventDefault();
        const userInput = this.gatherUserInput();
        // here we can check if it is a tuple (in JS case, if it is an array):
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            this.clearInputs();
        }
    }
}
