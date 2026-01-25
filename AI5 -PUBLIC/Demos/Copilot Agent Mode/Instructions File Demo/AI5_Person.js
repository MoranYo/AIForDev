/**
 * AI5 Person Class
 * A comprehensive Person class with data members and methods
 */

class AI5_Person {
    /**
     * Constructor for AI5_Person
     * @param {string} firstName - Person's first name
     * @param {string} lastName - Person's last name
     * @param {number} age - Person's age
     * @param {string} email - Person's email address
     * @param {string} phoneNumber - Person's phone number
     */
    constructor(firstName, lastName, age, email, phoneNumber) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._age = age;
        this._email = email;
        this._phoneNumber = phoneNumber;
        this._address = '';
        this._occupation = '';
        this._dateOfBirth = null;
        this._isActive = true;
        this._createdDate = new Date();
    }

    // Getter methods
    AI5_getFirstName() {
        return this._firstName;
    }

    AI5_getLastName() {
        return this._lastName;
    }

    AI5_getAge() {
        return this._age;
    }

    AI5_getEmail() {
        return this._email;
    }

    AI5_getPhoneNumber() {
        return this._phoneNumber;
    }

    AI5_getAddress() {
        return this._address;
    }

    AI5_getOccupation() {
        return this._occupation;
    }

    AI5_getDateOfBirth() {
        return this._dateOfBirth;
    }

    AI5_getIsActive() {
        return this._isActive;
    }

    AI5_getCreatedDate() {
        return this._createdDate;
    }

    // Setter methods
    AI5_setFirstName(firstName) {
        if (typeof firstName !== 'string' || firstName.trim() === '') {
            throw new Error('First name must be a non-empty string');
        }
        this._firstName = firstName.trim();
    }

    AI5_setLastName(lastName) {
        if (typeof lastName !== 'string' || lastName.trim() === '') {
            throw new Error('Last name must be a non-empty string');
        }
        this._lastName = lastName.trim();
    }

    AI5_setAge(age) {
        if (typeof age !== 'number' || age < 0 || age > 150) {
            throw new Error('Age must be a number between 0 and 150');
        }
        this._age = age;
    }

    AI5_setEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }
        this._email = email.toLowerCase();
    }

    AI5_setPhoneNumber(phoneNumber) {
        if (typeof phoneNumber !== 'string' || phoneNumber.trim() === '') {
            throw new Error('Phone number must be a non-empty string');
        }
        this._phoneNumber = phoneNumber.trim();
    }

    AI5_setAddress(address) {
        this._address = address;
    }

    AI5_setOccupation(occupation) {
        this._occupation = occupation;
    }

    AI5_setDateOfBirth(dateOfBirth) {
        if (dateOfBirth instanceof Date) {
            this._dateOfBirth = dateOfBirth;
            // Automatically calculate age from date of birth
            this._age = this.AI5_calculateAgeFromBirthDate(dateOfBirth);
        } else {
            throw new Error('Date of birth must be a Date object');
        }
    }

    AI5_setIsActive(isActive) {
        this._isActive = Boolean(isActive);
    }

    // Utility methods
    AI5_getFullName() {
        return `${this._firstName} ${this._lastName}`;
    }

    AI5_calculateAgeFromBirthDate(birthDate) {
        if (!(birthDate instanceof Date)) {
            throw new Error('Birth date must be a Date object');
        }
        
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    }

    AI5_getDisplayInfo() {
        return {
            fullName: this.AI5_getFullName(),
            age: this._age,
            email: this._email,
            phoneNumber: this._phoneNumber,
            address: this._address || 'Not provided',
            occupation: this._occupation || 'Not provided',
            isActive: this._isActive,
            memberSince: this._createdDate.toLocaleDateString()
        };
    }

    AI5_updateContactInfo(email, phoneNumber, address = '') {
        if (email) {
            this.AI5_setEmail(email);
        }
        if (phoneNumber) {
            this.AI5_setPhoneNumber(phoneNumber);
        }
        if (address) {
            this.AI5_setAddress(address);
        }
    }

    AI5_toggleActiveStatus() {
        this._isActive = !this._isActive;
        return this._isActive;
    }

    AI5_isAdult() {
        return this._age >= 18;
    }

    AI5_isSenior() {
        return this._age >= 65;
    }

    AI5_getAgeCategory() {
        if (this._age < 13) {
            return 'Child';
        } else if (this._age < 20) {
            return 'Teenager';
        } else if (this._age < 65) {
            return 'Adult';
        } else {
            return 'Senior';
        }
    }

    AI5_validatePerson() {
        const errors = [];
        
        if (!this._firstName || this._firstName.trim() === '') {
            errors.push('First name is required');
        }
        
        if (!this._lastName || this._lastName.trim() === '') {
            errors.push('Last name is required');
        }
        
        if (this._age < 0 || this._age > 150) {
            errors.push('Age must be between 0 and 150');
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this._email)) {
            errors.push('Valid email is required');
        }
        
        if (!this._phoneNumber || this._phoneNumber.trim() === '') {
            errors.push('Phone number is required');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    // String representation
    toString() {
        return `AI5_Person: ${this.AI5_getFullName()}, Age: ${this._age}, Email: ${this._email}`;
    }

    // JSON representation
    toJSON() {
        return {
            firstName: this._firstName,
            lastName: this._lastName,
            age: this._age,
            email: this._email,
            phoneNumber: this._phoneNumber,
            address: this._address,
            occupation: this._occupation,
            dateOfBirth: this._dateOfBirth,
            isActive: this._isActive,
            createdDate: this._createdDate
        };
    }

    // Static factory method
    static AI5_createFromObject(obj) {
        const person = new AI5_Person(
            obj.firstName,
            obj.lastName,
            obj.age,
            obj.email,
            obj.phoneNumber
        );
        
        if (obj.address) person.AI5_setAddress(obj.address);
        if (obj.occupation) person.AI5_setOccupation(obj.occupation);
        if (obj.dateOfBirth) person.AI5_setDateOfBirth(new Date(obj.dateOfBirth));
        if (obj.isActive !== undefined) person.AI5_setIsActive(obj.isActive);
        
        return person;
    }
}

