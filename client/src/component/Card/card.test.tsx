import {render, fireEvent, screen} from "@testing-library/react";
import {describe, test} from "vitest";

import Card from "./";

const updateData = vi.fn();

describe("Card Component", () => {
  const data = {
    id: "1",
    name: "Name",
    unit: "Unit",
    value: "42",
    connected: false,
  };

  test("renders correctly with 'data'", () => {
    render(<Card data={data} disconnectedData={undefined} updateData={updateData} />);

    const switchInput = screen.getByRole("checkbox", {hidden: true});

    expect(switchInput).toBeDefined();

    expect(screen.getByText(/unit/i)).toBeDefined();

    expect(screen.getByText(/42/i)).toBeDefined();
    expect(screen.getByText(/name/i)).toBeDefined();
    expect(screen.getByText(/Connected: OFF/i)).toBeDefined();
  });

  test("calls 'updateData' when switch is toggled", () => {
    const disconnectedData = {
      id: "2",
      name: "Disconnected Name",
      unit: "Disconnected Unit",
      value: "100",
      connected: true,
    };

    render(<Card data={data} disconnectedData={disconnectedData} updateData={updateData} />);
    const switchInput = screen.getByRole("checkbox", {hidden: true});

    const connectedText = screen.getByText(/Connected: OFF/i).textContent;

    expect(connectedText).toEqual("Connected: OFF");

    expect(screen.getByText(/unit/i)).toBeDefined();

    expect(screen.getByText(/100/i)).toBeDefined();
    expect(screen.getByText(/name/i)).toBeDefined();

    fireEvent.click(switchInput);

    expect(updateData).toHaveBeenCalledTimes(1);

    const connectedTextAfterClick = screen.getByText(/Connected: ON/i).textContent;

    expect(connectedTextAfterClick).toEqual("Connected: ON");
  });
});
