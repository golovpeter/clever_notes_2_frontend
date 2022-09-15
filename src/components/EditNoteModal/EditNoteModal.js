import React from "react";
import { Button, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";

class EditNoteModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            caption: this.props.caption,
            note: this.props.note,
        };

        this.formRef = React.createRef();
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

    onFinish = (values) => {
        console.log(values);
    };

    render() {
        return (
            <>
                <Button
                    type={this.props.typeButton}
                    shape={this.props.shapeButton}
                    icon={this.props.iconButton}
                    onClick={this.showModal.bind(this)}
                />
                <Modal
                    title={this.props.title}
                    visible={this.state.visible}
                    destroyOnClose={true}
                    onOk={() => {
                        this.handleOk();
                        this.props.editNote(
                            this.props.noteId,
                            this.state.caption,
                            this.state.note
                        );
                    }}
                    okText="Save"
                    okButtonProps={{ shape: "round" }}
                    cancelButtonProps={{ shape: "round", type: "default" }}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <p style={{ marginBottom: 0 }}>Caption</p>
                    <Input
                        style={{ marginBottom: "15px" }}
                        className="input-area"
                        onChange={(e) => {
                            this.setState({ caption: e.target.value });
                        }}
                        defaultValue={this.state.caption}
                    />
                    <p style={{ marginBottom: 0 }}>Note</p>
                    <TextArea
                        rows={10}
                        className="input-area"
                        style={{ resize: "none" }}
                        onChange={(e) => {
                            this.setState({ note: e.target.value });
                        }}
                        defaultValue={this.state.note}
                    />
                </Modal>
            </>
        );
    }
}

export default EditNoteModal;
