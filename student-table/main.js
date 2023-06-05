// Создание объектов студентов
const studentsList = [
  {
    name: "Гарри",
    midleName: "Радионович",
    surName: "Поттер",
    faculty: "Грифиндор",
    birthday: new Date(1999, 5, 6),
    studyStart: 2020,
  },
  {
    name: "Гермиона",
    midleName: "Ивановна",
    surName: "Грейнджер",
    faculty: "Грифиндор",
    birthday: new Date(1998, 8, 2),
    studyStart: 2021,
  },
  {
    name: "Рон",
    midleName: "Святополкович",
    surName: "Уизли",
    faculty: "Грифиндор",
    birthday: new Date(1978, 9, 8),
    studyStart: 2021,
  },
  {
    name: "Лаванда",
    midleName: "Инокентьевна",
    surName: "Браун",
    faculty: "Грифиндор",
    birthday: new Date(1987, 9, 8),
    studyStart: 2020,
  },
  {
    name: "Волан",
    midleName: "Де",
    surName: "Морт",
    faculty: "Слизерин",
    birthday: new Date(1990, 10, 3),
    studyStart: 2019,
  },
];

// Массив отфильтрованных студентов
let filteredStudents = [];

// Переменные
const table = document.getElementById("table");
const tableBody = document.getElementById("tbody");
const tableHead = document.getElementById("thead");
const addForm = document.getElementById("add-form");
const nameInput = document.getElementById("add-from__name-input");
const surnameInput = document.getElementById("add-from__surname-input");
const midlenameInput = document.getElementById("add-from__midlename-inp");
const birthdayInput = document.getElementById("add-from__birthday-inp");
const studyStartInput = document.getElementById("add-from__study-start-inp");
const facultyInput = document.getElementById("add-from__faculty-inp");
const sortNameBtn = document.getElementById("fullName");
const sortFacultyBtn = document.getElementById("faculty");
const sortBirthdayBtn = document.getElementById("birthday");
const sortStudyYearsBtn = document.getElementById("years");
const fullNameFilter = document.getElementById("fullNameFilter");
const studyEndFilter = document.getElementById("studyEndFilter");
const studyStartFilter = document.getElementById("studyStartFilter");
const facultyFilter = document.getElementById("facultyFilter");
const filterForm = document.getElementById("filterForm");
const formOpenBtn = document.getElementById("formBtn");

const studentListThAll = table.querySelectorAll(".table th");

let sort = "fullName";
let sortDir = true;

// Событие для открытия формы добавления студентов

formOpenBtn.addEventListener("click", function () {
  addForm.classList.toggle("form-active");
});

// Функция фильтрации студентов
function filter(arr, prop, value) {
  let result = [];
  let copy = [...studentsList];
  // return arr.filter(function (item) {
  // });
  for (const item of copy) {
    if (String(item[prop]).includes(value.trim()) == true) result.push(item);
  }
  return result;
}

// Создание одного студента

function getStudentItem(studentObj) {
  const studentTr = document.createElement("tr");
  const studentFio = document.createElement("td"),
    studentFaculty = document.createElement("td"),
    studentBirthday = document.createElement("td"),
    studentYears = document.createElement("td");

  studentFio.textContent = studentObj.fullName;
  studentFaculty.textContent = studentObj.faculty;
  studentBirthday.textContent = studentObj.fullYear;
  studentYears.textContent = studentObj.studyYears;

  studentTr.append(studentFio);
  studentTr.append(studentFaculty);
  studentTr.append(studentBirthday);
  studentTr.append(studentYears);

  tableBody.append(studentTr);

  return studentTr;
}

const currentDate = new Date();

//Функция сортировки массива

function getSortStudent(prop, dir) {
  const studentsArray = [...studentsList];
  return studentsArray.sort(function (studentPrev, studentNext) {
    if (
      !dir == false
        ? studentPrev[prop] < studentNext[prop]
        : studentPrev[prop] > studentNext[prop]
    )
      return -1;
  });
}

