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

        if (!note.title) {

            note.title = "Untitled";

        }

        if (!note.content) {

            note.content = "";

        }

        if (!note.updated) {

            note.updated =
                new Date().toISOString();

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
// CREATE NOTE
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


    currentNoteId =
        note.id;


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
            n =>
                n.id ===
                currentNoteId
        );


    if (!note) return;


    note.title =
        value || "Untitled";


    showUnsavedStatus();


    clearTimeout(
        saveTimer
    );


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
            n =>
                n.id ===
                currentNoteId
        );


    if (!note) return;


    note.content =
        value;


    showUnsavedStatus();


    clearTimeout(
        saveTimer
    );


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
            n =>
                n.id ===
                currentNoteId
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
            n =>
                n.id ===
                currentNoteId
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
            n =>
                n.id ===
                currentNoteId
        );


    if (!note) return;


    button.disabled = false;


    if (note.pinned === true) {

        button.textContent =
            "📌";

        button.title =
            "Unpin note";

    } else {

        button.textContent =
            "📍";

        button.title =
            "Pin note";

    }

}


// =========================
// DELETE
// =========================

function deleteNote() {

    if (
        currentNoteId ===
        null
    ) {

        return;

    }


    let note =
        notes.find(
            n =>
                n.id ===
                currentNoteId
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
            n =>
                n.id !==
                currentNoteId
        );


    saveNotes();


    currentNoteId =
        null;


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
                    n =>
                        n.id === id
                );


            if (!note) return;


            let searchable =
                (
                    note.title +
                    " " +
                    note.content
                )
                .toLowerCase();


            item.style.display =
                searchable.includes(search)
                    ? "flex"
                    : "none";

        });

}


// =========================
// RENDER NOTE SELECTOR
// =========================

function renderNotesList() {

    let container =
        document.getElementById(
            "notesList"
        );


    if (!container) return;


    if (notes.length === 0) {

        container.innerHTML = `

            <div
                style="
                    text-align:center;
                    padding:30px 10px;
                    opacity:.5;
                "
            >

                <div
                    style="
                        font-size:30px;
                        margin-bottom:10px;
                    "
                >
                    📝
                </div>

                <div>
                    No notes yet
                </div>

                <small>
                    Click + New to create one
                </small>

            </div>

        `;

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
                note.id ===
                currentNoteId;


            let preview =
                note.content
                    ? note.content
                        .replace(/\s+/g, " ")
                        .trim()
                    : "No content yet";


            if (
                preview.length > 55
            ) {

                preview =
                    preview.substring(
                        0,
                        55
                    ) + "...";

            }


            return `

                <div
                    class="note-list-item"
                    data-note-id="${note.id}"
                    onclick="openNote(${note.id})"
                    style="
                        display:flex;
                        align-items:center;
                        gap:12px;
                        padding:13px 14px;
                        margin-bottom:8px;
                        border-radius:15px;
                        cursor:pointer;

                        background:
                            ${
                                active
                                    ? "rgba(139,92,246,.25)"
                                    : "rgba(255,255,255,.045)"
                            };

                        border:
                            1px solid
                            ${
                                active
                                    ? "rgba(139,92,246,.5)"
                                    : "rgba(255,255,255,.06)"
                            };

                        transition:
                            background .2s,
                            border .2s,
                            transform .2s;
                    "

                    onmouseover="
                        this.style.transform='translateX(3px)';
                        ${
                            active
                                ? ""
                                : "this.style.background='rgba(255,255,255,.09)';"
                        }
                    "

                    onmouseout="
                        this.style.transform='translateX(0)';
                        ${
                            active
                                ? ""
                                : "this.style.background='rgba(255,255,255,.045)';"
                        }
                    "
                >

                    <div
                        style="
                            width:38px;
                            height:38px;
                            min-width:38px;
                            border-radius:11px;

                            display:flex;
                            align-items:center;
                            justify-content:center;

                            background:
                                ${
                                    active
                                        ? "rgba(139,92,246,.4)"
                                        : "rgba(255,255,255,.08)"
                                };

                            font-size:18px;
                        "
                    >

                        ${
                            note.pinned === true
                                ? "📌"
                                : "📝"
                        }

                    </div>


                    <div
                        style="
                            min-width:0;
                            flex:1;
                        "
                    >

                        <div
                            style="
                                display:flex;
                                align-items:center;
                                gap:5px;
                                font-weight:650;
                                margin-bottom:3px;
                            "
                        >

                            <span
                                style="
                                    overflow:hidden;
                                    text-overflow:ellipsis;
                                    white-space:nowrap;
                                "
                            >

                                ${escapeHTML(
                                    note.title
                                )}

                            </span>

                        </div>


                        <div
                            style="
                                font-size:12px;
                                opacity:.42;
                                overflow:hidden;
                                text-overflow:ellipsis;
                                white-space:nowrap;
                                margin-bottom:3px;
                            "
                        >

                            ${escapeHTML(
                                preview
                            )}

                        </div>


                        <div
                            style="
                                font-size:10px;
                                opacity:.3;
                            "
                        >

                            ${formatDate(
                                note.updated
                            )}

                        </div>

                    </div>


                    ${
                        active
                            ? `
                                <div
                                    style="
                                        width:5px;
                                        height:28px;
                                        border-radius:5px;
                                        background:var(--accent);
                                    "
                                ></div>
                            `
                            : ""
                    }

                </div>

            `;

        }).join("");

}


// =========================
// EMPTY EDITOR
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

        pinButton.textContent =
            "📍";

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
// SAVE STATUS
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
            n =>
                n.id ===
                currentNoteId
        );


    if (!note) return;


    let time =
        new Date(
            note.updated
        )
        .toLocaleTimeString(
            [],
            {
                hour:
                    "numeric",

                minute:
                    "2-digit"
            }
        );


    status.textContent =
        "✓ Saved " + time;


    status.style.opacity =
        ".4";

}


// =========================
// DATE
// =========================

function formatDate(date) {

    return new Date(date)
        .toLocaleDateString(
            [],
            {
                day:
                    "numeric",

                month:
                    "short"
            }
        );

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
```
