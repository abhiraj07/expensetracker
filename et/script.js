
        let totalIncome = 0;
        let totalExpenses = 0;
        let yourBalance = 0;
        let previousData = null;
        const historyList = document.getElementById('history-list');
        const totalIncomeDisplay = document.getElementById('total-income');
        const totalExpensesDisplay = document.getElementById('total-expenses');
        const yourBalanceDisplay = document.getElementById('your-balance');

        // Load data from localStorage on page load
        window.onload = function() {
            if (localStorage.getItem('expenseTrackerData')) {
                const data = JSON.parse(localStorage.getItem('expenseTrackerData'));
                totalIncome = data.totalIncome;
                totalExpenses = data.totalExpenses;
                yourBalance = data.yourBalance;

                totalIncomeDisplay.textContent = totalIncome;
                totalExpensesDisplay.textContent = totalExpenses;
                yourBalanceDisplay.textContent = yourBalance;

                // Load history items
                if (data.history && data.history.length > 0) {
                    data.history.forEach(item => {
                        const listItem = document.createElement('li');
                        listItem.textContent = `${item.date} - ${item.description}: ${item.amount < 0 ? '-' : '+'}${Math.abs(item.amount)}`;
                        listItem.classList.add(item.type === 'income' ? 'income' : 'expense');
                        historyList.appendChild(listItem);
                    });
                }

                // Store previous data for "Get Back" functionality
                previousData = data;
            }
        };

        function addTransaction() {
            const description = document.getElementById('description').value;
            const amount = parseFloat(document.getElementById('amount').value);
            const transactionType = document.getElementById('transaction-type').value;
            const date = new Date().toLocaleString();
            
            if (!description || isNaN(amount)) {
                alert('Please enter a valid description and amount');
                return;
            }

            const transactionItem = document.createElement('li');
            transactionItem.textContent = `${date} - ${description}: ${amount < 0 ? '-' : '+'}${Math.abs(amount)}`;
            transactionItem.classList.add(transactionType === 'income' ? 'income' : 'expense');
            historyList.appendChild(transactionItem);

            if (transactionType === 'income') {
                totalIncome += amount;
                totalIncomeDisplay.textContent = totalIncome;
            } else {
                totalExpenses += amount;
                totalExpensesDisplay.textContent = totalExpenses;
            }

            yourBalance = totalIncome - totalExpenses;
            yourBalanceDisplay.textContent = yourBalance;

            // Save data to localStorage
            saveDataToLocalStorage();
            
            document.getElementById('description').value = '';
            document.getElementById('amount').value = '';
        }

        function toggleHistory() {
            const historyList = document.getElementById('history-list');
            if (historyList.style.display === 'block') {
                historyList.style.display = 'none';
            } else {
                historyList.style.display = 'block';
            }
        }

        window.onclick = function(event) {
            const historyList = document.getElementById('history-list');
            const historyHeading = document.querySelector('.history h2');
            if (event.target !== historyHeading && historyList.style.display === 'block') {
                historyList.style.display = 'none';
            }
        }

        function clearData() {
            previousData = {
                totalIncome,
                totalExpenses,
                yourBalance,
                history: []
            };
            localStorage.removeItem('expenseTrackerData');
            totalIncome = 0;
            totalExpenses = 0;
            yourBalance = 0;
            totalIncomeDisplay.textContent = totalIncome;
            totalExpensesDisplay.textContent = totalExpenses;
            yourBalanceDisplay.textContent = yourBalance;
            historyList.innerHTML = ''; // Clear history list
        }

        function getBackData() {
            if (previousData) {
                totalIncome = previousData.totalIncome;
                totalExpenses = previousData.totalExpenses;
                yourBalance = previousData.yourBalance;

                totalIncomeDisplay.textContent = totalIncome;
                totalExpensesDisplay.textContent = totalExpenses;
                yourBalanceDisplay.textContent = yourBalance;

                historyList.innerHTML = ''; // Clear history list

                if (previousData.history && previousData.history.length > 0) {
                    previousData.history.forEach(item => {
                        const listItem = document.createElement('li');
                        listItem.textContent = `${item.date} - ${item.description}: ${item.amount < 0 ? '-' : '+'}${Math.abs(item.amount)}`;
                        listItem.classList.add(item.type === 'income' ? 'income' : 'expense');
                        historyList.appendChild(listItem);
                    });
                }

                // Save current data to localStorage
                saveDataToLocalStorage();
            }
        }

        function saveDataToLocalStorage() {
            const data = {
                totalIncome,
                totalExpenses,
                yourBalance,
                history: []
            };

            const historyItems = document.querySelectorAll('.history ul li');
            for (let item of historyItems) {
                const itemText = item.textContent;
                const amountIndex = itemText.indexOf(':');
                const description = itemText.substring(itemText.indexOf('-') + 2, amountIndex).trim();
                const amount = parseFloat(itemText.substring(amountIndex + 1));
                const type = item.classList.contains('income') ? 'income' : 'expense';
                const date = itemText.substring(0, itemText.indexOf('-') - 1).trim();
                data.history.push({ description, amount, type, date });
            }

            localStorage.setItem('expenseTrackerData', JSON.stringify(data));
        }
