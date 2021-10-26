//Adding Students on Click.
const studentContainer = document.querySelector(".listContainer__Students");
const addStudentButton = document.querySelector("#addStudent");
//Modal 
const examFillerContainer = document.querySelector(".examFiller__wrapper");
//Close Button
const closeButton = document.getElementById("close");
//Handling Exam Add Button
const addExam = document.getElementById("addExam");
const select = document.querySelector("select");
const score = document.querySelector('[name="examScore"]');

//Exam Container
const examContainer = document.querySelector(".examItems__container");
//Validating Score Input
document.querySelector('[name="examScore"]').addEventListener('keyup', () => {
    if (!Number(score.value)) {
        score.value = "";
    }
});

//Order Variable;
let counter = 0;

addExam.addEventListener('click', () => {
    counter++;
    let examName = select.options[select.selectedIndex].text;
    let examScore = document.querySelector('[name="examScore"]').value;
    let newItem = document.createElement("div");
    newItem.classList.add("exam__item");
    newItem.innerHTML = ` <p>${counter}</p>
                        <p>${examName}</p>
                        <p class="score">${examScore}</p>`
    examContainer.appendChild(newItem);

})

let currentStudent;

//Handling the Add Student Click Event
addStudentButton.addEventListener('click', () => {
    let studentItem = document.createElement("div");
    studentItem.classList.add("student__item");
    //Handling the empty student name input;
    if (!document.querySelector("#stuName").value.replace(/\s/g, '').length) {
        alert("name cant be empty!")
        return;
    }
    studentItem.innerHTML = `<p>${document.querySelector("#stuName").value}</p>
                            <p  class="modalOpen" id="${document.querySelector("#stuName").value.replace(" ","")}">Exam</p>
                            <p id="minVal${document.querySelector("#stuName").value.replace(" ","")}"></p>
                            <p id="maxVal${document.querySelector("#stuName").value.replace(" ","")}"></p>
                            <p id="avgVal${document.querySelector("#stuName").value.replace(" ","")}"></p>`
    studentContainer.appendChild(studentItem);
    document.querySelectorAll(".modalOpen").forEach(item => item.addEventListener('click', () => {
        examFillerContainer.classList.add("active");
        examContainer.innerHTML = "";
        counter = 0;
        currentStudent = item.getAttribute("id");
    }));

    //Reseting the input
    document.querySelector("#stuName").value = "";

});



//Handling the Close button on Modal.
closeButton.addEventListener('click', () => {

    examFillerContainer.classList.remove("active");
    //Finding the min , max , avg
    let max, min, avg = 0;
    let resultsArr = document.querySelectorAll(".score");
    max = resultsArr[0].innerHTML;
    min = resultsArr[0].innerHTML;

    for (let i = 0; i < resultsArr.length; i++) {
        if (max < Number(resultsArr[i].innerHTML)) {
            max = resultsArr[i].innerHTML;
        }
        if (min > Number(resultsArr[i].innerHTML)) {
            min = resultsArr[i].innerHTML;
        }
        avg += Number(resultsArr[i].innerHTML);
    }
    avg = Math.round(avg / resultsArr.length);
    //Setting the respective values; We can only modify once.
    studentArr = studentContainer.children;
    for (let i = 0; i < studentArr.length; i++) {
        if (studentArr[i].children[1].getAttribute("id") == currentStudent) {
            studentArr[i].children[2].innerHTML = min;
            studentArr[i].children[3].innerHTML = max;
            studentArr[i].children[4].innerHTML = avg;
        }
    }

});