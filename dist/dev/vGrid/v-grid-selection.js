"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var VGridSelection;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("VGridSelection", VGridSelection = function () {
        function VGridSelection(mode, vGrid) {
          _classCallCheck(this, VGridSelection);

          this.selectionMode = "none";
          this.lastRowSelected = -1;
          this.lastKeyKodeUsed = "none";
          this.selectedRows = 0;


          this.vGrid = vGrid;

          if (mode === false) {
            this.selectionMode = "single";
          }
          if (mode === true) {
            this.selectionMode = "multible";
          }

          this.selection = new Set([]);
        }

        VGridSelection.prototype.setMode = function setMode(mode) {
          this.selectionMode = "none";
          if (mode === false) {
            this.selectionMode = "single";
          }
          if (mode === true) {
            this.selectionMode = "multible";
          }
        };

        VGridSelection.prototype.isSelected = function isSelected(row) {
          var result = false;
          if (this.selectedRows > 0) {
            if (this.vGrid.vGridCollectionFiltered[row]) {
              result = this.selection.has(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
            }
          }
          return result;
        };

        VGridSelection.prototype.isSelectedMain = function isSelectedMain(row) {
          var result = false;
          if (this.selectedRows > 0) {
            if (this.vGrid.vGridCollection[row]) {
              result = this.selection.has(this.vGrid.vGridCollection[row][this.vGrid.vGridRowKey]);
            }
          }
          return result;
        };

        VGridSelection.prototype.deSelect = function deSelect(row) {
          if (this.vGrid.vGridCollectionFiltered[row]) {
            this.selection.delete(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
          }
          this.selectedRows = this.selection.size;
        };

        VGridSelection.prototype.deSelectMain = function deSelectMain(row) {
          if (this.vGrid.vGridCollection[row]) {
            this.selection.delete(this.vGrid.vGridCollection[row][this.vGrid.vGridRowKey]);
          }
          this.selectedRows = this.selection.size;
        };

        VGridSelection.prototype.select = function select(row, addToSelection) {
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
            case "multible":
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
        };

        VGridSelection.prototype.selectMain = function selectMain(row, addToSelection) {
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
            case "multible":
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
        };

        VGridSelection.prototype.selectRange = function selectRange(start, end) {
          if (this.selectionMode === "multible") {
            this.selection.clear();
            for (var i = start; i < end + 1; i++) {
              this.selection.add(this.vGrid.vGridCollectionFiltered[i][this.vGrid.vGridRowKey]);
            }
            this.selectedRows = this.selection.size;
          }
        };

        VGridSelection.prototype.selectAll = function selectAll() {
          if (this.selectionMode === "multible") {
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
        };

        VGridSelection.prototype.deSelectAll = function deSelectAll() {
          for (var i = 0; i < this.vGrid.vGridCollectionFiltered.length; i++) {
            this.selection.delete(this.vGrid.vGridCollectionFiltered[i][this.vGrid.vGridRowKey]);
          }
          this.selectedRows = this.selection.size;
        };

        VGridSelection.prototype.selectRangeMain = function selectRangeMain(start, end) {
          if (this.selectionMode === "multible") {
            this.selection.clear();
            for (var i = start; i < end + 1; i++) {
              this.selection.add(this.vGrid.vGridCollection[i][this.vGrid.vGridRowKey]);
            }
            this.selectedRows = this.selection.size;
          }
        };

        VGridSelection.prototype.reset = function reset() {
          if (this.selectedRows > 0) {
            this.selection.clear();
          }
          this.lastRowSelected = -1;
          this.lastKeyKodeUsed = "none";
          this.selectedRows = this.selection.size;
        };

        VGridSelection.prototype.getSelectedRows = function getSelectedRows() {
          var _this = this;

          var array = [];
          if (this.selectedRows > 0) {
            this.vGrid.vGridCollectionFiltered.forEach(function (x, index) {
              if (_this.selection.has(x[_this.vGrid.vGridRowKey]) === true) {
                array.push(index);
              }
            });
          }
          return array;
        };

        VGridSelection.prototype.getSelectedRowsMain = function getSelectedRowsMain() {
          var _this2 = this;

          var array = [];
          if (this.selectedRows > 0) {
            this.vGrid.vGridCollection.forEach(function (x, index) {
              if (_this2.selection.has(x[_this2.vGrid.vGridRowKey]) === true) {
                array.push(index);
              }
            });
          }
          return array;
        };

        VGridSelection.prototype.setSelectedRows = function setSelectedRows(newRows) {
          if (this.selectedRows > 0) {
            this.selection.clear();
          }
          for (var i = 0; i < newRows.length; i++) {
            this.selection.add(this.vGrid.vGridCollectionFiltered[newRows[i]][this.vGrid.vGridRowKey]);
          }
          this.selectedRows = this.selection.size;
        };

        VGridSelection.prototype.setSelectedRowsMain = function setSelectedRowsMain(newRows) {
          if (this.selectedRows > 0) {
            this.selection.clear();
          }
          for (var i = 0; i < newRows.length; i++) {
            this.selection.add(this.vGrid.vGridCollection[newRows[i]][this.vGrid.vGridRowKey]);
          }
          this.selectedRows = this.selection.size;
        };

        VGridSelection.prototype.setHightlight = function setHightlight(e, currentRow, vGridGenerator) {

          var isSel;
          var manualSel = this.vGrid.vGridConfig.attManualSelection;
          if (!manualSel) {
            var currentselectedRows = this.getSelectedRows();

            if (currentRow !== this.lastRowSelected || currentselectedRows[0] !== currentRow) {

              if (currentRow <= vGridGenerator.vGridConfig.getCollectionLength() - 1) {

                if (this.selectionMode === "multible") {

                  var currentKeyKode = "";

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

                vGridGenerator.updateSelectionOnAllRows();
              }
            } else {
              if (e.ctrlKey) {
                currentKeyKode = "ctrl";
              }

              if (currentKeyKode === "ctrl") {
                this.lastKeyKodeUsed = currentKeyKode;
                isSel = this.isSelected(currentRow);
                if (isSel === true) {
                  this.deSelect(currentRow);
                }
                this.lastRowSelected = currentRow;
              } else {
                isSel = this.isSelected(currentRow);
                this.select(currentRow);
              }

              vGridGenerator.updateSelectionOnAllRows();
            }
          }
        };

        return VGridSelection;
      }());

      _export("VGridSelection", VGridSelection);
    }
  };
});
//# sourceMappingURL=../dist/dev/vGrid/v-grid-selection.js.map