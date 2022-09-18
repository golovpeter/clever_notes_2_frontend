import React from "react";
import { Button, Row } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import Header from "../../components/Header/Header";
import NoteCard from "../../components/NoteCard/NoteCard";
import AddNoteModal from "../../components/ModalWindow/AddNoteModal";
import "./NotesPage.css";
import EditNoteModal from "../../components/EditNoteModal/EditNoteModal";

function getNoteStateIndex(element, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i]["note_id"] === element) {
            return i;
        }
    }
}

const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
};

class NotesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
        };

        this.addNote = this.addNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.editNote = this.editNote.bind(this);

        if (localStorage.getItem("access_token") === null) {
            window.location.href = "/";
        }
    }

    //TODO: сделать обработку истекшего рефреш токена
    componentDidMount() {
        fetch("/get-all-notes", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.errorCode === "1") {
                    this.updateTokens()
                        .then((response) => response.json())
                        .then((response) => {
                            if (response.errorCode === "1") {
                                localStorage.removeItem("access_token");
                                localStorage.removeItem("refresh_token");
                                window.location.href = "/login";
                                return;
                            }

                            localStorage.setItem(
                                "access_token",
                                response.access_token
                            );
                            localStorage.setItem(
                                "refresh_token",
                                response.refresh_token
                            );

                            fetch("/get-all-notes", {
                                method: "POST",
                                headers: {
                                    Authorization:
                                        "Bearer " +
                                        localStorage.getItem("access_token"),
                                },
                            })
                                .then((response) => response.json())
                                .then((response) => {
                                    if (response.errorCode !== undefined) {
                                        console.error(
                                            "get all notes error" +
                                                response.errorMessage
                                        );
                                        return;
                                    }

                                    if (response["notes"] !== null) {
                                        let notes = response.notes;
                                        notes.sort((a, b) =>
                                            a.note_id > b.note_id ? 1 : -1
                                        );
                                        this.setState({
                                            notes: response.notes,
                                        });
                                    } else {
                                        window.location.href = "/login";
                                    }
                                });
                        });

                    return;
                }

                if (
                    response.errorCode !== undefined &&
                    response.errorCode !== "0"
                ) {
                    console.error("error occurred: " + response.errorMessage);
                    return;
                }

                if (response["response"] !== null) {
                    let notes = response.notes;
                    notes.sort((a, b) => (a.note_id > b.note_id ? 1 : -1));
                    this.setState({
                        notes: response.notes,
                    });
                } else {
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    window.location.href = "/login";
                }
            })
            .catch(() => console.error("Failed to fetch, backend id disabled"));
    }

    updateTokens() {
        return fetch("/update-token", {
            method: "POST",
            body: JSON.stringify({
                access_token: localStorage.getItem("access_token"),
                refresh_token: localStorage.getItem("refresh_token"),
            }),
        });
    }

    logOut() {
        fetch("/log-out", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.errorCode === "0") {
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    window.location.href = "/";
                    return;
                }

                if (
                    response.errorCode !== undefined &&
                    response.errorCode !== "0"
                ) {
                    console.error("error occurred: " + response.errorMessage);
                }
            })
            .catch(() => console.error("Failed to fetch, backend id disabled"));
    }

    addNote(noteCaption, note) {
        fetch("/add-note", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
            body: JSON.stringify({
                note_caption: noteCaption,
                note: note,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.errorCode === "1") {
                    this.updateTokens()
                        .then((response) => response.json())
                        .then((response) => {
                            if (response.errorCode === "1") {
                                localStorage.removeItem("access_token");
                                localStorage.removeItem("refresh_token");
                                window.location.href = "/login";
                                return;
                            }

                            localStorage.setItem(
                                "access_token",
                                response.access_token
                            );
                            localStorage.setItem(
                                "refresh_token",
                                response.refresh_token
                            );

                            fetch("/add-note", {
                                method: "POST",
                                headers: {
                                    Authorization:
                                        "Bearer " +
                                        localStorage.getItem("access_token"),
                                },
                                body: JSON.stringify({
                                    note_caption: noteCaption,
                                    note: note,
                                }),
                            })
                                .then((response) => response.json())
                                .then((response) => {
                                    if (response.errorCode !== undefined) {
                                        console.error(
                                            "add note error" +
                                                response.errorMessage
                                        );
                                        return;
                                    }

                                    if (response["note_id"] !== null) {
                                        this.setState({
                                            notes: [
                                                ...this.state.notes,
                                                {
                                                    note_id: response.note_id,
                                                    note: note,
                                                    note_caption: noteCaption,
                                                },
                                            ],
                                        });
                                    } else {
                                        localStorage.removeItem("access_token");
                                        localStorage.removeItem(
                                            "refresh_token"
                                        );
                                        window.location.href = "/login";
                                    }
                                });
                        });

                    return;
                }

                if (
                    response.errorCode !== undefined &&
                    response.errorCode !== "0"
                ) {
                    console.error("error occurred: " + response.errorMessage);
                    return;
                }

                if (response["note_id"] !== null) {
                    this.setState({
                        notes: [
                            ...this.state.notes,
                            {
                                note_id: response.note_id,
                                note: note,
                                note_caption: noteCaption,
                            },
                        ],
                    });
                } else {
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    window.location.href = "/login";
                }
            })
            .catch(() => console.error("Failed to fetch, backend id disabled"));
    }

    deleteNote(noteId) {
        fetch("/delete-note", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
            body: JSON.stringify({
                note_id: parseInt(noteId),
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.errorCode === "1") {
                    this.updateTokens()
                        .then((response) => response.json())
                        .then((response) => {
                            if (response.errorCode === "1") {
                                localStorage.removeItem("access_token");
                                localStorage.removeItem("refresh_token");
                                window.location.href = "/login";
                                return;
                            }

                            localStorage.setItem(
                                "access_token",
                                response.access_token
                            );
                            localStorage.setItem(
                                "refresh_token",
                                response.refresh_token
                            );

                            fetch("/delete-note", {
                                method: "POST",
                                headers: {
                                    Authorization:
                                        "Bearer " +
                                        localStorage.getItem("access_token"),
                                },
                                body: JSON.stringify({
                                    note_id: parseInt(noteId),
                                }),
                            })
                                .then((response) => response.json())
                                .then((response) => {
                                    if (response.errorCode !== "0") {
                                        console.error(
                                            "delete note error" +
                                                response.errorMessage
                                        );
                                        return;
                                    }

                                    if (response.errorCode === "0") {
                                        let noteStateId = getNoteStateIndex(
                                            noteId,
                                            this.state.notes
                                        );
                                        let filteredState =
                                            this.state.notes.filter(function (
                                                value,
                                                index,
                                                array
                                            ) {
                                                return index !== noteStateId;
                                            });

                                        this.setState({
                                            notes: filteredState,
                                        });
                                    } else {
                                        localStorage.removeItem("access_token");
                                        localStorage.removeItem(
                                            "refresh_token"
                                        );
                                        window.location.href = "/login";
                                    }
                                });
                        });

                    return;
                }

                if (
                    response.errorCode !== undefined &&
                    response.errorCode !== "0"
                ) {
                    console.error("error occurred: " + response.errorMessage);
                    return;
                }

                if (response["note_id"] !== null) {
                    let noteStateId = getNoteStateIndex(
                        noteId,
                        this.state.notes
                    );

                    let filteredState = this.state.notes.filter(function (
                        value,
                        index,
                        array
                    ) {
                        return index !== noteStateId;
                    });

                    this.setState({
                        notes: filteredState,
                    });
                } else {
                    window.location.href = "/login";
                }
            })
            .catch(() => console.error("Failed to fetch, backend id disabled"));
    }

    editNote(noteId, newCaption, newNote) {
        fetch("/update-note", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
            body: JSON.stringify({
                note_id: parseInt(noteId),
                new_note_caption: newCaption,
                new_note: newNote,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.errorCode === "1") {
                    this.updateTokens()
                        .then((response) => response.json())
                        .then((response) => {
                            if (response.errorCode === "1") {
                                localStorage.removeItem("access_token");
                                localStorage.removeItem("refresh_token");
                                window.location.href = "/login";
                                return;
                            }

                            localStorage.setItem(
                                "access_token",
                                response.access_token
                            );
                            localStorage.setItem(
                                "refresh_token",
                                response.refresh_token
                            );

                            fetch("/update-note", {
                                method: "POST",
                                headers: {
                                    Authorization:
                                        "Bearer " +
                                        localStorage.getItem("access_token"),
                                },
                                body: JSON.stringify({
                                    note_id: parseInt(noteId),
                                    new_note_caption: newCaption,
                                    new_note: newNote,
                                }),
                            })
                                .then((response) => response.json())
                                .then((response) => {
                                    if (response.errorCode === "0") {
                                        let noteStateId = getNoteStateIndex(
                                            noteId,
                                            this.state.notes
                                        );

                                        newNote = {
                                            note_id: noteId,
                                            note: newNote,
                                            note_caption: newCaption,
                                        };

                                        let newNotes = this.state.notes;
                                        newNotes[noteStateId] = newNote;
                                        newNotes.sort((a, b) =>
                                            a.note_id > b.note_id ? 1 : -1
                                        );

                                        this.setState({
                                            notes: newNotes,
                                        });
                                    } else {
                                        localStorage.removeItem("access_token");
                                        localStorage.removeItem(
                                            "refresh_token"
                                        );
                                        window.location.href = "/login";
                                    }
                                });
                        });

                    return;
                }

                if (
                    response.errorCode !== undefined &&
                    response.errorCode !== "0"
                ) {
                    console.error("error occurred: " + response.errorMessage);
                    return;
                }

                if (response["note_id"] !== null) {
                    let noteStateId = getNoteStateIndex(
                        noteId,
                        this.state.notes
                    );

                    newNote = {
                        note_id: noteId,
                        note: newNote,
                        note_caption: newCaption,
                    };

                    let newNotes = this.state.notes;
                    newNotes[noteStateId] = newNote;
                    newNotes.sort((a, b) => (a.note_id > b.note_id ? 1 : -1));

                    this.setState({
                        notes: newNotes,
                    });
                } else {
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    window.location.href = "/login";
                }
            })
            .catch(() => console.error("Failed to fetch, backend id disabled"));
    }

    render() {
        return (
            <>
                <Header
                    buttons={[
                        <AddNoteModal
                            title="Add new note!"
                            textButton={"Add note"}
                            typeButton="primary"
                            shapeButton="round"
                            iconButton={<PlusOutlined />}
                            addNote={this.addNote}
                            key={generateKey("addNoteModal")}
                        />,
                        <Button
                            type="primary"
                            shape="round"
                            key={generateKey("logOutKey")}
                            onClick={() => this.logOut()}
                        >
                            Log out
                        </Button>,
                    ]}
                />
                <div className={"noteCard"} style={{ paddingBottom: "20px" }}>
                    <Row
                        gutter={[15, 30]}
                        className={"board"}
                        style={{
                            columnGap: "15px",
                            rowGap: "20px",
                        }}
                    >
                        {this.state.notes.map((element, index) => (
                            <NoteCard
                                key={generateKey("note") + element["note_id"]}
                                note={element["note"]}
                                note_caption={
                                    <b
                                        style={{
                                            fontSize: "18px",
                                            fontFamily: "JetBrains Mono",
                                        }}
                                    >
                                        {element["note_caption"]}
                                    </b>
                                }
                                deleteNote={() => {
                                    this.deleteNote(element["note_id"]);
                                }}
                                editNote={
                                    <EditNoteModal
                                        typeButton="default"
                                        shapeButton="circle"
                                        iconButton={<EditOutlined />}
                                        key={
                                            element["note_id"] +
                                            element["note_caption"]
                                        }
                                        caption={element["note_caption"]}
                                        note={element["note"]}
                                        editNote={this.editNote}
                                        noteId={element["note_id"]}
                                    />
                                }
                            />
                        ))}
                    </Row>
                    {this.state.notes.length === 0 ? (
                        <>
                            <Row
                                type="flex"
                                justify="center"
                                align="middle"
                                style={{ paddingTop: "20vh" }}
                            >
                                <svg
                                    width="150"
                                    height="150"
                                    viewBox="0 0 24 24"
                                    fill="#e8e8e8"
                                >
                                    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
                                </svg>
                            </Row>
                            <Row
                                type="flex"
                                justify="center"
                                align="middle"
                                style={{ paddingTop: "10px" }}
                            >
                                <p
                                    style={{
                                        fontSize: "20px",
                                        color: "#bfbfbf",
                                    }}
                                >
                                    Here will be your notes
                                </p>
                            </Row>
                        </>
                    ) : null}
                </div>
            </>
        );
    }
}

export default NotesPage;
