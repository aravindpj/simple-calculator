const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

class Calculator{
    constructor(previousOperandEl,currentOperandTextEl){
        this.previousOperandTextElement=previousOperandEl
        this.currentOperandTextElement=currentOperandTextEl
        this.clear()
    }
    clear(){
        this.currentOpr=""
        this.previousOpr=""
        this.operation=undefined
    }
    chooseOperation(operation){
        if(this.currentOpr == "") return
        if(this.previousOpr !== ""){
            this.compute()
        }
        this.operation=operation
        this.previousOpr=this.currentOpr
        this.currentOpr=""
    }
    appendNumber(number){
        if(number==='.' && this.currentOpr.includes('.')) return
        this.currentOpr=this.currentOpr.toString() + number.toString()
    }
    
    delete(){
        this.currentOpr=this.currentOpr.toString().slice(0,-1)
    }

    compute(){
       let result;
       switch (this.operation) {
        case "+":
            result = Number(this.previousOpr) + Number(this.currentOpr) 
            break;
        case "-":
            result = Number(this.previousOpr) - Number(this.currentOpr) 
            break;
        case "*":
            result = Number(this.previousOpr) * Number(this.currentOpr) 
            break;
        case "÷":
            result = Number(this.previousOpr) / Number(this.currentOpr) 
            break;      
        default:
            break;
       }
       this.currentOpr=result.toString()
       this.previousOpr=""
       this.operation=undefined
    }
   
    updateDisplay(){
        this.currentOperandTextElement.innerText=this.currentOpr
        if(this.previousOpr !== ""){
            this.previousOperandTextElement.innerText=`${this.previousOpr} ${this.operation}`
        }else{
            this.previousOperandTextElement.innerText=""
        }
         
    }

}

let calc = new Calculator(previousOperandTextElement,currentOperandTextElement)

numberButtons.forEach(btn=>{
    btn.addEventListener('click',function(){
        calc.appendNumber(btn.innerText)
        calc.updateDisplay()
    })
})

operationButtons.forEach(btn=>{
    btn.addEventListener('click',function(){
        calc.chooseOperation(btn.innerText)
        calc.updateDisplay()
    })
})

equalsButton.addEventListener('click',function(){
    calc.compute()
    calc.updateDisplay()
})

allClearButton.addEventListener('click',function(){
    calc.clear()
    calc.updateDisplay()
})

deleteButton.addEventListener('click',function(){
    calc.delete()
    calc.updateDisplay()
})