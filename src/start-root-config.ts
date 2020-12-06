import {registerApplication, start} from "single-spa";
import {
    constructApplications,
    constructRoutes,
    constructLayoutEngine,
} from "single-spa-layout";

const routes = constructRoutes(
    document.querySelector("#single-spa-layout") as HTMLTemplateElement
);
const applications = constructApplications({
    routes,
    loadApp({name}) {
        return System.import(name);
    },
});
const layoutEngine = constructLayoutEngine({routes, applications});
registerApplication({
    name: "start-angular",
    app: () => System.import("start-angular"),
    activeWhen: (location) => true
});
applications.forEach(registerApplication);
layoutEngine.activate();
start();
