const columnDefs = [];
let rowData = [];

function initGridColumns(field, title, width, resizable, editable, sortable) {

    columnDefs.push({ field: field, headerName: title, resizable: resizable, editable: editable, sortable: sortable, });
    if (title === `Restrierdatum`) {
        initAgGrid();
    }
}

function initAgGridData(json) {
    rowData = JSON.parse(json);
}

function initAgGrid() {
    const gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData
    };

    // setup the grid after the page has finished loading
    const gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);
}
