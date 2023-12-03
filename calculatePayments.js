const employeeData = {
    1079 : {
        id: 1079,
        name: "Bob",
        age: 29,
        gender: "male",
        race: "Native Hawaiian",
        dateOfBirth: "Feb 14th, 1994",
        hourlyRate: 45,
        type: "Laborer"
    },
    4020 : {
        id: 4020,
        name: "Sir William Wallace",
        age: 753,
        gender: "male",
        race: "Scottish",
        dateOfBirth: "Dec 12th, 1270",
        hourlyRate: 50,
        type: "Foreman"
    },
    123 : {
        id: 123,
        name: "Thomas Shelby",
        age: 133,
        gender: "male",
        race: "Irish",
        dateOfBirth: "June 6th, 1890",
        hourlyRate: 80,
        type: "Superintindent"
    },
    8759 : {
        id: 8759,
        name: "Ragnar Lothbrok",
        age: 1268,
        gender: "male",
        race: "Danish",
        dateOfBirth: "August 30th, 755",
        hourlyRate: 30,
        type: "Laborer"
    }

}

const payrollExport = [{id: 8759, hours: 50}, {id: 4020, hours: 55}, {id: 1079, hours: 45}, {id: 123, hours: 52}]

class PaymentCalculator {
    constructor(payrollExport, employeeData, id) {
        this.payrollExport = payrollExport
        this.employeeData = employeeData
        this.id = employeeData[id].id
        this.type = employeeData[id].type
        this.name = employeeData[id].name
        this.hourlyRate = employeeData[id].hourlyRate
        this.hoursWorked = this.getHoursWorked()
    }

    calculateEmployeePayment() {
            if (this.type === "Laborer") {
                return new CalculateLaborerPay(this.payrollExport, this.employeeData, this.id).calculateLaborerPay(this.hoursWorked)
            } else if (this.type === "Foreman") {
                return new CalculateForemanPay(this.payrollExport, this.employeeData, this.id).calculateForemanPay(this.hoursWorked)
            } else if (this.type === "Superintindent") {
                return new CalculateSuperPay(this.payrollExport, this.employeeData, this.id).calculateSuperPay(this.hoursWorked)
            } else {
                return {SUCCESS: false, ERROR: `Employee: ${this.name} Id: ${this.id}, does not have a valid type. Please resolve before proceeding with payroll`}
            }
    }

    getHoursWorked() {
        let hoursWorked = 0

        for (let i = 0; i < this.payrollExport.length; i++) {
            if (this.payrollExport[i].id === this.id) {
                hoursWorked = this.payrollExport[i].hours
            }
        }

        return hoursWorked
    }
}

class CalculateLaborerPay extends PaymentCalculator {
    constructor(payrollExport, employeeData, name, type, hourlyRate) {
        super(payrollExport, employeeData, name, type, hourlyRate)
    }

    calculateLaborerPay(hoursWorked) {
        let totalPay = this.hourlyRate * hoursWorked

        if (hoursWorked > 10) {
            totalPay += hoursWorked * 1 + 20
        }
        
        return {hours: hoursWorked, name: this.name, type: this.type, pay: totalPay}
    }
}

class CalculateForemanPay extends PaymentCalculator {
    constructor(payrollExport, employeeData, id, name, hourlyRate) {
        super(payrollExport, employeeData, id, name, hourlyRate)
    }

    calculateForemanPay(hoursWorked) {
        let totalPay = this.hourlyRate * hoursWorked

        if (hoursWorked > 15) {
            totalPay += this.hourlyRate * .05 * hoursWorked
        }

        return {hours: hoursWorked, name: this.name, type: this.type, pay: totalPay}
    }
}

class CalculateSuperPay extends PaymentCalculator {
    constructor(payrollExport, employeeData, id, name, hourlyRate) {
        super(payrollExport, employeeData, id, name, hourlyRate)
    }

    calculateSuperPay(hoursWorked) {
        let totalPay = this.hourlyRate * hoursWorked

        if (this.hoursWorked > 20) {
            totalPay += 50
        }

        return {hours: hoursWorked, name: this.name, type: this.type, pay: totalPay}
    }
}

const bobPay = new PaymentCalculator(payrollExport, employeeData, 1079).calculateEmployeePayment()
const williamPay = new PaymentCalculator(payrollExport, employeeData, 4020).calculateEmployeePayment()
const thomasPay = new PaymentCalculator(payrollExport, employeeData, 123).calculateEmployeePayment()
const ragnarPay = new PaymentCalculator(payrollExport, employeeData, 8759).calculateEmployeePayment()
console.log(bobPay)
console.log(williamPay)
console.log(thomasPay)
console.log(ragnarPay)