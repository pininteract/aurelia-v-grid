/*****************************************************************************************************************
 *    vGridSelection
 *    This just inserts the strings into html templates
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
export class VGridSelection {

  constructor(mode, vGrid) {

    this.vGrid = vGrid;
    this.selectionMode = "none";
    this.lastRowSelected = -1; //this need to be reset when filtering
    this.lastKeyKodeUsed = "none"; //this ned to be reset when filtering
    this.selectedRows = 0;

    if (mode === false) {
      this.selectionMode = "single";
    }
    if (mode === true) {
      this.selectionMode = "multiple";
    }

    this.selection = new Set([]);


  }


  triggerEvent(){
    //send out event
    this.vGrid.sendCollectionEvent();
  }


  setMode(mode) {
    this.selectionMode = "none";
    if (mode === false) {
      this.selectionMode = "single";
    }
    if (mode === true) {
      this.selectionMode = "multiple";
    }

  }


  isSelected(row) {
    var result = false;
    if (this.selectedRows > 0) {
      if (this.vGrid.vGridCollectionFiltered[row]) {
        result = this.selection.has(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
      }
    }
    return result;
  }


  isSelectedMain(row) {
    var result = false;
    if (this.selectedRows > 0) {
      if (this.vGrid.vGridCollection[row]) {
        result = this.selection.has(this.vGrid.vGridCollection[row][this.vGrid.vGridRowKey]);
      }
    }
    return result;
  }


  deSelect(row) {
    if (this.vGrid.vGridCollectionFiltered[row]) {
      this.selection.delete(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
    }
    this.selectedRows = this.selection.size;

    //send out event
    this.triggerEvent();

  }


  deSelectMain(row) {
    if (this.vGrid.vGridCollection[row]) {
      this.selection.delete(this.vGrid.vGridCollection[row][this.vGrid.vGridRowKey]);
    }
    this.selectedRows = this.selection.size;

    //send out event
    this.triggerEvent();

  }


  select(row, addToSelection) {
    switch (this.selectionMode) {
      case "none":
      case null:
      case undefined:
        break;
      case "single":
        this.selection.clear();
        if (this.vGrid.vGridCollectionFiltered[row]) {
          this.selection.add(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
        }
        this.selectedRows = this.selection.size;
        break;
      case "multiple":
        if (!addToSelection) {
          this.selection.clear();
          if (this.vGrid.vGridCollectionFiltered[row]) {
            this.selection.add(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
          }
          this.selectedRows = this.selection.size;
        } else {
          if (this.vGrid.vGridCollectionFiltered[row]) {
            this.selection.add(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
          }
          this.selectedRows = this.selection.size;
        }
    }

    //send out event
    this.triggerEvent();

  }


  selectMain(row, addToSelection) {
    switch (this.selectionMode) {
      case "none":
      case null:
      case undefined:
        break;
      case "single":
        this.selection.clear();
        if (this.vGrid.vGridCollection[row]) {
          this.selection.add(this.vGrid.vGridCollection[row][this.vGrid.vGridRowKey]);
        }
        this.selectedRows = this.selection.size;
        break;
      case "multiple":
        if (!addToSelection) {
          this.selection.clear();
          if (this.vGrid.vGridCollection[row]) {
            this.selection.add(this.vGrid.vGridCollection[row][this.vGrid.vGridRowKey]);
          }
          this.selectedRows = this.selection.size;
        } else {
          if (this.vGrid.vGridCollection[row]) {
            this.selection.add(this.vGrid.vGridCollection[row][this.vGrid.vGridRowKey]);
          }
          this.selectedRows = this.selection.size;
        }
    }

    //send out event
    this.triggerEvent();

  }


  selectRange(start, end) {
    if (this.selectionMode === "multiple") {
      this.selection.clear();
      for (var i = start; i < end + 1; i++) {
        this.selection.add(this.vGrid.vGridCollectionFiltered[i][this.vGrid.vGridRowKey]);
      }
      this.selectedRows = this.selection.size;
    }

    //send out event
    this.triggerEvent();
  }


  selectAll() {
    if (this.selectionMode === "multiple") {
      for (var i = 0; i < this.vGrid.vGridCollectionFiltered.length; i++) {
        this.selection.add(this.vGrid.vGridCollectionFiltered[i][this.vGrid.vGridRowKey]);
      }
      this.selectedRows = this.selection.size;
    }
    if (this.selectionMode === "single" && this.vGrid.vGridCurrentRow >= 0) {
      this.selection.clear();
      this.selection.add(this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow][this.vGrid.vGridRowKey]);
      this.selectedRows = this.selection.size;
    }

    //send out event
    this.triggerEvent();

  }

  deSelectAll() {
    for (var i = 0; i < this.vGrid.vGridCollectionFiltered.length; i++) {
      this.selection.delete(this.vGrid.vGridCollectionFiltered[i][this.vGrid.vGridRowKey]);
    }
    this.selectedRows = this.selection.size;

    //send out event
    this.triggerEvent();
  }


  selectRangeMain(start, end) {
    if (this.selectionMode === "multiple") {
      this.selection.clear();
      for (var i = start; i < end + 1; i++) {
        this.selection.add(this.vGrid.vGridCollection[i][this.vGrid.vGridRowKey]);
      }
      this.selectedRows = this.selection.size;
    }

    //send out event
    this.triggerEvent();
  }


  reset() {
    if (this.selectedRows > 0) {
      this.selection.clear();
    }
    this.lastRowSelected = -1;
    this.lastKeyKodeUsed = "none";
    this.selectedRows = this.selection.size;

    //send out event
    this.triggerEvent();
  }


  getSelectedRows() {
    var array = [];
    if (this.selectedRows > 0) {
      this.vGrid.vGridCollectionFiltered.forEach((x, index) => {
        if (this.selection.has(x[this.vGrid.vGridRowKey]) === true) {
          array.push(index);
        }
      });
    }
    return array;

  }


  getSelectedRowsMain() {
    var array = [];
    if (this.selectedRows > 0) {
      this.vGrid.vGridCollection.forEach((x, index) => {
        if (this.selection.has(x[this.vGrid.vGridRowKey]) === true) {
          array.push(index);
        }
      });
    }
    return array;
  }

  setSelectedRows(newRows) {
    if (this.selectedRows > 0) {
      this.selection.clear();
    }
    for (var i = 0; i < newRows.length; i++) {
      this.selection.add(this.vGrid.vGridCollectionFiltered[newRows[i]][this.vGrid.vGridRowKey]);
    }
    this.selectedRows = this.selection.size;

    //send out event
    this.triggerEvent();

  }


  setSelectedRowsMain(newRows) {
    if (this.selectedRows > 0) {
      this.selection.clear();
    }
    for (var i = 0; i < newRows.length; i++) {
      this.selection.add(this.vGrid.vGridCollection[newRows[i]][this.vGrid.vGridRowKey]);
    }
    this.selectedRows = this.selection.size;

    //send out event
    this.triggerEvent();

  }


  /****************************************************************************************************************************
   * fixes highlight and select...
   ****************************************************************************************************************************/
  highlight(e, currentRow, vGridGenerator) {

    var isSel;
    var manualSel = this.vGrid.vGridConfig.attManualSelection;
    if (!manualSel) {
      var currentselectedRows = this.getSelectedRows();
      var currentKeyKode = "";

      if (currentRow !== this.lastRowSelected || currentselectedRows[0] !== currentRow) {

        if (currentRow <= (vGridGenerator.vGridConfig.getCollectionLength() - 1)) { //do I need to check this?

          if (this.selectionMode === "multiple") { //if multiselect duh!



            if (e.shiftKey) {
              currentKeyKode = "shift";
              currentselectedRows = this.getSelectedRows();
              if (currentselectedRows.length > 0 && this.lastKeyKodeUsed === "none") {
                this.lastRowSelected = currentselectedRows[0];
                this.lastKeyKodeUsed = "shift";
              }
            }

            if (e.ctrlKey) {
              currentKeyKode = "ctrl";
            }

            if (!e.ctrlKey && !e.shiftKey) {
              currentKeyKode = "none";
            }

            switch (true) {
              case currentKeyKode === "none":
                this.select(currentRow);
                break;
              case this.lastKeyKodeUsed === "shift" && currentKeyKode === "ctrl":

                isSel = this.isSelected(currentRow);
                if (isSel === true) {
                  this.deSelect(currentRow);
                } else {
                  this.select(currentRow, true);
                }
                this.lastRowSelected = currentRow;
                break;

              case this.lastKeyKodeUsed === "ctrl" && currentKeyKode === "shift":
                var oldSel = this.getSelectedRows();
                this.selectRange(this.lastRowSelected, currentRow);
                var newSel = this.getSelectedRows();
                this.setSelectedRows(oldSel.concat(newSel));

                break;

              case this.lastKeyKodeUsed === "ctrl" && currentKeyKode === "ctrl":

                isSel = this.isSelected(currentRow);
                if (isSel === true) {
                  this.deSelect(currentRow);
                } else {
                  this.select(currentRow, true);
                }
                this.lastRowSelected = currentRow;
                break;

              case this.lastKeyKodeUsed === "none" && currentKeyKode === "ctrl":

                isSel = this.isSelected(currentRow);
                if (isSel === true) {
                  this.deSelect(currentRow);
                } else {
                  this.select(currentRow, true);
                }
                this.lastRowSelected = currentRow;
                break;

              case this.lastKeyKodeUsed === "shift" && currentKeyKode === "shift":

                if (this.lastRowSelected > currentRow) {
                  this.selectRange(currentRow, this.lastRowSelected);
                } else {
                  this.selectRange(this.lastRowSelected, currentRow);
                }

                break;

              case this.lastKeyKodeUsed === "none" && currentKeyKode === "shift":

                if (this.lastRowSelected !== -1) {
                  if (this.lastRowSelected > currentRow) {
                    this.selectRange(currentRow, this.lastRowSelected);
                  } else {
                    this.selectRange(this.lastRowSelected, currentRow);
                  }
                } else {
                  this.lastRowSelected = currentRow;
                  this.select(currentRow);
                }
                break;
              default:
                console.error("error, this should not happen, debug selection");
            }
          } else {
            this.select(currentRow);
          }
          this.lastKeyKodeUsed = currentKeyKode;

          //update selection on rows
          vGridGenerator.updateSelectionOnAllRows();
        }
      } else {

        //same row clicked again
        if (e.ctrlKey) {
          currentKeyKode = "ctrl";
        }

        //if ctrl button we want to remove selection
        if (currentKeyKode === "ctrl") {
          this.lastKeyKodeUsed = currentKeyKode;
          isSel = this.isSelected(currentRow);
          if (isSel === true) {
            this.deSelect(currentRow);
          }
          this.lastRowSelected = currentRow;
        } else {
          //else we just want to make it current..
          //isSel = this.isSelected(currentRow);
          this.select(currentRow);
        }
        //update selection on rows
        vGridGenerator.updateSelectionOnAllRows();
      }
    }
  }


}
