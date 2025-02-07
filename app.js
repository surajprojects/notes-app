let notes = JSON.parse(localStorage.getItem("notes")) || [];

const btnAdd = document.querySelector("#btnAdd");
const btnRefresh = document.querySelector("#btnRefresh");
const btnClearAll = document.querySelector("#btnClearAll");
const addNote = document.querySelector("#addNote");
const allNotes = document.querySelector("#allNotes");

function addForm() {
    const labelTitle = document.createElement("label");
    labelTitle.htmlFor = "title";
    labelTitle.textContent = "Title";

    const inputTitle = document.createElement("input");
    inputTitle.type = "text";
    inputTitle.id = "title";
    inputTitle.name = "title";

    const divTitle = document.createElement("div");
    divTitle.id = "formTitle";

    divTitle.append(labelTitle);
    divTitle.append(inputTitle);

    const labelContent = document.createElement("label");
    labelContent.htmlFor = "content";
    labelContent.textContent = "Content";

    const textareaContent = document.createElement("textarea");
    textareaContent.id = "content";
    textareaContent.name = "content";
    textareaContent.rows = "10";
    textareaContent.cols = "45";

    const divContent = document.createElement("div");
    divContent.id = "formContent";

    divContent.append(labelContent);
    divContent.append(textareaContent);

    const buttonSave = document.createElement("button");
    buttonSave.id = "btnSave";
    buttonSave.textContent = "Save";

    const buttonCancel = document.createElement("button");
    buttonCancel.id = "btnCancel";
    buttonCancel.textContent = "Cancel";

    const divButtons = document.createElement("div");
    divButtons.id = "formBtn";

    divButtons.append(buttonSave);
    divButtons.append(buttonCancel);

    addNote.append(divTitle);
    addNote.append(divContent);
    addNote.append(divButtons);
};

btnAdd.addEventListener("click", function () {
    addNote.textContent = "";
    addForm();
});

function validateAddNote() {
    const title = document.querySelector("#title");
    const content = document.querySelector("#content");

    if (title.value.length > 0 && content.value.length > 0) {
        return true;
    }
    else {
        return false;
    }
};

function saveAddNote() {
    if (validateAddNote) {
        const title = document.querySelector("#title");
        const content = document.querySelector("#content");
        notes.push({
            title: title.value,
            content: content.value,
        });
        localStorage.setItem("notes", JSON.stringify(notes));
        addNote.textContent = "";
    }
    else {
        addNote.textContent = "Unable to save!!!";
    }
};

function showNote(title, content, id) {
    const buttonDelete = document.createElement("img");
    buttonDelete.id = "btnDelete";
    buttonDelete.src = "https://cdn-icons-png.flaticon.com/512/1214/1214428.png";
    buttonDelete.alt = "Delete";

    const h4 = document.createElement("h4");
    h4.id = "showTitle";
    h4.textContent = title;

    const innerDiv = document.createElement("div");
    innerDiv.id = "noteHead";

    innerDiv.append(h4);
    innerDiv.append(buttonDelete);

    const p = document.createElement("p");
    p.id = "showContent";
    p.textContent = content;

    const div = document.createElement("div");
    div.id = id;
    div.className = "showNote";

    div.append(innerDiv);
    div.append(p);

    allNotes.append(div);
};

function refreshAllNotes() {
    notes = JSON.parse(localStorage.getItem("notes")) || [];
    allNotes.textContent = "";
    if (notes.length > 0) {
        for (let i = 0; i < notes.length; i++) {
            showNote(notes[i].title, notes[i].content, i);
        }
    }
    else {
        const msg = document.createElement("p");
        msg.id = "msg";
        msg.textContent = "Notes not found!!!";
        allNotes.append(msg);
    }
}

refreshAllNotes();

function deleteNote(id) {
    notes.splice(id, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    refreshAllNotes();
};

addNote.addEventListener("click", function (e) {
    if (e.target.id === "btnCancel") {
        addNote.textContent = "";
    }
    else if (e.target.id === "btnSave") {
        saveAddNote();
        refreshAllNotes();
    }
});

btnRefresh.addEventListener("click", function () {
    addNote.textContent = "";
    refreshAllNotes();
});

btnClearAll.addEventListener("click", function () {
    localStorage.removeItem("notes");
    refreshAllNotes();
});

allNotes.addEventListener("click", function (e) {
    if (e.target.id === "btnDelete") {
        deleteNote(e.target.parentElement.parentElement.id);
    }
});
