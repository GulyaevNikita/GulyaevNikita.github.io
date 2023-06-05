(async function () {
  const SERVER_URL = "http://localhost:3000";

  let studentsList = [];

  // // Массив отфильтрованных студентов
  const filteredStudents = [];

  // // Переменные
  const table = document.getElementById("table");
  const tableBody = document.getElementById("tbody");
  const tableHead = document.getElementById("thead");
  const addForm = document.getElementById("add-form");
  const nameInput = document.getElementById("add-from__name-input");
  const surnameInput = document.getElementById("add-from__surname-input");
  const lastnameInput = document.getElementById("add-from__lastname-input");
  const birthdayInput = document.getElementById("add-from__birthday-input");
  const studyStartInput = document.getElementById(
    "add-from__study-start-input"
  );
  const facultyInput = document.getElementById("add-from__faculty-input");
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

  formOpenBtn.addEventListener("click", () => {
    addForm.classList.toggle("form-active");
  });

  // Функция фильтрации студентов
  function filter(arr, prop, value) {
    const result = [];
    const copy = [...studentsList];
    for (const item of copy) {
      if (String(item[prop].toLowerCase()).includes(value.trim()) == true) {
        result.push(item);
      }
    }
    return result;
  }

  // Создание одного студента

  function getStudentItem(studentObj) {
    const studentTr = document.createElement("tr");
    const studentFio = document.createElement("td");
    const studentFaculty = document.createElement("td");
    const studentBirthday = document.createElement("td");
    const studentYears = document.createElement("td");
    const deleteButton = document.createElement("button");
    const deleteBox = document.createElement("td");

    studentFio.textContent = studentObj.fullName;
    studentFaculty.textContent = studentObj.faculty;
    studentBirthday.textContent = studentObj.fullYear;
    studentYears.textContent = studentObj.studyYears;
    deleteButton.textContent = "Удалить";
    deleteButton.classList.add("delete");
    deleteButton.setAttribute("id", "delete");

    studentTr.append(studentFio);
    studentTr.append(studentFaculty);
    studentTr.append(studentBirthday);
    studentTr.append(studentYears);
    studentTr.append(deleteBox);
    deleteBox.append(deleteButton);

    tableBody.append(studentTr);

    return studentTr;
  }

  const currentDate = new Date();

  // Функция сортировки массива

  function getSortStudent(prop, dir) {
    const studentsArray = [...studentsList];
    return studentsArray.sort((studentPrev, studentNext) => {
      if (
        !dir == false
          ? studentPrev[prop] < studentNext[prop]
          : studentPrev[prop] > studentNext[prop]
      ) {
        return -1;
      }
    });
  }

  // Для корректного окончания слова "год" в возрасте
  const wordEnding = (number, txt) => {
    const cases = [2, 0, 1, 1, 1, 2];
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

    // Рендер каждого студента в таблицу
    for (const student of studentsArray) {
      const years = wordEnding(
        new Date(currentDate - student.birthday).getFullYear() - 1970,
        ["год", "года", "лет"]
      );
      student.surname =
        student.surname.substr(0, 1).toUpperCase() +
        student.surname.substr(1).toLowerCase();
      student.name =
        student.name.substr(0, 1).toUpperCase() +
        student.name.substr(1).toLowerCase();
      student.lastname =
        student.lastname.substr(0, 1).toUpperCase() +
        student.lastname.substr(1).toLowerCase();
      student.fullName = `${student.name} ${student.surname} ${student.lastname}`;

      const nowYear = new Date();
      const birthday = new Date();
      birthday.setTime(Date.parse(student.birthday));
      student.birthday = birthday;
      student.fullYear = parseInt(
        (nowYear - student.birthday) / (1000 * 60 * 60 * 24 * 365)
      );
      let month = String(student.birthday.getMonth() + 1);
      month = month.length === 1 ? `0${month}` : month;
      if (student.fullYear > 20) {
        if (String(student.fullYear).endsWith("1")) {
          student.fullYear = `${student.birthday.getDate()}.${month}.${student.birthday.getFullYear()} (${
            student.fullYear
          } год)`;
        } else if (
          String(student.fullYear).endsWith("2") ||
          String(student.fullYear).endsWith("3") ||
          String(student.fullYear).endsWith("4")
        ) {
          student.fullYear = `${student.birthday.getDate()}.${month}.${student.birthday.getFullYear()} (${
            student.fullYear
          } года)`;
        } else {
          student.fullYear = `${student.birthday.getDate()}.${month}.${student.birthday.getFullYear()} (${
            student.fullYear
          } лет)`;
        }
      } else {
        student.fullYear = `${student.birthday.getDate()}.${month}.${student.birthday.getFullYear()} (${
          student.fullYear
        } лет)`;
      }
      student.faculty =
        student.faculty.substr(0, 1).toUpperCase() +
        student.faculty.substr(1).toLowerCase();
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
      studentsArray = filter(
        studentsArray,
        "studyYears",
        studyStartFilter.value
      );
    }

    for (const student of studentsArray) {
      const newTr = getStudentItem(student);
      deleteBtn(newTr, student.id, tbody);

      tableBody.append(newTr);
    }
  }

  // Событие на добавления нового студента в таблицу
  function addStudent(studentsList) {
    addForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      if (validation(this) == true) {
        const newStudentObj = {};
        (newStudentObj.name = nameInput.value),
          (newStudentObj.surname = surnameInput.value),
          (newStudentObj.lastname = lastnameInput.value),
          (newStudentObj.birthday = birthdayInput.valueAsDate),
          (newStudentObj.studyStart = studyStartInput.value),
          (newStudentObj.faculty = facultyInput.value),
          studentsList.push(newStudentObj);
        await serverAddStudent(newStudentObj);
        renderStudentsTable(studentsList);

        nameInput.value = "";
        surnameInput.value = "";
        lastnameInput.value = "";
        birthdayInput.value = "";
        studyStartInput.value = "";
        facultyInput.value = "";
      }
    });
  }

  async function serverAddStudent(obj) {
    const response = await fetch(`${SERVER_URL}/api/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });
    const data = await response.json();
    return data;
  }

  addStudent(studentsList);
  renderStudentsTable(studentsList);

  function deleteBtn(row, id, tbody) {
    const delBtn = document.getElementById("delete");

    delBtn.id = id;
    row.style.cursor = "pointer";
    row.addEventListener("click", () => {
      if (row.classList.contains("table-active")) {
        row.classList.remove("table-active");
      } else {
        const activeRow = document.querySelectorAll(".table-active");
        activeRow.forEach((active) => {
          active.classList.remove("table-active");
        });
        row.classList.toggle("table-active");
      }
    });
    delBtn.addEventListener("click", async () => {
      const response = await fetch(`${SERVER_URL}/api/students/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      await getStudentList();
      await renderStudentsTable(tbody, studentsList);
    });
  }

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
      (studyStartInput.value < 2000 && studyStartInput.value !== "") ||
      (studyStartInput.valueAsDate > currentDate.getFullYear() &&
        studyStartInput.value !== "")
    ) {
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

  // Событие по запуску сортировки по клику
  studentListThAll.forEach((element) => {
    element.addEventListener("click", function () {
      sort = this.dataset.sort;
      sortDir = !sortDir;
      renderStudentsTable(filteredStudents);
    });
  });

  // События фильтрации

  fullNameFilter.addEventListener("input", () => {
    renderStudentsTable(filteredStudents);
  });
  studyEndFilter.addEventListener("input", () => {
    renderStudentsTable(filteredStudents);
  });
  studyStartFilter.addEventListener("input", () => {
    renderStudentsTable(filteredStudents);
  });
  facultyFilter.addEventListener("input", () => {
    renderStudentsTable(filteredStudents);
  });

  // получаем список студентов из бэка
  async function getStudentList() {
    const response = await fetch(`${SERVER_URL}/api/students`);
    studentsList = await response.json();
  }

  document.addEventListener("DOMContentLoaded", () => {
    (async () => {
      await getStudentList();
      renderStudentsTable(tbody, studentsList);
    })();
  });
})();
