import React from "react";
import { Button, Card, Form, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./NoteCard.css";

class NoteCard extends React.Component {
    render() {
        return (
            <Card
                title={this.props.note_caption}
                className={"note-card"}
                extra={[
                    <span key={1}>{this.props.editNote}</span>,
                    <Button
                        shape="circle"
                        key={2}
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            this.props.deleteNote();
                        }}
                        style={{ marginLeft: "5px" }}
                    ></Button>,
                ]}
                style={{ width: 355 }}
            >
                <Form>
                    <Form.Item>
                        <Input.TextArea
                            autoSize={{ minRows: 12, maxRows: 12 }}
                            defaultValue={this.props.note}
                            disabled={true}
                        />
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

export default NoteCard;
