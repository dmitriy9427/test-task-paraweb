import "./index.scss";

// https://mocki.io/v1/a5814d24-4e22-49fc-96d1-0e9ae2952afc

const list = document.querySelector(".articles__list");
const select = document.querySelector(".select");
const selectList = document.querySelector(".select__list");
const selectTitle = document.querySelector(".select__title");

select.addEventListener("click", () => {
  selectList.classList.toggle("select__list-active");
});

const arrMonth = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function handleFilterList(list) {
  selectList.addEventListener("click", (e) => {
    selectTitle.textContent = e.target.textContent;
    list = list.filter((el) => el.author === e.target.textContent);
  });

  selectList.removeEventListener("click", (e) => {
    list = list.filter((el) => el.author === e.target.textContent);
    console.log(list);
  });
}

function handleCreateElementsSelect(author) {
  const li = document.createElement("li");
  li.classList.add("select__list-item");
  li.textContent = author;
  selectList.append(li);
}

function handleCreateElementsArticles(date, t, desc, user) {
  const li = document.createElement("li");
  li.classList.add("articles__item");

  const span = document.createElement("span");
  span.classList.add("articles__item-date");
  let newDate = new Date(date);
  span.textContent =
    newDate.getDate() +
    " " +
    arrMonth[newDate.getMonth()] +
    " " +
    newDate.getFullYear();

  const title = document.createElement("h3");
  title.classList.add("articles__item-title");
  title.textContent = t;

  const paragraph = document.createElement("p");
  paragraph.classList.add("articles__item-description");
  paragraph.textContent = desc;

  const button = document.createElement("button");
  button.classList.add("articles__item-button");
  button.textContent = user;

  li.append(span, title, paragraph, button);
  list.append(li);

  return list;
}

async function getData() {
  try {
    const res = await fetch(
      "https://mocki.io/v1/a5814d24-4e22-49fc-96d1-0e9ae2952afc"
    );

    const { articles } = await res.json();

    if (!articles) {
      throw new Error("Не удалось получить данные с сервера.");
    }
    return articles.map((el) => {
      handleCreateElementsArticles(
        el.publishedAt,
        el.title,
        el.description,
        el.author
      );
      if (el.author !== null) {
        handleCreateElementsSelect(el.author);
      }
      handleFilterList(articles);
    });
  } catch (error) {
    list.textContent = "Что-то пошло не так!";
    console.log(error);
  }
}

getData();
