export enum ProjectStatus {
    'active' = 0,
    'finished' = 1
}

export class Project {

    id: string;

    constructor( 
        public title: string, 
        public description: string, 
        public numOfPeople: number,
        public status: ProjectStatus
    ) {
        this.id = Math.random().toString();
        this.title = title;
        this.description = description;
        this.numOfPeople = numOfPeople;
        this.status = status
    }
}

