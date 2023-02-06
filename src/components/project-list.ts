import { Component } from "./base-component";
import { Project } from "../models/project";
import { DragTarget } from "../models/drag-drop";
import { autobind } from "../decorators/autobind";
import { projectState } from "../state/project-state";
import { ProjectStatus } from "../models/project";
import { ProjectItem } from "./project-item";

export class ProjectList extends Component <HTMLDivElement, HTMLElement>
    implements DragTarget {
    assignedProjects: Project[]

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);
        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }
    @autobind
    dragOverHandler(e: DragEvent) {
        if (e.dataTransfer && e.dataTransfer.types[0] === 'text/plain') {
            // default is not to allow dropping!
            e.preventDefault();
            // indicate droppable area while dragstart event is on:
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.add('droppable');
        }
    }
    @autobind
    dropHandler(e: DragEvent) {
        const projId = e.dataTransfer!.getData('text/plain');
        projectState.moveProject(projId, this.type === 'active' ? ProjectStatus.active : ProjectStatus.finished);
    }
    @autobind
    dragLeaveHandler(_: DragEvent) {
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable');
    }

    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        // listening for state change:
        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status === ProjectStatus.active;
                }
                return prj.status === ProjectStatus.finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }

    renderContent() {
        const listId = `${this.type}-projects-list`;
        // referencing element child nodes:
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = 
        this.type.toUpperCase() + ' PROJECTS';
    }

    private renderProjects() {
        const listElement = document.getElementById(
            `${this.type}-projects-list`
        )! as HTMLUListElement;
        // clearing before rerendering, to avoid duplicate elements:
        listElement.innerHTML = '';
        for (let projItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, projItem);
        }
    }
}