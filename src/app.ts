// underscores resolve the 'unused parameters' error;
// enums assist to clarify intent and also intelisense in use;
// creating a generic class will allow setting the concrete types 
// later when inheriting from it!
// 'abstract' signals that the class is to be inherited from, not 
// instantiated!
import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";
import "./app.css";

new ProjectInput();
new ProjectList('active');
new ProjectList('finished');



