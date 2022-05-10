class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clearAll()
    }
    addNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = String(this.currentOperand + number)
    }
    deleteNumber(){

    }
    clearAll(){
        this.operation = null
        this.currentOperand = ''
        this.previousOperand = ''
    }
    whichOperation(operation){
        if (this.currentOperand === '') return // if empty then nothing, solving double click bug on sign +

        if (this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute(){
        let computation // our result
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current; break
            case '-':
                computation = prev - current; break
            case '*':
                computation = prev * current; break
            case '÷':
                computation = prev / current; break
            case '%':
                computation = prev * ((current / prev )* 100); break // bug here
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerHTML = this.previousOperand
    }
}

const buttonsOfNumbers = document.querySelectorAll('[data-number]')
const buttonsOfOperation = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear-all]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

buttonsOfNumbers.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.addNumber(btn.innerHTML)

        console.log(btn.innerText)

        calculator.updateDisplay()
    })
})

buttonsOfOperation.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.whichOperation(btn.innerText)
        console.log(btn.innerText)
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

