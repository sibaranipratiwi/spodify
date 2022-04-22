import store from "../../store";
import {render, screen} from "@testing-library/react";
import { Provider } from "react-redux";
import SearchSong from ".";


test('Should appear', () => {
    render(<Provider store={store}><SearchSong/></Provider>);
    expect(screen.getByTestId("search-test")).toBeInTheDocument()
})