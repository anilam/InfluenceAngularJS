module App.Config {
    export enum Mode {
        Select,
        Pm,
        Ehr
    }
    export class Constants {

        //Default
        static runningMode = Mode.Select;

        static get default(): any {
            if (this.runningMode == Mode.Pm) {
                return {
                    url: 'http://124.124.79.181/Influence/Structure/pm/Nodes'
                }
            }
            if (this.runningMode == Mode.Ehr) {
                return {
                    url: 'http://124.124.79.181/Influence/Structure/pm/Nodes'
                }
            }
        }
    }
}