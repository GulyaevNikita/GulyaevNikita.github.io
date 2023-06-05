(function () {
  // Получаем элементов в виде строки
  function index(element) {
    return Array.from(element.parentNode.children).indexOf(element);
  }
  // Создаем функцию сторейдж для сохранения данных на странице
  function storage(name, value) {
    return value
      ? localStorage.setItem(name, JSON.stringify(value))
      : JSON.parse(localStorage.getItem(name)) || [];
  }
  //Создаем функцию для передачи данных о приложении
  function createTodoApp(
    container,
    title = "",
    sessionId = "*.html",
    defaultItems = []
  ) {
    // Создаем пустой массив. В него будем помещать данные о новых задачах
    let session = [];
    //Заголовок списка
    let appTitle = document.createElement("h2");
    appTitle.textContent = title;
    //Создаем форму
    let form = document.createElement("form");
    form.classList.add("input-group", "mb-3");
    // Создаем инпут
    let input = document.createElement("input");
    input.classList.add("form-control");
    input.placeholder = "Введите название нового дела";
    input.addEventListener("input", function () {
      button.disabled = this.value == "";
    });
    //Создаем контейнер для кнопки создания задач и инпута
    let buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("input-group-append");
    //Кнопка создания дела
    let button = document.createElement("button");
    button.classList.add("btn", "btn-primary");
    button.textContent = "Добавить дело";
    button.disabled = true;
    //Список, куда будут помещаться задачи
    let list = document.createElement("ul");
    list.classList.add("list-group");
    buttonWrapper.append(button);
    form.append(input, buttonWrapper);
    container.append(appTitle, form, list);
    //Событие для добавления задач в список
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (input.value == "") return;
      createItem(input.value);
      input.value = "";
    });
    // Событие по добавлению и стилизации дела
    function createItem(name, done) {
      let item = document.createElement("li");
      item.classList.add(
        "list-group-item",
        "d-flex",
        "justify-content-between",
        "align-items-center"
      );
      item.textContent = name;
      // Контейнер для кнопок done и delete
      let buttonGroup = document.createElement("div");
      buttonGroup.classList.add("btn-group", "btn-group-sm");
      // Создание и стилизция кнопок статуса и удаления дел
      let doneButton = document.createElement("button");
      doneButton.classList.add("btn", "btn-success");
      doneButton.textContent = "Готово";
      //Событие ддля кнопки статуса
      doneButton.addEventListener("click", function () {
        let done = item.classList.toggle("list-group-item-success");

        session[index(item)].done = done;
        storage(sessionId, session);
      });
      //Кнопка удаления дел
      let deleteButton = document.createElement("button");
      deleteButton.classList.add("btn", "btn-danger");
      deleteButton.textContent = "Удалить";
      deleteButton.addEventListener("click", function () {
        if (!confirm("Вы уверены?")) return;

        session.splice(index(item), 1);
        storage(sessionId, session);
        item.remove();
      });
      //Добавление ранее созданных элементов в контейнер
      buttonGroup.append(doneButton, deleteButton);
      item.append(buttonGroup);
      list.append(item);
      //добавляем данные о созданном деле в массив
      session.push({ name, done });
      storage(sessionId, session);

      if (done) doneButton.click();
    }

    let storageItems = storage(sessionId);

    let sessionItems = storageItems.length == 0 ? defaultItems : storageItems;
    for (let item of sessionItems) createItem(item.name, item.done);
  }

  window.createTodoApp = createTodoApp;
})();
