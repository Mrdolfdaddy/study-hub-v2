let notes = [];
let currentNoteId = null;
let saveTimer = null;

document.addEventListener("DOMContentLoaded", () => {
    loadNotes();
});

function loadNotes() {

    notes =
        JSON.parse(
            localStorage.getItem("studyHubNotes")
        ) || [];

    renderNotesList();

    if (notes.length > 0) {
        openNote(notes[0].id);
    } else {
        showEmptyNote();
    }
}


function saveNotes() {

    localStorage.setItem(
        "studyHubNotes",
        JSON.stringify(notes)
    );

}


function createNote() {

    let note = {

        id: Date.now(),

        title: "Untitled Note",

        content: "",

        updated: new Date().toISOString()

    };

    notes.unshift(note);

    saveNotes();

    renderNotesList();

    openNote(note.id);

}


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

    renderNotesList();

    showSavedStatus();

}


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

    saveTimer = setTimeout(() => {

        saveCurrentNote();

    }, 600);

}


function updateNoteContent(value) {

    let note =
        notes.find(
            n => n.id === currentNoteId
        );

    if (!note) return;

    note.content = value;

    showUnsavedStatus();

    clearTimeout(saveTimer);

    saveTimer = setTimeout(() => {

        saveCurrentNote();

    }, 600);

}


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


function showUnsavedStatus() {

    let date =
        document.getElementById(
            "noteDate"
        );

    if (!date) return;

    date.textContent =
        "✏️ Unsaved changes...";

}


function showSavingStatus() {

    let date =
        document.getElementById(
            "noteDate"
        );

    if (!date) return;

    date.textContent =
        "💾 Saving...";

}


function showSavedStatus() {

    let note =
        notes.find(
            n => n.id === currentNoteId
        );

    let date =
        document.getElementById(
            "noteDate"
        );

    if (!date || !note) return;

    let time =
        new Date(
            note.updated
        ).toLocaleTimeString();

    date.textContent =
        "✅ Saved at " + time;

}


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

        openNote(notes[0].id);

    } else {

        showEmptyNote();

    }

}


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
            ).toLowerCase();

        if (
            searchableText.includes(search)
        ) {

            item.style.display =
                "block";

        } else {

            item.style.display =
                "none";

        }

    });

}


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

    container.innerHTML =
        notes.map(note => `

            <div

                class="note-list-item
                ${note.id === currentNoteId
                    ? "active"
                    : ""}"

                data-note-id="${note.id}"

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

            </div>

        `).join("");

}


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

}


function formatNoteDate(date) {

    if (!date) return "";

    return new Date(date)
        .toLocaleString();

}


function escapeHTML(text) {

    return String(text)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}
