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
// LOAD NOTES
// =========================

function loadNotes() {

    notes =
        JSON.parse(
            localStorage.getItem("studyHubNotes")
        ) || [];


    notes.forEach(note => {

        if (typeof note.pinned !== "boolean") {

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
// SAVE NOTES
// =========================

function saveNotes() {

    localStorage.setItem(
        "studyHubNotes",
        JSON.stringify(notes)
    );

}


// =========================
// CREATE NOTE
// =========================

function createNote() {

    let note = {

        id: Date.now(),

        title: "Untitled Note",

        content: "",

        updated:
            new Date().toISOString(),

        pinned: false

    };


    notes.unshift(note);


    saveNotes();


    renderNotesList();


    openNote(note.id);

}


// =========================
// OPEN NOTE
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

        title.value =
            note.title;

    }


    if (content) {

        content.disabled = false;

        content.value =
            note.content;

    }


    renderNotesList();


    showSavedStatus();

}


// =========================
// PIN / UNPIN NOTE
// =========================

function togglePin(id) {

    let note =
        notes.find(
            n => n.id === id
        );


    if (!note) return;


    note.pinned =
        !note.pinned;


    note.updated =
        new Date().toISOString();


    saveNotes();


    renderNotesList();


    if (currentNoteId === id) {

        showSavedStatus();

    }

}


// =========================
// UPDATE TITLE
// =========================

function updateNoteTitle(value) {

    let note =
        notes.find(
            n => n.id === currentNoteId
        );


    if (!note) return;


    note.title =
        value || "Untitled Note";


    showUnsavedStatus();


    clearTimeout(saveTimer);


    saveTimer = setTimeout(
        saveCurrentNote,
        800
    );

}


// =========================
// UPDATE CONTENT
// =========================

function updateNoteContent(value) {

    let note =
        notes.find(
            n => n.id === currentNoteId
        );


    if (!note) return;


    note.content =
        value;


    showUnsavedStatus();


    clearTimeout(saveTimer);


    saveTimer = setTimeout(
        saveCurrentNote,
        800
    );

}


// =========================
// SAVE CURRENT NOTE
// =========================

function saveCurrentNote() {

    let note =
        notes.find(
            n => n.id === currentNoteId
        );


    if (!note) return;


    showSavingStatus();


    note.updated =
        new Date().toISOString();


    saveNotes();


    renderNotesList();


    setTimeout(() => {

        showSavedStatus();

    }, 300);

}


// =========================
// STATUS ELEMENT
// =========================

function getStatusElement() {

    let status =
        document.getElementById(
            "noteSaveStatus"
        );


    if (!status) {

        let date =
            document.getElementById(
                "noteDate"
            );


        if (!date) return null;


        status =
            document.createElement(
                "span"
            );


        status.id =
            "noteSaveStatus";


        status.style.fontSize =
            "12px";


        status.style.opacity =
            "0.45";


        status.style.marginLeft =
            "10px";


        date.parentNode.insertBefore(
            status,
            date.nextSibling
        );

    }


    return status;

}


// =========================
// UNSAVED
// =========================

function showUnsavedStatus() {

    let status =
        getStatusElement();


    if (!status) return;


    status.textContent =
        "Saving changes...";


    status.style.opacity =
        "0.45";

}


// =========================
// SAVING
// =========================

function showSavingStatus() {

    let status =
        getStatusElement();


    if (!status) return;


    status.textContent =
        "Saving...";


    status.style.opacity =
        "0.45";

}


// =========================
// SAVED
// =========================

function showSavedStatus() {

    let status =
        getStatusElement();


    if (!status) return;


    let note =
        notes.find(
            n => n.id === currentNoteId
        );


    if (!note) return;


    let time =
        new Date(
            note.updated
        ).toLocaleTimeString(
            [],
            {
                hour:"numeric",
                minute:"2-digit"
            }
        );


    status.textContent =
        "✓ Saved " + time;


    status.style.opacity =
        "0.4";

}


// =========================
// DELETE NOTE
// =========================

function deleteNote() {

    if (currentNoteId === null) return;


    let note =
        notes.find(
            n => n.id === currentNoteId
        );


    if (!note) return;


    if (
        !confirm(
            "Are you sure you want to delete this note?"
        )
    ) {

        return;

    }


    notes =
        notes.filter(
            n =>
                n.id !== currentNoteId
        );


    saveNotes();


    currentNoteId = null;


    renderNotesList();


    if (notes.length > 0) {

        openNote(
            notes[0].id
        );

    } else {

        showEmptyNote();

    }

}


// =========================
// SEARCH NOTES
// =========================

function searchNotes(value) {

    let search =
        value
            .toLowerCase()
            .trim();


    let items =
        document.querySelectorAll(
            ".note-list-item"
        );


    items.forEach(item => {

        let id =
            Number(
                item.dataset.noteId
            );


        let note =
            notes.find(
                n => n.id === id
            );


        if (!note) return;


        let searchableText =

            (
                note.title +
                " " +
                note.content
            )
            .toLowerCase();


        item.style.display =

            searchableText.includes(search)

                ? "block"

                : "none";

    });

}


// =========================
// RENDER NOTE LIST
// =========================

function renderNotesList() {

    let container =
        document.getElementById(
            "notesList"
        );


    if (!container) return;


    if (notes.length === 0) {

        container.innerHTML = `

            <div class="note-empty-list">

                <p>No notes yet.</p>

            </div>

        `;

        return;

    }


    let sortedNotes =
        [...notes].sort(
            (a,b) => {

                if (
                    a.pinned &&
                    !b.pinned
                ) {

                    return -1;

                }

                if (
                    !a.pinned &&
                    b.pinned
                ) {

                    return 1;

                }

                return new Date(b.updated)
                    - new Date(a.updated);

            }
        );


    container.innerHTML =

        sortedNotes.map(note => `

            <div

                class="note-list-item
                ${note.id === currentNoteId
                    ? "active"
                    : ""}"

                data-note-id="${note.id}"

            >

                <button

                    onclick="
                        event.stopPropagation();
                        togglePin(${note.id});
                    "

                    style="
                        background:none;
                        box-shadow:none;
                        padding:2px 6px;
                        margin-right:6px;
                        font-size:14px;
                    "

                    title="${
                        note.pinned
                            ? "Unpin note"
                            : "Pin note"
                    }"

                >

                    ${
                        note.pinned
                            ? "📌"
                            : "📍"
                    }

                </button>


                <span
                    onclick="openNote(${note.id})"
                >

                    <strong>

                        ${escapeHTML(
                            note.title
                        )}

                    </strong>


                    <small>

                        ${formatNoteDate(
                            note.updated
                        )}

                    </small>

                </span>

            </div>

        `).join("");

}


// =========================
// EMPTY NOTE
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


    if (title) {

        title.value = "";

        title.disabled = true;

    }


    if (content) {

        content.value = "";

        content.disabled = true;

    }


    let date =
        document.getElementById(
            "noteDate"
        );


    if (date) {

        date.textContent =
            "Create a note to get started.";

    }


    let status =
        document.getElementById(
            "noteSaveStatus"
        );


    if (status) {

        status.textContent = "";

    }

}


// =========================
// FORMAT DATE
// =========================

function formatNoteDate(date) {

    if (!date) return "";


    return new Date(date)
        .toLocaleString();

}


// =========================
// ESCAPE HTML
// =========================

function escapeHTML(text) {

    return String(text)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}
