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
                "div"
            );

        status.id =
            "noteSaveStatus";

        status.style.marginBottom =
            "15px";

        status.style.fontWeight =
            "600";

        date.parentNode.insertBefore(
            status,
            date
        );

    }

    return status;

}


function showUnsavedStatus() {

    let status =
        getStatusElement();

    if (!status) return;

    status.textContent =
        "🟡 UNSAVED CHANGES";

}


function showSavingStatus() {

    let status =
        getStatusElement();

    if (!status) return;

    status.textContent =
        "🔵 SAVING...";

}


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
        ).toLocaleTimeString();

    status.textContent =
        "🟢 SAVED • " + time;

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

        openNote(
            notes[0].id
        );

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
            )
            .toLowerCase();

        item.style.display =
            searchableText.includes(
                search
            )
            ? "block"
            : "none";

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

    let status =
        document.getElementById(
            "noteSaveStatus"
        );

    if (status) {

        status.textContent =
            "";

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
