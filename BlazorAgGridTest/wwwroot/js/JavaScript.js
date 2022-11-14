const columnDefs = [];
let rowData = [];

function initGridColumns(field, title, width, resizable, editable, sortable) {
    columnDefs.push({ field: field, headerName: title, resizable: resizable, editable: editable, sortable: sortable, });
}

function initAgGridData(json) {
    rowData = JSON.parse(json);
    setTimeout(() => initAgGrid());
}

function initAgGrid() {
    const gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData,
        //pagination: true,
        //paginationPageSize: 20,
        rowDragManaged: true,
        animateRows: true,
    };

    // setup the grid after the page has finished loading
    const gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);
}
