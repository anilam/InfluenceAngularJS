module App.Config {
    export enum Mode {
        Select,
        Pm,
        Ehr
    }

    export enum ErrorType {
        danger,
        success,
        warning
    }
    export class Constants {

        //Default
        static runningMode = Mode.Select;


        static get errorMessage(): any {
                return {
                    editing: 'Please complete the editing',
                    validateinput: 'Please enter the details',
                    success: 'Updated successfully',
                    failure: "Update Failed:",
                    renameNode: "Please rename the newly added node",
                    duplicateNode: "Node name already exist, please rename",
                    downloadSuccess:"Downloaded Successfully"
                }
        }

        static get default(): any {
                return {
                    url: 'http://124.124.79.181/Influence/Structure/' + Mode[this.runningMode] +'/Nodes',
                    reportURL: 'http://124.124.79.181/Influence/Reports/' + Mode[this.runningMode] + '/export/nodes/',
                    graphURL: 'http://124.124.79.181/Influence/Reports/' + Mode[this.runningMode] + '/dependencyreport'
                }
        }
    }
}