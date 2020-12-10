import {getAppNames, getAppStatus, registerApplication, start} from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";

export const routes = constructRoutes(
  document.querySelector("#single-spa-layout") as HTMLTemplateElement
);
export const applications = constructApplications({
  routes,
  loadApp({ name }) {
    console.warn(name);
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });
/*registerApplication({
  name: "start-angular",
  app: () => System.import("start-angular"),
  activeWhen: (location) => true,
});
registerApplication({
  name: "second-angular",
  app: () => System.import("second-angular"),
  activeWhen: "/second-angular"
});*/
const appNames = getAppNames();
console.log(appNames); // ['app1', 'app2', 'app3', 'navbar']

applications.forEach(registerApplication);
layoutEngine.activate();
console.log(layoutEngine.isActive());
start();


const status = getAppStatus('start-angular');
const status2 = getAppStatus("second-angular");
console.log(status);
console.log(status2);




