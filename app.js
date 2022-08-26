/*
[Note Taking Application]
- Select Elemnts
*/

const noteTitle = document.getElementById("note_title");
const noteContent = document.getElementById("note_content");
// Add Note Btn
const addBtn = document.getElementsByClassName("add-note")[0];
// Delete All Btn
const deleteAllBtn = document.getElementById("delete-all");
// Notes Container
const notesContainer = document.getElementsByClassName("notes-container")[0];

// Note Id
let noteId = 1;
// Empty Notes Array
let notes = [];

// Note Class
class Note {
    constructor(id, title, content) {
        this.id = id;
        this.title = title;
        this.content = content;
    };
};

// Save Notes Function
function saveNotes(notes) {
    return localStorage.setItem("notes", JSON.stringify(notes));
};

// Get Notes Function
function getNotes() {
    return localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];
};

// Add New Note Function
function addNewNote() {
    const noteTitleValue = noteTitle.value;
    const noteContentValue = noteContent.value;

    if (validateInput(noteTitleValue, noteContentValue)) {
        // Get Notes From localStorage
        let notes = getNotes();

        // Note Item
        const noteItem = new Note(noteId, noteTitleValue, noteContentValue);
        // increase note id By One
        noteId++;

        // Push Note Item To Notes Array
        notes.push(noteItem);

        // Save Notes In localStorage
        saveNotes(notes);

        // Invoke cretaeNote Function
        cretaeNote(noteItem);

        noteTitle.value = "";
        noteContent.value = "";
    };
};

// Error Message Function
let errorMsg = (input, message) => {
    let noteDiv = input.parentElement;

    // Get Ul Message Element From DOM
    let ul = noteDiv.querySelector(".error-msg");
    // Add Show Message To ul
    ul.classList.add("show-msg");

    // Set Error Message Text
    ul.firstElementChild.innerText = message;
};

// Success Function
let success = (input) => {
    let noteDiv = input.parentElement;

    // Get Ul Message Element From DOM
    let ul = noteDiv.querySelector(".error-msg");
    // Remove Show Message To ul
    ul.classList.remove("show-msg");

    // Set Error Message Text
    ul.firstElementChild.innerText = "";
};

// Validate Input Function
function validateInput(title, content) {
    // if Title Input && content TextArea Not Empty
    if (title !== "" && content !== "") {
        // Invoke success Function
        success(noteContent);
        return true;

    } else {
        // Invoke errorMsg Function
        errorMsg(noteContent, "Please Write Your Note Title And Content");
    }

    // Remove Error Message Automatically
    // setTimeout(_ => {
    //     // success(noteContent);
    // }, 1000);
};

// cretaeNote Function
function cretaeNote(noteItem) {
    // Create Note Div
    const div = document.createElement("div");
    div.className = "note";

    const noteData = `
        <h3 class="title">${noteItem.title}</h3>
        <p class="note-content">${noteItem.content}</p>
        <button class="btn remove-note" data-id="${noteItem.id}">remove</button>
    `;

    div.innerHTML = noteData;;

    // Append Note Div To notesContainer
    notesContainer.appendChild(div);
};

// Display All The Notes From Local Storage
function displayNotes() {
    // Get Notes Array From localStorage
    let notes = getNotes();
    populateNoteItem(notes);
};

function populateNoteItem(notes) {
    // Handel Note Id
    // if notes.length > 0
    if (notes.length > 0) {
        noteId = notes[notes.length - 1].id;
        // increase note id By One
        noteId++;

    } else {
        // if notes.length < 0
        noteId = 1;
    };

    // Looping On Notes
    notes.forEach(item => cretaeNote(item));
};

// Remove Note Logic Function
function removeNoteLogic() {
    // notesContainer addEventListener(Click)
    notesContainer.addEventListener("click", e => {
        // Check => e.target.classList.contains("remove-note")
        if (e.target.classList.contains("remove-note")) {
            const removeBtn = e.target;
            // Remove Note Btn ID
            const btnID = removeBtn.dataset.id;

            notes.map(item => console.log(item.id))

            // Invoke removeNote
            removeNote(btnID);

            // Remove Note DOM Element
            notesContainer.removeChild(removeBtn.parentElement);
        };
    });
};

// Remove Note Function
function removeNote(id) {
    // Get Notes Arra From localStorage
    let notes = getNotes();

    // Filter Notes Array
    notes = notes.filter(item => item.id != id);

    // Save Notes Array After Updating
    saveNotes(notes);
};

// Clear Note Logic Function
function clearNotesLogic() {
    deleteAllBtn.addEventListener("click", () => {
        removeAllNotes();
    });
};

// Remove All Notes Function
function removeAllNotes() {
    // Get Notes Array From localStorage
    let notes = getNotes();

    // Get New Array Of Notes ID
    let notesId = notes.map(item => item.id);

    // Looping On notesId Array
    notesId.forEach(id => removeNote(id));

    // Remove All Notes From notesContainer DOM Element
    while (notesContainer.children.length > 0) {
        notesContainer.removeChild(notesContainer.children[0]);
    };
};

// When DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    displayNotes();
    addBtn.addEventListener("click", addNewNote);
    removeNoteLogic();
    clearNotesLogic();
});
