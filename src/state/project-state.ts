import { Project } from "../models/project";
import { ProjectStatus } from "../models/project";

type Listener <T>= (items: T[])  => void;

export class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

export class ProjectState extends State<Project> {
    
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        } else {
            this.instance = new ProjectState();
            return this.instance;
        }
    }

    addProject(title: string, 
        description: string, 
        numOfPeople: number
    ) {
        const newProject = new Project(title, description, numOfPeople, ProjectStatus.active);
        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
        // slice so that we pass the copy of the array, otherwise
        // we could be changing via the original reference!
            listenerFn(this.projects.slice());
        }
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
    // we need to define which project to move, and what is the new status
        const project = this.projects.find(prj => prj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {
        for (const listenerFn of this.listeners) {
        // listenerFn takes a copy of projects and rerenders the DOM
            listenerFn(this.projects.slice());
        }
    }
}
// now we are guaranteed that we have only one state 
// management state project!
export const projectState = ProjectState.getInstance();
