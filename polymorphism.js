const prompt = require('prompt-sync')();

class Person {
    constructor(name) {
        this.name = name;
    }
}

class Student extends Person {
    constructor(rollno, name, grade, section) {
        super(name);
        this.rollno = rollno;
        this.grade = grade;
        this.section = section;
    }

    displayStudents() {
        console.log(`${this.rollno}\t ${this.name}\t ${this.grade}\t ${this.section}`);
    }
}


class StudentDatabase {
    constructor() {
        this.students = [];
    }


    displayStudents() {
        const tab = "Roll No\t Name\t Grade\t Section";
        console.log('\x1b[33m%s\x1b[0m', tab);
        for (const student of this.students) {
            student.displayStudents();
        }
    }
}

class studentfunctions extends StudentDatabase {
    addStudent(student) {
        this.students.push(student);
    }

    getStudentByRollNo(rollno) {
        return this.students.find(student => student.rollno === rollno);
    }

    editStudentData(rollno, newGrade, newSection) {
        const student = this.getStudentByRollNo(rollno);
        if (student) {
            if (newGrade !== '') {
                student.grade = newGrade;
            }
            if (newSection !== '') {
                student.section = newSection;
            }
        } else {
            console.log("Student rollno Not Found");
        }
    }

    deleteStudent(rollno) {
        this.students = this.students.filter(student => student.rollno !== rollno);
    }


}

const studentDB = new studentfunctions();

while (true) {
    console.log('\x1b[32m%s\x1b[0m', "\n1. Add Student");
    console.log('\x1b[36m%s\x1b[0m', "2. Get Student Data");
    console.log('\x1b[34m%s\x1b[0m', "3. Edit Student Data");
    console.log('\x1b[31m%s\x1b[0m', "4. Delete Student Data");
    console.log('\x1b[35m%s\x1b[0m', "5. Display Students Data");
    console.log('\x1b[33m%s\x1b[0m', "6. Exit\n");

    const option = prompt("Enter the Option: ");

    switch (option) {
        case "1": // Adding Student
            {
                console.log('\x1b[32m%s\x1b[0m', "\n***Adding Student***");

                let urollno;
                let isRollNoValid = false;

                do {
                    urollno = prompt("Enter the rollno: ");

                    if (isNaN(urollno) || urollno === "") {
                        console.log('\x1b[33m%s\x1b[0m', "*****The rollno should be a number********");
                    } else {
                        const isRollNoExist = studentDB.getStudentByRollNo(urollno);

                        if (isRollNoExist) {
                            const ck = "Roll No already exists";
                            console.log('\x1b[31m%s\x1b[0m', ck);
                        } else {
                            isRollNoValid = true;
                        }
                    }

                } while (!isRollNoValid);

                let uname;
                do {
                    uname = prompt("Enter the name: ");
                    if (!uname || uname.trim() === "") {
                        console.log('\x1b[33m%s\x1b[0m', "*****Name cannot be empty********");
                    }
                } while (!uname || uname.trim() === "");

                let ugrade;
                do {
                    ugrade = prompt("Enter the grade: ");
                    if (!ugrade || ugrade.trim() === "") {
                        console.log('\x1b[33m%s\x1b[0m', "*****Grade cannot be empty********");
                    }
                } while (!ugrade || ugrade.trim() === "");

                let usection;
                do {
                    usection = prompt("Enter the section: ");
                    if (!usection || usection.trim() === "") {
                        console.log('\x1b[33m%s\x1b[0m', "*****Section cannot be empty********");
                    }
                } while (!usection || usection.trim() === "");

                if (typeof uname === 'string' && typeof ugrade === 'string' && typeof usection === 'string') {
                    const student = new Student(urollno, uname, ugrade, usection);//Student class is called--getting the variables and pushing it in student array in studentfunctions
                    studentDB.addStudent(student);
                    console.log('\x1b[32m%s\x1b[0m', 'After adding:');
                    studentDB.displayStudents();
                } else {
                    const vt = "'*****The Other data should be in string format********'";
                    console.log('\x1b[33m%s\x1b[0m', vt);
                }
                break;
            }

        case "2": // Getting Student Data
            {
                console.log('\x1b[36m%s\x1b[0m', "\n***Getting Student Data by rollno***");

                let getrollno;
                let isValidRollNo = false;

                do {
                    getrollno = prompt("Enter the rollno to get student's details: ");

                    if (!isNaN(getrollno)) {
                        const student = studentDB.getStudentByRollNo(getrollno);
                        if (student) {
                            console.log("Student Details");
                            console.log("Roll No\t Name\t Grade\t Section");
                            student.displayStudentDetails();
                            isValidRollNo = true;
                        } else {
                            console.log('\x1b[33m%s\x1b[0m', "Student rollno Not Found");
                        }
                    } else {
                        const vt = "'*****Enter a valid rollno********'";
                        console.log('\x1b[33m%s\x1b[0m', vt);
                    }

                } while (!isValidRollNo);
                break;
            }

        case "3":
            {
                // Editing Student Data
                let rollnoToEdit;
                let isValidRollNoForEdit = false;

                do {
                    rollnoToEdit = prompt("Enter the rollno for editing: ");

                    if (!isNaN(rollnoToEdit)) {
                        const studentToEdit = studentDB.getStudentByRollNo(rollnoToEdit);

                        if (studentToEdit) {
                            console.log("Current Student Details");
                            console.log("Roll No\t Name\t Grade\t Section");
                            studentToEdit.displayStudentDetails();

                            const newGrade = prompt("Enter the new grade: ");
                            const newSection = prompt("Enter the new section: ");

                            studentDB.editStudentData(rollnoToEdit, newGrade, newSection);
                            console.log('Student data updated successfully:');
                            isValidRollNoForEdit = true;
                        } else {
                            console.log('\x1b[33m%s\x1b[0m', "Student rollno Not Found");
                        }
                    } else {
                        console.log('\x1b[33m%s\x1b[0m', "'*****Enter a valid rollno********'");
                    }

                } while (!isValidRollNoForEdit);

                console.log('After editing:');
                studentDB.displayStudents();
                break;
            }

        case "4":
            {
                // Deleting Student Data
                let rollnoToDelete;
                let todelete = false;

                do {
                    rollnoToDelete = prompt("Enter the rollno to delete that student data: ");

                    if (!isNaN(rollnoToDelete)) {
                        const studentToDelete = studentDB.getStudentByRollNo(rollnoToDelete);

                        if (studentToDelete) {
                            console.log("Student to Delete Details");
                            console.log("Roll No\t Name\t Grade\t Section");
                            studentToDelete.displayStudentDetails();

                            const confirmation = prompt("Deelete student data? (yes/no): ");
                            if (confirmation.toLowerCase() === "yes") {
                                studentDB.deleteStudent(rollnoToDelete);
                                console.log('Student data deleted successfully:');
                                todelete = true;
                            } else {
                                console.log("Deletion canceled.");
                            }
                        } else {
                            console.log('\x1b[33m%s\x1b[0m', "Student rollno Not Found");
                        }
                    } else {
                        console.log('\x1b[33m%s\x1b[0m', "'*****Enter a valid rollno********'");
                    }
                } while (!todelete);

                console.log('After deleting:');
                studentDB.displayStudents();
                break;
            }

        case "5":
            console.log("\nList of students");
            studentDB.displayStudents();
            break;

        case "6":
            console.log('\x1b[33m%s\x1b[0m', "Exiting Program......");
            process.exit();

        default:
            console.log("Enter a valid option");
    }
}
