class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clearAll()
    }
    addNumber(number){
        if (number === '.' && this.currentOperand.includes('.') || this.currentOperand.length > 7) return
        this.currentOperand = String((this.currentOperand + number))
    }
    deleteCurrentNumber(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    clearAll(){
        this.operation = null
        this.currentOperand = ''
        this.previousOperand = ''
    }
    whichOperation(operation){

        if (this.currentOperand === '') return // if empty then nothing, solving double click bug on sign +

        if (this.previousOperand !== ''){
            if (operation !== '%'){
                this.compute()
            }
            else if(operation === '%') {
                console.log('percentage!')
                this.prevOperation = this.operation
                this.operation = '%'
                this.compute()
                return;
            }
        }

        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    countPercentage(operator, current, prev) { // witch presentage
            switch (operator) {
                case '-':
                    if (String(prev).length < 2){
                        return current - (current * `0.0${prev}`)
                    }
                    return current - (current * `0.${prev}`); break;
                case '+':
                    if (String(prev).length < 2){
                        return current + (current * `0.0${prev}`)
                    }
                    return current + (current * `0.${prev}`); break;
                case '÷':
                    if (String(prev).length < 2){
                        return current * (current / `0.0${prev}` / current)
                    }
                    console.log('2')
                    return current * (1 / `0.${prev}`); break;
                case '*':
                    if (String(prev).length < 2){
                        return current * (current * `0.0${prev}` / current)
                    }
                    return current * (current * `0.${prev}`) / current; break;
            }
    }
    compute(){
        let computation // our result
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        // our percentage prev operation
        console.log(this.operation)

        if (this.operation === '%'){
            console.log('win')
            // computation = 1000

            computation = this.countPercentage(this.prevOperation,prev,current);
            this.currentOperand = computation
            this.operation = undefined
            this.previousOperand = ''
            return
        }

        if (isNaN(prev) || isNaN(current)) return

        switch (this.operation) {
            case '+':
                computation = Number((prev + current).toFixed(2)); break
            case '-':
                computation = Number((prev - current).toFixed(2)); break
            case '*':
                computation = Number((prev * current).toFixed(2)); break
            case '÷':
                computation = Number((prev / current).toFixed(7)); break
            default:
                return
        }
        let checkIsEverythingGood = String(computation).replace(/[.]/gi,'')
        if (checkIsEverythingGood.length > 8 ){
            this.currentOperand = 'Error'

            return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand
        if (this.operation != null){
                this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        }
        else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

const timer = document.querySelector('#timer').innerHTML = Math.floor(new Date().getHours()) + ':' + ('0' + Math.floor(new Date().getMinutes())).slice(-2)
const buttonsOfNumbers = document.querySelectorAll('[data-number]')
const buttonsOfOperation = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear-all]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)


setInterval(() => {
    timer.innerHTML =  Math.floor(new Date().getHours()) + ':' + ('0' + Math.floor(new Date().getMinutes()))
},60000)
buttonsOfNumbers.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.addNumber(btn.innerHTML)
        calculator.updateDisplay()
    })
})

buttonsOfOperation.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.whichOperation(btn.innerText)
        calculator.updateDisplay()
    })
})

clearButton.addEventListener('click', () => {
    calculator.clearAll()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click', btn => {
    calculator.compute()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',() => {
    if (currentOperandTextElement.innerHTML === 'Error'){
        calculator.currentOperand = ''
        calculator.updateDisplay()
        return
    }
    calculator.deleteCurrentNumber()
    calculator.updateDisplay()
})