// Example usage and demonstration
function AI5_demonstratePersonClass() {
    console.log("=== AI5 Person Class Demo ===");
    
    // Create a new person
    const person1 = new AI5_Person(
        "John",
        "Doe", 
        30,
        "john.doe@example.com",
        "+1-555-123-4567"
    );
    
    // Set additional information
    person1.AI5_setAddress("123 Main St, Anytown, USA");
    person1.AI5_setOccupation("Software Engineer");
    person1.AI5_setDateOfBirth(new Date(1993, 5, 15)); // June 15, 1993
    
    console.log("Person created:", person1.toString());
    console.log("Full Name:", person1.AI5_getFullName());
    console.log("Age Category:", person1.AI5_getAgeCategory());
    console.log("Is Adult:", person1.AI5_isAdult());
    console.log("Display Info:", person1.AI5_getDisplayInfo());
    
    // Validation
    const validation = person1.AI5_validatePerson();
    console.log("Validation:", validation);
    
    // Toggle active status
    console.log("Active status before toggle:", person1.AI5_getIsActive());
    person1.AI5_toggleActiveStatus();
    console.log("Active status after toggle:", person1.AI5_getIsActive());
    
    // Create person from object
    const personData = {
        firstName: "Jane",
        lastName: "Smith",
        age: 25,
        email: "jane.smith@example.com",
        phoneNumber: "+1-555-987-6543",
        address: "456 Oak Ave, Another City, USA",
        occupation: "Designer"
    };
    
    const person2 = AI5_Person.AI5_createFromObject(personData);
    console.log("\nSecond person:", person2.toString());
    console.log("JSON representation:", JSON.stringify(person2.toJSON(), null, 2));
}

// Export for use in other modules (if using Node.js)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AI5_Person,
        AI5_demonstratePersonClass
    };
}

// Run demonstration if file is executed directly
if (typeof window === 'undefined' && require.main === module) {
    AI5_demonstratePersonClass();
}