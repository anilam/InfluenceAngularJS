class UserSetting {
          ExportExcel:boolean;
          EditNode:boolean;
          DeleteNode:boolean;
          AddNode: boolean;

          ExpandTree:boolean;
          EditNodeDetail:boolean;
          DeleteNodeDetail:boolean;
          AddNodeDetail:boolean;

          Sources:string[];
          DefaultSource: string;

          Role:string;
    }

class AuthenticateResult {
    isAuthenticated: boolean;
    rolePermissions: string[];
    errorMessage:string;
}