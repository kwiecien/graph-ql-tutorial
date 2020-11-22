import React, {Component} from "react";

class Link extends Component {
    render() {
        const {url, description} = this.props.link;
        return (
            <div>
                <div>
                    {description} ({url})
                </div>
            </div>
        )
    }
}

export default Link
