const columnDefs = [];
let rowData = [];

function initGridColumns(field, title, width, resizable, editable, sortable, valueFormatterId) {
    columnDefs.push({ field: field, headerName: title, resizable: resizable, editable: editable, sortable: sortable, valueFormatter: this[valueFormatterId]});
}

function initAgGridData(json, pageable, pageSize) {
    rowData = JSON.parse(json);
    setTimeout(() => initAgGrid(pageable, pageSize));
}

function initAgGrid(pageable, pageSize) {
    const gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData,
        pagination: pageable,
        paginationPageSize: pageSize,
        rowDragManaged: true,
        animateRows: true,
    };

    // setup the grid after the page has finished loading
    const gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);
}

function DecimalsFormatter(params) {
    let returnVal = "";
    try {
        let num = parseFloat(params.value); 
        let rounded = num.toFixed(3); 
        returnVal = rounded;
    }
    catch (e) {
    }
    return returnVal;
}

function DateFormatter(params) {
    let returnVal = "";
    try {
        
        const userLocale =
            navigator.languages && navigator.languages.length
                ? navigator.languages[0]
                : navigator.language;
        
        let date = new Date(params.value);
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        returnVal = date.toLocaleDateString(userLocale, options);        
    }
    catch (e) {
    }
    return returnVal;
}
