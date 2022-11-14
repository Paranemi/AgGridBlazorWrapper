const columnDefs = [];

function initGridColumns(fieldName, title, width, editable, sortable) {

    columnDefs.push({ field: fieldName, headerName: title, width: width, sortable: sortable, editable: editable, })
}

function initAgGrid(json) {
    const forecasts = JSON.parse(json);

    const gridOptions = {
        columnDefs: columnDefs,
        rowData: forecasts
    };

    // setup the grid after the page has finished loading
    const gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);
}


