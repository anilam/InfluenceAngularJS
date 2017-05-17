module App.Config {
    export enum ErrorType {
        danger,
        success,
        warning
    }
    export class Constants {

        //Default
        static runningMode = "";
        static get errorMessage(): any {
                return {
                    editing: 'Please complete the editing',
                    validateinput: 'Please enter the details',
                    success: 'Updated successfully',
                    nodesuccess: 'Source Loaded successfully',
                    settingsuccess:'Settings Updated Successfully',
                    failure: "Update Failed:",
                    renameNode: "Please rename the newly added node",
                    duplicateNode: "Node name already exist, please rename",
                    downloadSuccess: "Downloaded Successfully",
                    loginfailed:"Unauthorized access"
                }
        }

        static get default(): any {
            return {
                url: 'http://124.124.79.181/Influence/Structure/' + this.runningMode + '/Nodes',
                reportURL: 'http://124.124.79.181/Influence/Reports/' + this.runningMode + '/export/nodes/',
                graphURL: 'http://124.124.79.181/Influence/Reports/' + this.runningMode + '/dependencyreport',
                authentication: 'http://124.124.79.181/influence/users/authenticate',
                settings: 'http://124.124.79.181/Influence/Users/SaveSettings/'
            }
        }
    }
}