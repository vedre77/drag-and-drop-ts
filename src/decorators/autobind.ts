export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    // NOTE: target is either the prototype of the object
    // we are working with or the constructor function (when adding
    // to a static method), but here we are adding to the instance method!
    const originalMethod = descriptor.value; // this gives access to the original 
    // method; adjusted descriptor (object):
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get () { // again, like having a value property but with extra logic that runs
        // b4 the value will return, we setup the bound function:
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor; // now this descriptor will replace the old methods descriptor 
    //(extra getter layer).
}
