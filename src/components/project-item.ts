import { Component } from "./base-component";
import { Draggable } from "../models/drag-drop";
import { Project } from "../models/project";
import { autobind } from "../decorators/autobind";

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> 
    implements Draggable {
    private project: Project;

    // get syntax binds an object (or class) property to a function that will be called when that 
    //property is looked up. By convention, we write it under class fields. Here we can use it to
    // output a correct string when the number of people is known:
    get persons() {
        if (this.project.numOfPeople === 1) {
            return ('Assigned to 1 person');
        } else {
            return (`Assigned to ${this.project.numOfPeople} people`);
        }
    }

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }
    @autobind
    dragStartHandler(e: DragEvent){
        e.dataTransfer!.setData('text/plain', this.project.id);
        // tells DOM about the cursor and also the intent:
        e.dataTransfer!.effectAllowed = 'move';
    };
    dragEndHandler(_: DragEvent) {

    };

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
    }

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons;
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}