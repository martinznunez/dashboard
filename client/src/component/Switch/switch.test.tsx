import {render, fireEvent, screen} from "@testing-library/react";
import {describe, test} from "vitest";

import Switch from "./";

const onSwitchChange = vi.fn();

describe("Switch component", () => {
  test("renders correctly with 'isOn' prop", () => {
    render(<Switch isOn={true} onSwitchChange={onSwitchChange} />);
    const switchInput = screen.getByRole("checkbox", {hidden: true});

    expect(switchInput).toBeDefined();
    expect(switchInput).not.toBeNull();
  });

  test("calls 'onSwitchChange' when switched", () => {
    render(<Switch isOn={false} onSwitchChange={onSwitchChange} />);
    const switchInput = screen.getByRole("checkbox", {hidden: true});

    expect(switchInput).toBeDefined();

    fireEvent.click(switchInput);

    expect(onSwitchChange).toHaveBeenCalledTimes(1);
  });
});
