﻿module App {

    export interface IDiagnosticsScope extends ng.IScope {
        treeData: any;
        loadData: string;
        remove: (scope: any) => void;
        toggle: (scope: any) => void;
        moveLastToTheBeginning: () => void;
        nodeData: any;
        newSubItem: (scope: any) => void;
        collapseAll: () => void;
        expandAll: () => void;
        loadDetails: (path: string) => void;
        myDataTable: NodeDetail;
        setActive: (menuItem: any) => void;
        activeMenu: string;
        edit: (scope: any) => void;
        editing: boolean;
        editItem: string;
        textChanged(event: Event): any;
        editValue: any;
        editFuncDetailsValue: any;
        editok: (scope: any) => void;
        editcancel: (scope: any) => void;
        //   checkDuplicateName:any;
        checkDuplicateName: (subMenuItems: any, name: string) => any;
        setFuncdetailsActive(index: any): any;
        activeFuncdetailsId: number;
        editFuncdetails: (Funcdetails: FunctionalDetail, index: number) => void;
        Funcdetailsediting: boolean;
        editItemFuncdetailsId: number;
        editFuncdetailsOk: (Funcdetails: FunctionalDetail, index: number) => void;
        removeFuncdetailsCancel: (Funcdetails: FunctionalDetail, index: number) => void;
        removeFuncdetails: (index: number) => void;
        addFuncdetails: (scope: any) => void;
        visible: (item: any) => boolean;
        findNodes: () => void;
        query: any;
        search: (name: string) => void;
        searchDuplicateName: (subMenuItems: any, name: string) => any;
        filterSearchArray: any;
        saveNodeDetails: () => void;
        activedata: any;
        asideState: { open: boolean, position: any };
        openAside: (position: any, backdrop: any) => void;
        settings: Settings;
        tabselected: number;
        searchCancel: () => any;
        setDBdetailsActive: (index: number) => void;
        activeDBdetailsId: number;
        editDBdetails: any;
        DBdetailsediting: any;
        editItemDBdetailsId: number;
        editDBDetailsValue: any;
        editDBdetailsOk: any;
        removeDBdetailsCancel: any;
        removeDBdetails: any;
        addDBdetails: (scope: any) => void;
        loading: boolean;
        loadServerData: any;
        removeItem: (scope: any) => void;
        saveNode: () => void;
        loadingNode: boolean;
        init: () => any;
        updateExcelExport: (path: string, name: string) => void;
        exportList: any;
        id: number;
        UpdatePathNullToInsertedNode: (subMenuItems: any, status: number) => any;
        document: any
        updateSearchExcelExport: (path: string, name: string) => void;
        alerts: Alerts[];
        closeAlert: (index: any) => void;
        activeOtherdetailsId: number;
        Otherdetailsediting: any;
        editItemOtherdetailsId: number;
        editOtherDetailsValue: any;
        setOtherdetailsActive: (index: number) => void;
        editOtherdetails: (Otherdetails: AdditionalDetail, index: number) => void;
        editOtherdetailsOk: (Otherdetails: AdditionalDetail, index: number) => void;
        removeOtherdetailsCancel: (Otherdetails: AdditionalDetail, index: number) => void;

        removeOtherdetails: (index: number) => void;
        addOtherdetails: (scope: any) => void;
        toggleOpen: (scope: any) => void;
        graphmodel: any;
        graphData: { ProductName: string;Dependencies: { ProductName: string;Impact: string;DependentOn: string }[] }[];
        generateGraph: () => void;
        labels: string[];
        series: string[];
        data: number[][];
        options: { cutoutPercentage: number };
        formSubmit: () => void;
        username: any;
        password: any;
        error: string;
        authenticated: any;
        exportToExcel: () => void;
    }
}