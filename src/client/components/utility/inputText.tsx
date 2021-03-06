import * as React from "react";
import { Component } from "react";
import { FormControl, InputGroup } from "react-bootstrap";

interface Props {
    path: string;
    label: string;
    format: RegExp;
    text: string;
    onChanged: (path: string, text: string) => void;
}
export default class InputText extends Component<Props> {

    public static defaultProps = {
        text : "",
    };

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    public onChange(e: React.FormEvent<HTMLInputElement>) {
        this.props.onChanged(this.props.path, e.currentTarget.value || undefined);
    }

    public validate() {
        if (this.props.text === "") {
            return "";
        } else {
            return this.props.format.test(this.props.text) ? "goodInput" : "badInput";
        }
    }

    public render(): JSX.Element {
        return (
            <InputGroup className="my-1">
                <InputGroup.Prepend>
                    <InputGroup.Text>
                        {this.props.label}
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl className={this.validate()} type="text" onChange={(e) => { this.onChange(e); }} value={this.props.text} />
            </InputGroup>
        );
    }
}
