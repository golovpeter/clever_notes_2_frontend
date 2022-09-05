import React from "react";
import { Button, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Header from "../../components/Header/Header";
import NoteCard from "../../components/NoteCard/NoteCard";
import PageFooter from "../../components/Footer/Footer";
import AddNoteModal from "../../components/ModalWindow/AddNoteModal";
import "./NotesPage.css";

class NotesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            value: "",
        };
    }

    //TODO: сделать обработку истекшего рефреш токена
    componentDidMount() {
        fetch("http://localhost:8080/get-all-notes", {
            method: "POST",
            headers: {
                access_token: localStorage.getItem("access_token"),
            },
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.errorCode === "1") {
                    this.updateTokens()
                        .then((response) => response.json())
                        .then((response) => {
                            localStorage.setItem(
                                "access_token",
                                response.access_token
                            );
                            localStorage.setItem(
                                "refresh_token",
                                response.refresh_token
                            );

                            fetch("http://localhost:8080/get-all-notes", {
                                method: "POST",
                                headers: {
                                    access_token:
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

                                    if (response["response"] !== null) {
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
                    this.setState({ notes: response.notes });
                } else {
                    window.location.href = "/login";
                }
            });
    }

    updateTokens() {
        return fetch("http://localhost:8080/update-token", {
            method: "POST",
            headers: {
                access_token: localStorage.getItem("access_token"),
                refresh_token: localStorage.getItem("refresh_token"),
            },
        });
    }

    render() {
        return (
            <>
                <Header
                    buttons={[
                        <AddNoteModal
                            title="Add new note!"
                            textButton={"Add note"}
                            key={1}
                            typeButton="primary"
                            shapeButton="round"
                            iconButton={<PlusOutlined />}
                        />,
                        <Button type="primary" shape="round" key={2}>
                            Log out
                        </Button>,
                    ]}
                />
                <div className={"noteCard"}>
                    <Row
                        gutter={[15, 30]}
                        className={"board"}
                        style={{
                            columnGap: "20px",
                            rowGap: "20px",
                        }}
                    >
                        {this.state.notes.map((element, index) => (
                            <NoteCard
                                key={index}
                                note={element["note"]}
                                note_caption={element["note_caption"]}
                            />
                        ))}
                    </Row>
                </div>
                <PageFooter />
            </>
        );
    }
}

export default NotesPage;
