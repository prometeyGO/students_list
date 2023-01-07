document.addEventListener('DOMContentLoaded', () => {
  let studentsArray = [];
  const sendStudent = document.getElementById('btn');

  // переменные для поисков
  const nameSearch = document.querySelector('.search__name');
  const ageSearch = document.querySelector('.search__age');
  const studySearch = document.querySelector('.search__startStudy');
  const facultySearch = document.querySelector('.search__faculty');

  // переменные для таблицы
  const $tableWrap = document.getElementById('tableWrap');
  const $table =  document.createElement('table');
  const $tableHead =  document.createElement('thead');
  const $tableBody =  document.createElement('tbody');


  // забираем значения из формы, отправляем их в объект, а объект в массив и проверяем валидацию
  sendStudent.addEventListener('click', () => {
    // переменные формы
    let student = new Object();
    let name = document.querySelector('.name').value.trim();
    let surname = document.querySelector('.surname').value.trim();
    let middleName = document.querySelector('.middleName').value.trim();
    let age = document.querySelector('.dateOfBirth').value.trim();
    let startStudy = document.querySelector('.startStudy').value.trim();
    let faculty = document.querySelector('.faculty').value.trim();
    let correctAge = beautifulDate(age);

    // переменные для вычисления возраста и курса
    let now = new Date(); //Текущя дата
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); //Текущя дата без времени
    let dob = new Date(age); //Дата рождения
    let dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate()); //ДР в текущем году
    let year = now.getFullYear();
    let course = year - startStudy;

    // Возраст = текущий год - год рождения
    let years = today.getFullYear() - dob.getFullYear();
    // Если ДР в этом году ещё предстоит, то вычитаем из age один год
    if (today < dobnow) {
      years = years - 1;
    }


    let resultValidation = validation(name, surname, middleName, age, startStudy, faculty);
    if (resultValidation === false) return;


    // проверка имени
    if (name.length === 1) {
      let firstLetterName = name.toUpperCase();
      name = firstLetterName;
    } else if (name.length > 1) {
      firstLetterName = name.substr(0, 1).toUpperCase();
      lastLetterName = name.substr(1).toLowerCase();
      name = firstLetterName + lastLetterName;
    }

    // проверка фамилии
    if (surname.length === 1) {
      firstLetterSurname = surname.toUpperCase();
      surname = firstLetterSurname;
    } else if (surname.length > 1) {
      firstLetterSurname = surname.substr(0, 1).toUpperCase();
      lastLettersSurname = surname.substr(1).toLowerCase();
      surname = firstLetterSurname + lastLettersSurname;
    }

    // проверка отчества
    if (middleName.length === 1) {
      firstLetterMiddleName = middleName.toUpperCase();
      middleName = firstLetterMiddleName;
    } else if (middleName.length > 1) {
      firstLetterMiddleName = middleName.substr(0, 1).toUpperCase();
      lastLettersMiddleName = middleName.substr(1).toLowerCase();
      middleName = firstLetterMiddleName + lastLettersMiddleName;
    }

    // проверка факультета
    if (faculty.length === 1) {
      firstLetterFaculty = faculty.toUpperCase();
      faculty = firstLetterFaculty;
    } else if (faculty.length > 1) {
      firstLetterFaculty = faculty.substr(0, 1).toUpperCase();
      lastLettersFaculty = faculty.substr(1).toLowerCase();
      faculty = firstLetterFaculty + lastLettersFaculty;
    }

    // записываем данные из формы в объект
    student.fullName = `${name} ${surname} ${middleName}`;
    student.age = `${correctAge} (${years} лет)`;
    if (course <= 4) {
      student.startStudy = `${startStudy} (${course} курс)`;
    } else {
      student.startStudy = `${startStudy} (закончил)`;
    }
    student.faculty = faculty;

    studentsArray.push(student);


    document.querySelector('.name').value = '';
    document.querySelector('.surname').value = '';
    document.querySelector('.middleName').value = '';
    document.querySelector('.dateOfBirth').value = '';
    document.querySelector('.startStudy').value = '';
    document.querySelector('.faculty').value = '';

    if (studentsArray.length === 1) {
        creatTableHead();
    }
    render(studentsArray)
  });


  // приводит дату рождения в нормальный вид
  function beautifulDate(age) {
  let newAge = age.split('-');
  newAge = `${newAge[2]}.${newAge[1]}.${newAge[0]}`
  return newAge;
  }


  // валидация
  function validation(name, surname, middleName, age, startStudy, faculty) {
    let checkValidation = true;
    let nameError = document.getElementById('name-error');
    let surnameError = document.getElementById('surname-error');
    let middleNameError = document.getElementById('middleName-error');
    let ageError = document.getElementById('dateOfBirth-error');
    let startStudyError = document.getElementById('startStudy-error');
    let facultyError = document.getElementById('faculty-error');
    let ageSplit = age.split('-');
    let alphabet = /^[а-яА-Я]+$/;

    let now = new Date(); //Текущя дата
    let year = now.getFullYear();


    // валидация имени
    if (!name) {
      nameError.textContent = 'Поле обязательго для заполнения';
      nameError.style.display = 'block';
      checkValidation = false;
    } else if (!alphabet.test(name)) {
      nameError.textContent = 'Поле должно содержать только буквы русского алфавита';
      nameError.style.display = 'block';
      checkValidation = false;
    } else {
      nameError.style.display = 'none';
    }

    // валидация фамилии
    if (!surname) {
      surnameError.textContent = 'Поле обязательго для заполнения';
      surnameError.style.display = 'block';
      checkValidation = false;
    } else if (!alphabet.test(surname)) {
      surnameError.textContent = 'Поле должно содержать только буквы русского алфавита';
      surnameError.style.display = 'block';
      checkValidation = false;
    } else {
      surnameError.style.display = 'none';
    }

    // валидация отчества
    if (!middleName) {
      middleNameError.textContent = 'Поле обязательго для заполнения';
      middleNameError.style.display = 'block';
      checkValidation = false;
    } else if (!alphabet.test(middleName)) {
      middleNameError.textContent = 'Поле должно содержать только буквы русского алфавита';
      middleNameError.style.display = 'block';
      checkValidation = false;
    } else {
      middleNameError.style.display = 'none';
    }

    // валидация даты рождения
    if (!age) {
      ageError.textContent = 'Поле обязательго для заполнения';
      ageError.style.display = 'block';
      checkValidation = false;
    } else if (ageSplit[0] < 1900) {
      ageError.textContent = 'Дата рождения должна начинаться от 01.01.1900';
      ageError.style.display = 'block';
      checkValidation = false;
    } else if (ageSplit[0] > year) {
      ageError.textContent = 'Дата рождения не может превышать текущую дату';
      ageError.style.display = 'block';
      checkValidation = false;
    } else {
      ageError.style.display = 'none';
    }

    // валидация начала обучения
    if (!startStudy) {
      startStudyError.textContent = 'Поле обязательго для заполнения';
      startStudyError.style.display = 'block';
      checkValidation = false;
    } else if (startStudy < 2000) {
      startStudyError.textContent = 'Год начала обучения дожен начинаться с 2000';
      startStudyError.style.display = 'block';
      checkValidation = false;
    } else if (startStudy > year) {
      startStudyError.textContent = 'Год начала обучения не может превышать текущую дату';
      startStudyError.style.display = 'block';
      checkValidation = false;
    } else {
      startStudyError.style.display = 'none';
    }

    // валидация факультета
    if (!faculty) {
      facultyError.textContent = 'Поле обязательго для заполнения';
      facultyError.style.display = 'block';
      checkValidation = false;
    } else if (!alphabet.test(faculty)) {
      facultyError.textContent = 'Поле должно содержать только буквы русского алфавита';
      facultyError.style.display = 'block';
      checkValidation = false;
    } else {
      facultyError.style.display = 'none';
    }

    return checkValidation;
  }


  // создаём голову таблицы
  function creatTableHead() {
    const $tableHeadTr = document.createElement('tr');
    const $tableHeadThFio = document.createElement('th');
    const $tableHeadThAge = document.createElement('th');
    const $tableHeadThStudy = document.createElement('th');
    const $tableHeadThFaculty = document.createElement('th');

    $table.classList.add('table');
    $tableHead.classList.add('table__head');
    $tableHeadThFio.classList.add('table__th', 'table__th-fio', 'table__click');
    $tableHeadThAge.classList.add('table__th', 'table__th-age', 'table__click');
    $tableHeadThStudy.classList.add('table__th', 'table__th-study', 'table__click');
    $tableHeadThFaculty.classList.add('table__th', 'table__th-faculty', 'table__click');

    $tableHeadThFio.textContent = 'ФИО';
    $tableHeadThAge.textContent = 'Дата рождения';
    $tableHeadThStudy.textContent = 'Год начала обучения';
    $tableHeadThFaculty.textContent = 'Факультет';

    $tableWrap.append($table);
    $table.append($tableHead);
    $table.append($tableBody);

    $tableHead.append($tableHeadTr);
    $tableHeadTr.append($tableHeadThFio);
    $tableHeadTr.append($tableHeadThAge);
    $tableHeadTr.append($tableHeadThStudy);
    $tableHeadTr.append($tableHeadThFaculty);


    // переменные для сортировки
    const nameClick = document.querySelector('.table__th-fio');
    const ageClick = document.querySelector('.table__th-age');
    const studyClick = document.querySelector('.table__th-study');
    const facultyClick = document.querySelector('.table__th-faculty');

    // сортировка по фио
    nameClick.addEventListener('click', () => {
      let sortArray = studentsArray.sort(function(a, b) {
        if (a.fullName < b.fullName) return -1;
      });

      render(sortArray);
    });

    // сортировка по дате рождения
    ageClick.addEventListener('click', () => {
      let sortArray = studentsArray.sort(function(a, b) {
        if (a.age > b.age) return -1;
      });

      render(sortArray);
    });

    // сортировка по году начала обучения
    studyClick.addEventListener('click', () => {
      let sortArray = studentsArray.sort(function(a, b) {
        if (a.startStudy > b.startStudy) return -1;
      });

      render(sortArray);
    });

    // сортировка по факультету
    facultyClick.addEventListener('click', () => {
      let sortArray = studentsArray.sort(function(a, b) {
        if (a.faculty < b.faculty) return -1;
      });

      render(sortArray);
    });
  }


  // создаём тело таблицы
  function creatTableBody(fullName, age, study, faculty) {
    const $tableBodyTr = document.createElement('tr');
    const $tableBodyThFio = document.createElement('th');
    const $tableBodyThAge = document.createElement('th');
    const $tableBodyThStudy = document.createElement('th');
    const $tableBodyThFaculty = document.createElement('th');

    $tableBody.classList.add('table__body');
    $tableBodyThFio.classList.add('table__th');
    $tableBodyThAge.classList.add('table__th');
    $tableBodyThStudy.classList.add('table__th');
    $tableBodyThFaculty.classList.add('table__th');

    $tableBodyThFio.textContent = fullName;
    $tableBodyThAge.textContent = age;
    $tableBodyThStudy.textContent = study;
    $tableBodyThFaculty.textContent = faculty;

    $tableBody.append($tableBodyTr);
    $tableBodyTr.append($tableBodyThFio);
    $tableBodyTr.append($tableBodyThAge);
    $tableBodyTr.append($tableBodyThStudy);
    $tableBodyTr.append($tableBodyThFaculty);
  }


  // рендер таблицы
  function render(studentsArray) {
    $tableBody.innerHTML = '';

    // вытягивание данных из массива
    for (let i in studentsArray) {
      let fullName = studentsArray[i].fullName;
      let age = studentsArray[i].age
      let study = studentsArray[i].startStudy;
      let faculty = studentsArray[i].faculty;
      creatTableBody(fullName, age, study, faculty);
    }
  }


  // поиск по имени
  nameSearch.addEventListener('input', () => {
    let nameValue = nameSearch.value;
    $tableBody.innerHTML = '';

    for (let i in studentsArray) {
      let fullName = studentsArray[i].fullName;
      let age = studentsArray[i].age
      let study = studentsArray[i].startStudy;
      let faculty = studentsArray[i].faculty;

      if (fullName.toLowerCase().includes(nameValue.toLowerCase())) {
        creatTableBody(fullName, age, study, faculty);
      }
    }
  });


  // поиск по дате рождения
  ageSearch.addEventListener('input', () => {
    let ageValue = beautifulDate(ageSearch.value);
    $tableBody.innerHTML = '';

    for (let i in studentsArray) {
      let fullName = studentsArray[i].fullName;
      let age = studentsArray[i].age
      let study = studentsArray[i].startStudy;
      let faculty = studentsArray[i].faculty;

      if (age.includes(ageValue)) {
        creatTableBody(fullName, age, study, faculty);
      }
    }
  });


  // поиск по году начала обучения
  studySearch.addEventListener('input', () => {
    let studyValue = studySearch.value;
    $tableBody.innerHTML = '';

    for (let i in studentsArray) {
      let fullName = studentsArray[i].fullName;
      let age = studentsArray[i].age
      let study = studentsArray[i].startStudy;
      let faculty = studentsArray[i].faculty;

      if (study.includes(studyValue)) {
        creatTableBody(fullName, age, study, faculty);
      }
    }
  });


  // поиск по факультету
  facultySearch.addEventListener('input', () => {
    let facultyValue = facultySearch.value;
    $tableBody.innerHTML = '';

    for (let i in studentsArray) {
      let fullName = studentsArray[i].fullName;
      let age = studentsArray[i].age
      let study = studentsArray[i].startStudy;
      let faculty = studentsArray[i].faculty;

      if (faculty.toLowerCase().includes(facultyValue.toLowerCase())) {
        creatTableBody(fullName, age, study, faculty);
      }
    }
  });
});
