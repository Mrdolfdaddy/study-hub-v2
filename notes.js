```javascript
// =========================
// STUDY HUB 4.4
// NOTES
// =========================

let notes = [];
let currentNoteId = null;
let saveTimer = null;


// =========================
// START
// =========================

document.addEventListener("DOMContentLoaded", () => {

    loadNotes();

});


// =========================
// LOAD
// =========================

function loadNotes() {

    notes =
        JSON.parse(
            localStorage.getItem("studyHubNotes")
        ) || [];


    notes.forEach(note => {

        if (note.pinned !== true) {

            note.pinned = false;

        }

    });


    saveNotes();

    renderNotesList();


    if (notes.length > 0) {

        openNote(notes[0].id);

    } else {

        showEmptyNote();

    }

}


// =========================
// SAVE
// =========================

function saveNotes() {

    localStorage.setItem(
        "studyHubNotes",
        JSON.stringify(notes)
    );

}


// =========================
// CREATE
// =========================

function createNote() {

    let name =
        prompt(
            "What do you want to name this note?"
        );


    if (!name) return;


    name = name.trim();


    if (!name) return;


    let note = {

        id: Date.now(),

        title: name,

        content: "",

        pinned: false,

        updated:
            new Date().toISOString()

    };


    notes.unshift(note);


    saveNotes();


    currentNoteId = note.id;


    renderNotesList();

    openNote(note.id);

}


// =========================
// OPEN
// =========================

function openNote(id) {

    let note =
        notes.find(
            n => n.id === id
        );


    if (!note) return;


    currentNoteId = id;


    let title =
        document.getElementById(
            "noteTitle"
        );


    let content =
        document.getElementById(
            "noteContent"
        );


    if (title) {

        title.disabled = false;

        title.value = note.title;

    }


    if (content) {

        content.disabled = false;

        content.value = note.content;

    }


    updatePinButton();

    renderNotesList();

    showSavedStatus();

}


// =========================
// TITLE
// =========================

function updateNoteTitle(value) {

    let note =
        notes.find(
            n => n.id === currentNoteId
        );


    if (!note) return;


    note.title =
        value || "Untitled";


    showUnsavedStatus();


    clearTimeout(saveTimer);


    saveTimer =
        setTimeout(
            saveCurrentNote,
            700
        );

}


// =========================
// CONTENT
// =========================

function updateNoteContent(value) {

    let note =
        notes.find(
            n => n.id === currentNoteId
        );


    if (!note) return;


    note.content = value;


    showUnsavedStatus();


    clearTimeout(saveTimer);


    saveTimer =
        setTimeout(
            saveCurrentNote,
            700
        );

}


// =========================
// SAVE CURRENT
// =========================

function saveCurrentNote() {

    let note =
        notes.find(
            n => n.id === currentNoteId
        );


    if (!note) return;


    note.updated =
        new Date().toISOString();


    showSavingStatus();


    saveNotes();

    renderNotesList();


    setTimeout(
        showSavedStatus,
        250
    );

}


// =========================
// PIN
// =========================

function toggleCurrentPin() {

    let note =
        notes.find(
            n => n.id === currentNoteId
        );


    if (!note) return;


    note.pinned =
        note.pinned === true
            ? false
            : true;


    note.updated =
        new Date().toISOString();


    saveNotes();


    updatePinButton();

    renderNotesList();

    showSavedStatus();

}


// =========================
// PIN BUTTON
// =========================

function updatePinButton() {

    let button =
        document.getElementById(
            "pinNoteButton"
        );


    if (!button) return;


    let note =
        notes.find(
            n => n.id === currentNoteId
        );


    if (!note) return;


    button.disabled = false;


    if (note.pinned === true) {

        button.textContent = "📌";

        button.title =
            "Unpin note";

    } else {

        button.textContent = "📍";

        button.title =
            "Pin note";

    }

}


// =========================
// DELETE
// =========================

function deleteNote() {

    if (currentNoteId === null) {

        return;

    }


    let note =
        notes.find(
            n => n.id === currentNoteId
        );


    if (!note) return;


    if (
        !confirm(
            `Delete "${note.title}"?`
        )
    ) {

        return;

    }


    notes =
        notes.filter(
            n => n.id !== currentNoteId
        );


    saveNotes();


    currentNoteId = null;


    renderNotesList();


    if (notes.length > 0) {

        openNote(notes[0].id);

    } else {

        showEmptyNote();

    }

}


// =========================
// SEARCH
// =========================

function searchNotes(value) {

    let search =
        value
            .toLowerCase()
            .trim();


    document
        .querySelectorAll(
            ".note-list-item"
        )
        .forEach(item => {

            let id =
                Number(
                    item.dataset.noteId
                );


            let note =
                notes.find(
                    n => n.id === id
                );


            if (!note) return;


            let text =
                (
                    note.title +
                    " " +
                    note.content
                )
                .toLowerCase();


            item.style.display =
                text.includes(search)
                    ? "flex"
                    : "none";

        });

}


// =========================
// RENDER
// =========================

function renderNotesList() {

    let container =
        document.getElementById(
            "notesList"
        );


    if (!container) return;


    if (notes.length === 0) {

        container.innerHTML =
            "<p>No notes yet.</p>";

        return;

    }


    let sorted =
        [...notes].sort(
            (a, b) => {

                if (
                    a.pinned === true &&
                    b.pinned !== true
                ) {

                    return -1;

                }


                if (
                    a.pinned !== true &&
                    b.pinned === true
                ) {

                    return 1;

                }


                return (
                    new Date(b.updated) -
                    new Date(a.updated)
                );

            }
        );


    container.innerHTML =

        sorted.map(note => {

            let active =
                note.id === currentNoteId;


            return `

                <div
                    class="note-list-item"
                    data-note-id="${note.id}"
                    onclick="openNote(${note.id})"
                    style="
                        display:flex;
                        padding:12px;
                        margin-bottom:6px;
                        border-radius:12px;
                        cursor:pointer;
                        background:${
                            active
                                ? "rgba(139,92,246,.35)"
                                : "rgba(255,255,255,.05)"
                        };
                    "
                >

                    <div>

                        ${
                            note.pinned === true
                                ? "📌 "
                                : ""
                        }

                        ${escapeHTML(
                            note.title
                        )}

                    </div>

                </div>

            `;

        }).join("");

}


// =========================
// EMPTY
// =========================

function showEmptyNote() {

    let title =
        document.getElementById(
            "noteTitle"
        );


    let content =
        document.getElementById(
            "noteContent"
        );


    let pinButton =
        document.getElementById(
            "pinNoteButton"
        );


    if (title) {

        title.value = "";

        title.disabled = true;

    }


    if (content) {

        content.value = "";

        content.disabled = true;

    }


    if (pinButton) {

        pinButton.disabled = true;

        pinButton.textContent = "📍";

    }


    let status =
        document.getElementById(
            "noteSaveStatus"
        );


    if (status) {

        status.textContent =
            "Create a note to get started.";

    }

}


// =========================
// STATUS
// =========================

function showUnsavedStatus() {

    let status =
        document.getElementById(
            "noteSaveStatus"
        );


    if (!status) return;


    status.textContent =
        "Saving changes...";

}


function showSavingStatus() {

    let status =
        document.getElementById(
            "noteSaveStatus"
        );


    if (!status) return;


    status.textContent =
        "Saving...";

}


function showSavedStatus() {

    let status =
        document.getElementById(
            "noteSaveStatus"
        );


    if (!status) return;


    let note =
        notes.find(
            n => n.id === currentNoteId
        );


    if (!note) return;


    let time =
        new Date(note.updated)
            .toLocaleTimeString(
                [],
                {
                    hour: "numeric",
                    minute: "2-digit"
                }
            );


    status.textContent =
        "✓ Saved " + time;

}


// =========================
// DATE
// =========================

function formatDate(date) {

    return new Date(date)
        .toLocaleDateString(
            [],
            {
                day: "numeric",
                month: "short"
            }
        );

}


// =========================
// ESCAPE
// =========================

function escapeHTML(text) {

    return String(text)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}
```
