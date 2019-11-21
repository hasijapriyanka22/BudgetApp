//Implementing module pattern using IIFEs (for encapsulation)

//BUDGET CONTROLLER
var BudgetController = (function () {
    var Expenses = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Incomes = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0,
        }
    }

    return {
        addItem: function (type, des, val) {
            var newItem, ID;

            //Creating a new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type](data.allItems[type].length - 1).id + 1;
            } else { ID = 0; }
            if (type === 'inc') {
                newItem = new Incomes(ID, des, val);
            }
            else {
                newItem = new Expenses(ID, des, val);
            }

            //Adding it into our data structure
            data.allItems[type].push(newItem);

            //Return new element
            return newItem;
        },
    }

})();

//UI CONTROLLER
var UIController = (() => {

    const DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }

    return {

        //Getting input from UI
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value,
            }
        },

        //Getting ID, Classes of HTML elements
        getDOMstings: function () {
            return DOMstrings;
        },

        //Adding item to the UI
        addListItem: function (obj, type) {

            if (type === 'inc') {
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete" ><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div>'
            }
            else if (type === 'exp'){
                html = '<div class="item clearfix" id="expense-0"><div class="item__description">Apartment rent</div><div class="right clearfix"><div class="item__value">- 900.00</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

        }
    };
}) ();

//GLOBAL APP CONTROLLER
var Controller = ((BudgetCtrl, UICtrl) => {

    function setUpEventListners() {

        const DOM = UIController.getDOMstings();

        document.querySelector(DOM.inputBtn).addEventListener('click', () => ctrlAddItem());

        document.addEventListener('keypress', (event) => {
            if (event.keyCode == 13) {
                ctrlAddItem();
            }
        });

    }

    function ctrlAddItem() {

        var input, newItem;
        //Get input fields
        input = UICtrl.getInput();

        //Add item to the budget controller
        newItem = BudgetCtrl.addItem(input.type, input.description, input.value);

        //Add new item to the UI 
        UICtrl.addListItem(newItem, input.type);
    }

    return {
        init: function () {
            console.log('app is started');
            setUpEventListners();
        }
    }

})(BudgetController, UIController);

Controller.init();



