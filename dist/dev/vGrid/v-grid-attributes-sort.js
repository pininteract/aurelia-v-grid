'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

  var inject, customAttribute, VGrid, _dec, _dec2, _class, vGridAttributesSort;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      customAttribute = _aureliaFramework.customAttribute;
    }, function (_vGrid) {
      VGrid = _vGrid.VGrid;
    }],
    execute: function () {
      _export('vGridAttributesSort', vGridAttributesSort = (_dec = customAttribute('v-sort'), _dec2 = inject(Element, VGrid), _dec(_class = _dec2(_class = function () {
        function vGridAttributesSort(element, vGrid) {
          _classCallCheck(this, vGridAttributesSort);

          this.vGrid = vGrid;
          this.element = element;
        }

        vGridAttributesSort.prototype.bind = function bind(bindingContext, overrideContext) {
          this.bindingContext = bindingContext;
          this.overrideContext = overrideContext;

          var values = this.value.split("|");
          this.attribute = values[0];
        };

        vGridAttributesSort.prototype.attached = function attached() {
          var _this = this;

          this.sortIcon = document.createElement("SPAN");
          this.sortIcon.innerHTML = this.getSortIconMarkup(this.attribute);
          this.element.appendChild(this.sortIcon);
          this.element.onclick = function (e) {
            _this.vGrid.vGridConfig.onOrderBy(_this.attribute, e.shiftKey);
          };

          this.vGrid.element.addEventListener("sortIconUpdate", function () {
            _this.sortIcon.innerHTML = _this.getSortIconMarkup(_this.attribute);
          });
        };

        vGridAttributesSort.prototype.getSortIconMarkup = function getSortIconMarkup(attribute) {
          var _this2 = this;

          var css = this.vGrid.vGridConfig.css;

          var markup = '<span  class="' + css.sortIcon + ' ' + css.sortIconSort + '"></span>';
          var isAscHtml = '<span  class="' + css.sortIcon + ' ' + css.sortIconAsc + '"></span>';
          var isDescHtml = '<span  class="' + css.sortIcon + ' ' + css.sortIconDesc + '"></span>';

          this.vGrid.vGridSort.getFilter().forEach(function (x) {
            if (x.attribute === _this2.attribute) {
              var block = x.asc === true ? isAscHtml : isDescHtml;
              var main = '<span $ class="' + css.sortIconNo + '" data-vgridsort="' + x.no + '"></span>';
              markup = main + block;
            }
          });

          return markup;
        };

        return vGridAttributesSort;
      }()) || _class) || _class));

      _export('vGridAttributesSort', vGridAttributesSort);
    }
  };
});
//# sourceMappingURL=../dist/dev/vGrid/v-grid-attributes-sort.js.map
