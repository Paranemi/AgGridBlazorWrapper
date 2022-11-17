const columnDefs = [];
let rowData = [];
let rowImmutableStore;
let gridOptions;
let _dotNetInstance;


function initGridColumns(field, title, width, resizable, editable, columnFilter, sortable, valueFormatterId) {
    columnDefs.push({
        field: field,
        headerName: title,
        resizable: resizable,
        editable: editable,
        filter: columnFilter,
        sortable: sortable,
        valueFormatter: this[valueFormatterId],
    });
}

function initAgGridRowData(json, pageable, pageSize, fullRowEdit, dotNetInstance) {
    _dotNetInstance = dotNetInstance;
    rowData = JSON.parse(json);
    setTimeout(() => initAgGrid(pageable, pageSize, fullRowEdit));
}

function initAgGrid(pageable, pageSize, fullRowEdit) {
    gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData,
        pagination: pageable,
        paginationPageSize: pageSize,
        rowDragManaged: true,
        animateRows: true,
        editType: fullRowEdit ? 'fullRow' : '',
        onRowValueChanged: fullRowEdit ? onRowEdit : null,
        readOnlyEdit: !fullRowEdit,
        onCellEditRequest: !fullRowEdit ? onCellEdit : null,
    };

    // setup the grid after the page has finished loading
    const gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);
}

function onRowEdit(event) {
    var newItem = event.data;

    OnEditCallback(newItem);
}

function onCellEdit(event) {
    const data = event.data;
    const field = event.colDef.field;
    const newItem = { ...data };
    newItem[field] = event.newValue;

    rowData = rowData.map((oldItem) =>
        oldItem.Id == newItem.Id ? newItem : oldItem
    );

    gridOptions.api.setRowData(rowData);

    OnEditCallback(newItem);
}

function OnEditCallback(newItem) {
    _dotNetInstance.invokeMethodAsync('Edited', JSON.stringify(newItem));
}

function DecimalsFormatter(params) {
    let returnVal = "";
    try {
        let num = parseFloat(params.value);
        let rounded = num.toFixed(3);
        returnVal = rounded;
    } catch (e) {
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
    } catch (e) {
    }
    return returnVal;
}