const wordEnding = (number, txt) => {
  let cases = [2, 0, 1, 1, 1, 2];
  return txt[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
};

Object.assign(filteredStudents, studentsList);

function renderStudentsTable(studentsArray) {
  studentsArray = filteredStudents;
  tableBody.textContent = "";

  // Сортировка

  studentsArray = getSortStudent(sort, sortDir);

  function formatDate(date) {
    let dd = date.getDate();
    if (dd < 10) dd = "0" + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = "0" + mm;

    let yyyy = date.getFullYear();

    return dd + "." + mm + "." + yyyy;
  }

  //Рендер каждого студента в таблицу
  for (let student of studentsArray) {
    const birthdayNormalFormat = formatDate(student.birthday);

    const years = wordEnding(
      new Date(currentDate - student.birthday).getFullYear() - 1970,
      ["год", "года", "лет"]
    );
    student.fullName =
      student.name + " " + student.midleName + " " + student.surName;
    student.fullYear = `${birthdayNormalFormat} (${
      new Date(currentDate - student.birthday).getFullYear() - 1970
    } ${years})`;
    const studyEndYears = new Date(parseInt(student.studyStart) + 4, 8, 1);

    let studyStatus =
      new Date(studyEndYears - currentDate).getFullYear() - 1970;
    studyStatus = studyStatus < 0 ? "Закончил" : 4 - studyStatus;

    studyStatus = studyStatus <= 0 ? "Не начал" : studyStatus;

    student.studyYears = `${
      student.studyStart
    }-${studyEndYears.getFullYear()} (${studyStatus} курс)`;
    student.studyEnd = `${parseInt(student.studyStart) + 4}`;
  }

  // Фильтрация

  if (fullNameFilter.value.trim() !== "") {
    studentsArray = filter(studentsArray, "fullName", fullNameFilter.value);
  }
  if (studyEndFilter.value.trim() !== "") {
    studentsArray = filter(studentsArray, "studyEnd", studyEndFilter.value);
  }
  if (facultyFilter.value.trim() !== "") {
    studentsArray = filter(studentsArray, "faculty", facultyFilter.value);
  }
  if (studyStartFilter.value.trim() !== "") {
    studentsArray = filter(studentsArray, "studyYears", studyStartFilter.value);
  }

  for (let student of studentsArray) {
    const newTr = getStudentItem(student);

    tableBody.append(newTr);
  }
}

// Событие на добавления нового студента в таблицу
function addStudent(studentsList) {
  addForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const students = {
      name: nameInput.value.trim(),
      midleName: midlenameInput.value.trim(),
      surName: surnameInput.value.trim(),
      birthday: birthdayInput.valueAsDate,
      studyStart: studyStartInput.value.trim(),
      faculty: facultyInput.value.trim(),
    };

    if (validation(this) == true) {
      studentsList.push(students);

      renderStudentsTable(studentsList);
    }
  });
}

renderStudentsTable(studentsList);
addStudent(studentsList);

// Валидация формы добавления студента
function validation(form) {
  let result = true;

  const checkBirthDate = new Date("01.01.1900");
  const birthday = birthdayInput;

  const allInput = form.querySelectorAll(".input-add");

  for (const input of allInput) {
    removeError(input);

    if (input.value.trim() == "") {
      getError(input, `Введите, пожалуйста ${input.name}`);

      result = false;
    }
  }
  if (
    birthday.valueAsDate < checkBirthDate ||
    birthday.valueAsDate > currentDate
  ) {
    getError(birthdayInput, "Введите, пожалуйста корректный возраст");
    result = false;
  }
  if (
    studyStartInput.value < 2000 ||
    studyStartInput.valueAsDate > currentDate.getFullYear()
  ) {
    if (studyStartInput.value == "") {
      getError(input, `Введите, пожалуйста год начала обучения`);
      return false;
    }
    getError(studyStartInput, "Вы не могли начать обучение в этом году");
    result = false;
  }

  function removeError(input) {
    const parent = input.parentNode;

    if (parent.classList.contains("error")) {
      parent.querySelector(".error-label").remove();
      parent.classList.remove("error");
    }
  }

  function getError(input, message) {
    const parent = input.parentNode;
    const erorrLabel = document.createElement("label");

    erorrLabel.classList.add("error-label");
    erorrLabel.textContent = message;

    parent.classList.add("error");
    parent.append(erorrLabel);
  }
  return result;
}

// Событие по запуску фильтрации по клику
studentListThAll.forEach((element) => {
  element.addEventListener("click", function () {
    sort = this.dataset.sort;
    sortDir = !sortDir;
    renderStudentsTable(studentsList);
  });
});

fullNameFilter.addEventListener("input", function () {
  renderStudentsTable(studentsList);
});
studyEndFilter.addEventListener("input", function () {
  renderStudentsTable(studentsList);
});
studyStartFilter.addEventListener("input", function () {
  renderStudentsTable(studentsList);
});
facultyFilter.addEventListener("input", function () {
  renderStudentsTable(studentsList);
});

// Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.
