import React from "react";
import { Button, Card, Form, Input } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

class NoteCard extends React.Component {
    render() {
        return (
            <Card
                title={this.props.note_caption}
                className={"note-card"}
                extra={[
                    <Button
                        shape="circle"
                        key={1}
                        icon={<EditOutlined />}
                        style={{ marginRight: "10px" }}
                    ></Button>,
                    <Button
                        shape="circle"
                        key={2}
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            this.props.deleteNote();
                        }}
                    ></Button>,
                ]}
                style={{ width: 355 }}
            >
                <Form>
                    <Form.Item>
                        <Input.TextArea
                            autoSize={{ minRows: 10, maxRows: 10 }}
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
