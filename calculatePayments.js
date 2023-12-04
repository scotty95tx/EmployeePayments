
class PaymentCalculator {
    constructor() {
    }

    calculateEmployeePayment(id, employeeData, payrollExport) {
            this.type = employeeData[id].type
            if (this.type === "Laborer") {
                return new CalculateLaborerPay(id, employeeData, payrollExport).calculateLaborerPay()
            } else if (this.type === "Foreman") {
                return new CalculateForemanPay(id, employeeData, payrollExport).calculateForemanPay()
            } else if (this.type === "Superintindent") {
                return new CalculateSuperPay(id, employeeData, payrollExport).calculateSuperPay()
            } else {
                return {SUCCESS: false, ERROR: `Employee does not have a valid type. Please resolve before proceeding with payroll`}
            }
    }

    getHoursWorked(payrollExport) {
        for (let i = 0; i < payrollExport.length; i++) {
            if (payrollExport[i].id === this.id) {
                this.hoursWorked = payrollExport[i].hours
            }
        }
    }

    getUpdatedEmployeeInfo(id, employeeData) {
        this.employeeData = employeeData
        this.id = employeeData[id].id
        this.name = employeeData[id].name
        this.hourlyRate = employeeData[id].hourlyRate
        this.type = employeeData[id].type
    }
}

class CalculateLaborerPay extends PaymentCalculator {
    constructor(id, employeeData, payrollExport) {
        super()
        super.getUpdatedEmployeeInfo(id, employeeData)
        super.getHoursWorked(payrollExport)
    }


    calculateLaborerPay() {
        this.totalPay = this.hourlyRate * this.hoursWorked
        if (this.hoursWorked > 10) {
            this.totalPay += this.hoursWorked * 1 + 20
        }
        
        return {SUCCESS: true, ERROR: 'none', hours: this.hoursWorked, name: this.name, type: this.type, pay: this.totalPay}
    }
}

class CalculateForemanPay extends PaymentCalculator {
    constructor(id, employeeData, payrollExport) {
        super()
        super.getUpdatedEmployeeInfo(id, employeeData)
        super.getHoursWorked(payrollExport)
    }

    calculateForemanPay() {
        this.totalPay = this.hourlyRate * this.hoursWorked

        if (this.hoursWorked > 15) {
            this.totalPay += this.hourlyRate * .05 * this.hoursWorked
        }

        return {SUCCESS: true, ERROR: 'none', hours: this.hoursWorked, name: this.name, type: this.type, pay: this.totalPay}
    }
}

class CalculateSuperPay extends PaymentCalculator {
    constructor(id, employeeData, payrollExport) {
        super()
        super.getUpdatedEmployeeInfo(id, employeeData)
        super.getHoursWorked(payrollExport)
    }

    calculateSuperPay() {
        this.totalPay = this.hourlyRate * this.hoursWorked

        if (this.hoursWorked > 20) {
            this.totalPay += 50
        }

        return {SUCCESS: true, ERROR: 'none', hours: this.hoursWorked, name: this.name, type: this.type, pay: this.totalPay}
    }
}

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

console.log(new PaymentCalculator().calculateEmployeePayment(1079, employeeData, payrollExport))
console.log(new PaymentCalculator().calculateEmployeePayment(4020, employeeData, payrollExport))
console.log(new PaymentCalculator().calculateEmployeePayment(123, employeeData, payrollExport))
console.log(new PaymentCalculator().calculateEmployeePayment(8759, employeeData, payrollExport))