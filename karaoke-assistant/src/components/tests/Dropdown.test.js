import React from "react";
import { render } from "@testing-library/react";

import Dropdown from "../Dropdown";
import { act } from "react-dom/test-utils";

describe('Dropdown', () => {
    it('renders Dropdown component that changes value when clicked', () => {
        const onChange = jest.fn();
        act(() => {
            render(<Dropdown onChange={onChange} />)
        })
    })
});
