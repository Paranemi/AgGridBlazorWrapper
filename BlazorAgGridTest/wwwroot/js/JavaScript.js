const columnDefs = [];
let rowData = [];

function initGridColumns(field, title, width, resizable, editable, sortable) {
    columnDefs.push({ field: field, headerName: title, resizable: resizable, editable: editable, sortable: sortable, });
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
