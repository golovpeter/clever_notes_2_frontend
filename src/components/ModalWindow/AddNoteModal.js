import React from "react";
import { Button, Input, Modal } from "antd";
import "./AddNoteModal.css";
import TextArea from "antd/es/input/TextArea";

class AddNoteModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            caption: "",
            note: "",
        };
    }

    showModal() {
        this.setState({
            visible: true,
        });
    }

    handleOk() {
        this.setState({
            visible: false,
        });
    }

    handleCancel() {
        this.setState({
            visible: false,
        });
    }

    render() {
        return (
            <>
                <Button
                    type={this.props.typeButton}
                    shape={this.props.shapeButton}
                    icon={this.props.iconButton}
                    onClick={this.showModal.bind(this)}
                >
                    {this.props.textButton}
                </Button>
                <Modal
                    title={this.props.title}
                    visible={this.state.visible}
                    onOk={() => {
                        this.handleOk();
                        this.props.addNote(this.state.caption, this.state.note);
                    }}
                    okText="Save"
                    okButtonProps={{ shape: "round" }}
                    cancelButtonProps={{ shape: "round", type: "default" }}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <p style={{ marginBottom: 0 }}>Caption</p>
                    <Input
                        placeholder="Input note caption"
                        style={{ marginBottom: "15px" }}
                        className="input-area"
                        onChange={(e) =>
                            this.setState({ caption: e.target.value })
                        }
                    />
                    <p style={{ marginBottom: 0 }}>Note</p>
                    <TextArea
                        rows={10}
                        className="input-area"
                        placeholder="Input note"
                        style={{ resize: "none" }}
                        onChange={(e) =>
                            this.setState({ note: e.target.value })
                        }
                    />
                </Modal>
            </>
        );
    }
}

export default AddNoteModal;
