import React from "react";
import { Divider, PageHeader } from "antd";

class Header extends React.Component {
  render() {
    return (
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          title={
            <a href="/" style={{ color: "black" }}>
              Clever Notes 2.0
            </a>
          }
          extra={this.props.buttons}
        ></PageHeader>
        <Divider />
      </div>
    );
  }
}

export default Header;
