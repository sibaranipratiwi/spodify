import store from "../../store";
import NavigationBar from ".";
import {render, screen} from "@testing-library/react";
import { Provider } from "react-redux";


test('Should appear', () => {
    render(<Provider store={store}><NavigationBar/></Provider>);
    expect(screen.getByTestId("nav-test")).toBeInTheDocument()
})