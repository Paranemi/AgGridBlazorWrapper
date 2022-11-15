const columnDefs = [];
let rowData = [];
let rowImmutableStore;
let gridOptions;
let _dotNetInstance;

function initGridColumns(field, title, width, resizable, editable, sortable) {
    columnDefs.push({ field: field, headerName: title, resizable: resizable, editable: editable, sortable: sortable, });
}

function initAgGridRowData(json, pageable, pageSize, dotNetInstance) {
    _dotNetInstance = dotNetInstance;
    rowData = JSON.parse(json);
    setTimeout(() => initAgGrid(pageable, pageSize));
}

function initAgGrid(pageable, pageSize) {
    gridOptions={
        columnDefs: columnDefs,
        rowData: rowData,
        pagination: pageable,
        paginationPageSize: pageSize,
        rowDragManaged: true,
        animateRows: true,
        //getRowId: (params) => params.data.id,
        readOnlyEdit: true,
        onCellEditRequest: onEdit,
    };

    // setup the grid after the page has finished loading
    const gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);
}

function onEdit(event) {
    const data = event.data;
    const field = event.colDef.field;
    const newValue = event.newValue;
    const newItem = { ...data };
    newItem[field] = event.newValue;

    console.log('onCellEditRequest, updating ' + field + ' to ' + newValue);

    rowData = rowData.map((oldItem) =>
        oldItem.Id == newItem.Id ? newItem : oldItem
    );

    gridOptions.api.setRowData(rowData);

    _dotNetInstance.invokeMethodAsync('CellEdited', JSON.stringify(newItem));
}