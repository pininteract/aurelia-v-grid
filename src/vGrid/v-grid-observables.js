/*****************************************************************************************************************
 *    VGridObservables
 *    Observers the vGridCollection/current entity for changes
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
export class VGridObservables {


  constructor(vGrid, bindingEngine) {
    this.bindingEngine = bindingEngine;
    this.vGrid = vGrid;
    this.subscriptionsAttributes = []; //here I keep subscriptions to observer on attributes
    this.collectionSubscription = null; //here I keep subscriptions to observer on collection
    this.subscriptionsArray = []; //my property subscriptions
  }


  /***************************************************************************************
   * observer vGridCollection, when entire vGridCollection gets replaced
   ***************************************************************************************/
  enableObservablesCollection() {

    let collectionSubscription = (x, y) => {

      //disable array observer
      this.disableObservablesArray();

      //clone array
      //key will be set in both collection and internal since with slice we get a refrence
      this.vGrid.vGridCollectionFiltered = this.vGrid.vGridCollection.slice(0);
      this.vGrid.checkKeys();


      //reset filter/and collection/selection. (should I have option to check is they want to set something?)
      this.vGrid.vGridCurrentRow = -1;

      this.vGrid.vGridSort.reset();
      if(!this.vGrid.vGridConfig.keepFilterOnCollectionChange){
        //clear sort icons //todo improve with event
        this.vGrid.vGridSort.reset();
        this.vGrid.vGridGenerator.rebuildGridHeaderHtmlAndViewSlot();

        this.vGrid.vGridSelection.reset();
        this.vGrid.vGridConfig.keepFilterOnCollectionChange = false;
      }
      this.vGrid.vGridGenerator.collectionChange();

      //reset
      this.vGrid.vGridCurrentEntityRef = null;
      for (var k in this.vGrid.vGridCurrentEntity) {
        if (this.vGrid.vGridCurrentEntity.hasOwnProperty(k)) {
          this.vGrid.vGridCurrentEntity[k] = undefined;
        }
      }


      //set array observer
      this.enableObservablesArray();



    };
    this.vGrid.__observers__.vGridCollection.subscribe(this.vGrid,collectionSubscription);
    this.collectioncallable = collectionSubscription;

    this.collectionSubscription = this.vGrid.__observers__.vGridCollection;

  }


  /***************************************************************************************
   * enable attributes observables, like vGridCollection.push/pop/slice, etc etc
   ***************************************************************************************/
  enableObservablesArray() {

    let arrayObserver = this.bindingEngine.collectionObserver(this.vGrid.vGridCollection).subscribe((arrayObserverChanges) => {

      var colFiltered = this.vGrid.vGridCollectionFiltered;
      var col = this.vGrid.vGridCollection;
      var grid = this.vGrid.vGridGenerator;


      var curKey = -1;
      if (this.vGrid.vGridCurrentEntityRef) {
        curKey = this.vGrid.vGridCurrentEntityRef[this.vGrid.vGridRowKey];
      }
      var curEntityValid = true;


      if (arrayObserverChanges.length > 0) {

        var added = false;
        var toRemove = [];

        //loop arrayObserverChanges
        arrayObserverChanges.forEach((observerChange)=> {

          //if anyone is added, then lets add them
          if (observerChange.addedCount > 0) {
            for (var i = 0; i < observerChange.addedCount; i++) {
              colFiltered.push(col[observerChange.index + i]);
              this.vGrid.checkKey(col[observerChange.index + i]);
            }
          }

          //if anyone is removed, then lets remove them from our filtered collection
          if (observerChange.removed.length > 0) {
            //push into removed array
            observerChange.removed.forEach((x) => {
              if (x[this.vGrid.vGridRowKey] === curKey) {
                curEntityValid = false;
              }

              var rowToRemove = -1;
              colFiltered.forEach((row, index) => {
                if (row[this.vGrid.vGridRowKey] === x[this.vGrid.vGridRowKey]) {
                  rowToRemove = index;
                }
              });
              if (rowToRemove !== -1) {
                colFiltered.splice(rowToRemove, 1);
              }
            });
          }
        });


        var newRowNo = -1;

        //check current entity, remove if removed, or get key/row
        if (!curEntityValid) {

          //no current entity, lets remove the result and null out ref/row
          for (var k in this.vGrid.vGridCurrentEntity) {
            if (this.vGrid.vGridCurrentEntity.hasOwnProperty(k)) {
              this.vGrid.vGridCurrentEntity[k] = undefined;
            }
          }
          this.vGrid.vGridCurrentEntityRef = null;
          this.vGrid.vGridCurrentRow = -1;

        } else {

          //if there is a current entity, then we need to find the row of the key
          if (curKey !== -1) {
            this.vGrid.vGridCollectionFiltered.forEach((x, index) => {
              if (curKey === x[this.vGrid.vGridRowKey]) {
                this.vGrid.vGridCurrentRow = index;
              }
            });
          }

        }//end if (!curEntityValid)


        //update grid
        grid.collectionChange(false);


      }


    });
    this.subscriptionsArray = arrayObserver
  }


  /***************************************************************************************
   * enable attributes abservables, ->vGridCollection.name etc
   ***************************************************************************************/
  enableObservablesAttributes() {
    this.vGrid.vGridConfig.attAttributeObserve.forEach((property) => {
      let propertyObserver = this.bindingEngine.propertyObserver(this.vGrid.vGridCurrentEntity, property).subscribe((newValue, oldValue) => {

        //should I do the value formatting on the currentEntity also?
        var newValueCheck = (newValue !== undefined && newValue !== null) ? newValue.toString() : newValue;
        var oldValueCheck = (oldValue !== undefined && oldValue !== null) ? oldValue.toString() : oldValue;

        if (newValueCheck !== oldValueCheck && this.vGrid.vGridCurrentEntityRef) {
              this.vGrid.vGridCurrentEntityRef[property] = newValue;
              this.vGrid.vGridGenerator.rebindRowNumber(this.vGrid.vGridCurrentRow);
        }
      });
      this.subscriptionsAttributes.push(propertyObserver)
    });
  }


  /***************************************************************************************
   *  disable vGridCollection observables
   ***************************************************************************************/
  disableObservablesCollection() {
    this.collectionSubscription.unsubscribe(this.vGrid, this.collectioncallable);
    //this.collectionSubscription = null;
  }


  /***************************************************************************************
   * disable the array observables
   ***************************************************************************************/
  disableObservablesArray() {
    this.subscriptionsArray.dispose();
    this.subscriptionsArray = null;
  }


  /***************************************************************************************
   * disable the attibutes observables
   ***************************************************************************************/
  disableObservablesAttributes() {
    for (var i = 0; i < this.subscriptionsAttributes.length; i++) {
      try {
        this.subscriptionsAttributes[i].dispose()
      } catch (e) {
      }
    }
    this.subscriptionsAttributes = [];
  }


}
