import { render,screen } from "@testing-library/react";
import Login from "./Login";

describe('Login component', ()=>{
    test('render heder Login', ()=> {
        //Arrange
        render(<Login />);
//Act---

//Assert--
        const loginCompoent = screen.getByText('Login');
        expect(loginCompoent).toBeInTheDocument()
    })
})