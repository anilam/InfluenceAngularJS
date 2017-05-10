 class FunctionalDetail {
        Impact: string;
        Product: string;
        Module: string;
        Complexity: string;
}

     class DatabaseDetail
    {
         DbObject: string;
         DbType: string;
         Description: string;
         MachineName: string;
         Modifyby: string;
         ModifyDtTm: string;
    }


     class AdditionalDetail 
     {
         Description: string;
         Type: string;
         Module: string;
         Complexity: string;
     }


     class NodeDetail {
         Name: string;
         Functional: Array<FunctionalDetail> = new Array();
         DatabaseDetails: Array<DatabaseDetail> = new Array(); 
         AdditionalDetails: Array<AdditionalDetail> = new Array();
    }



