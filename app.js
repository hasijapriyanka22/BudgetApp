//Implementing module pattern using IIFEs (for encapsulation)

//BUDGET CONTROLLER
var BudgetController = (function () {
    var Expenses = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage  = -1;
    }

    Expenses.prototype.calcPercentages = function(totalIncome){
        if(totalIncome > 0){
            this.percentage = Math.round( (this.value/totalIncome) * 100);
        }
        else{
            this.percentage = -1;
        }
    }

    Expenses.prototype.getPercentage = function(){
        return this.percentage;
    }

    var Incomes = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    //Making it private so that no one can access our total income and expenses
    var calculateTotal = function (type) {
        var sum = 0;
        for (i of data.allItems[type]) {
            sum += i.value;
        }
        data.totals[type] = sum;
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0,
        },
        budget: 0,
        percentage: -1
    }

    return {
        addItem: function (type, des, val) {
            var newItem, ID;

            //Creating a new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
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

        deleteItem: function (type, id) {
            var index, ids;
            ids = data.allItems[type].map((current) => {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }

            console.log(data.allItems[type]);

        },

        calculateBudget: function () {

            var inc, exp;
            //Calculate the total income and expenses
            calculateTotal('inc');
            calculateTotal('exp');

            //calculate the budget
            data.budget = data.totals['inc'] - data.totals['exp'];

            //calculate percentage
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }
            else { data.percentage = -1; }
        },

        calculatePercentages: function(){
            data.allItems.exp.forEach((cur)=>{
                cur.calcPercentages(data.totals.inc);
            })
        },

        getPercentages: function(){
            var allPrec = data.allItems.exp.map((el)=>{
               return el.getPercentage();
            });

            return allPrec;
        },

        getBudget: function () {
            return {
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                budget: data.budget,
                percentage: data.percentage
            }
        }
    }

})();

//UI CONTROLLER
var UIController = (() => {

    const DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercentageLabel: '.item__percentage'
    }

    return {

        //Getting ID, Classes of HTML elements
        getDOMstrings: function () {
            return DOMstrings;
        },

        //Getting input from UI
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
            }
        },

        //Adding item to the UI
        addListItem: function (obj, type) {
            var html, newHtml, element;
            // Create HTML string with placeholder text

            if (type === 'inc') {
                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;

                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem: function (selectorID) { 

            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);

        },

        //Clearing the input fields
        clearFields: function () {

            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);
            for (i of fieldsArr) {
                i.value = '';
            }
            fieldsArr[0].focus();
        },

        //Display Budget
        displayBudget: function (obj) {
            document.querySelector(DOMstrings.budgetLabel).innerHTML = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).innerHTML = obj.totalInc;
            document.querySelector(DOMstrings.expenseLabel).innerHTML = obj.totalExp;
            if (obj.totalInc > 0) {
                document.querySelector(DOMstrings.percentageLabel).innerHTML = obj.percentage + '%';
            }
            else {
                document.querySelector(DOMstrings.percentageLabel).innerHTML = '---';
            }
        },

        //Display Percentages
        displayPercentages: function(obj){
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.expensesPercentageLabel);
            
            var nodeListForEach = (list, callback)=>{
                for(var i =0; i<list.length; i++){
                    callback(list[i],i);
                }
            }

            nodeListForEach(fields, (current , index)=>{
                if(obj[index]>0){
                current.textContent = obj[index] + '%';}
                else{
                    current.textContent = '---';
                }
            })
        }
    };

})();

//GLOBAL APP CONTROLLER
var Controller = ((BudgetCtrl, UICtrl) => {

    function setUpEventListners() {

        const DOM = UIController.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', (event) => {
            if (event.keyCode == 13) {
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputDescription).focus();

    }

    function updateBudget() {

        //Calculate the Budget 
        BudgetCtrl.calculateBudget();

        //get the calculated budget
        var budget = BudgetCtrl.getBudget();

        //Displaying data on the UI
        UICtrl.displayBudget(budget);

    }

    function updatePercentages(){

        //Calculate the percentages
        BudgetCtrl.calculatePercentages();

        //Get the Percentages
        var percentages = BudgetCtrl.getPercentages();

        //Displaying data on UI
        UICtrl.displayPercentages(percentages);
    }

    function ctrlAddItem() {

        var input, newItem;
        //Get input fields
        input = UICtrl.getInput();

        if (input.description != '' && !isNaN(input.value) && input.value > 0) {

            //Add item to the budget controller
            newItem = BudgetCtrl.addItem(input.type, input.description, input.value);

            //Add new item to the UI 
            UICtrl.addListItem(newItem, input.type);

            //Clearing input fields
            UICtrl.clearFields();

            //Update the Budget
            updateBudget();

            //Calculate and update the percentages
            updatePercentages();
        }

    }

    function ctrlDeleteItem(event) {
        var itemID, splitID, ID, type;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            //Delete Item from data structure
            BudgetCtrl.deleteItem(type, ID);

            //Delete item from UI
            UICtrl.deleteListItem(itemID);

            //Update the budget
            updateBudget();

            //Calculate and update the percentages
            updatePercentages();
        }


    }

    return {
        init: function () {
            console.log('app is started');
            setUpEventListners();
            UICtrl.displayBudget({
                totalInc: 0,
                totalExp: 0,
                budget: 0,
                percentage: -1,
            });
        }
    }

})(BudgetController, UIController);

Controller.init();



