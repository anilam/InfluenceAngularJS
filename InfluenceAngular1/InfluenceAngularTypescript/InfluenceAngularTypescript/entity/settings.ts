class Settings {
    expandTree: boolean;
    collapseTree: boolean;
    edit: boolean;
    delete: boolean;
    add: boolean;

    detailedit: boolean;
    detaildelete: boolean;
    detailadd: boolean;

    exportexcel: boolean;

    runningMode: string;

    sourceList:string[];
}

class AuthenticateResult {
    isAuthenticated: boolean;
    rolePermissions: string[];
    errorMessage:string;
}