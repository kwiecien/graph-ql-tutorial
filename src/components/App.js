import '../styles/App.css';
import LinkList from "./LinkList";
import React from "react";
import CreateLink from "./CreateLink";

function App() {
    return <>
        <CreateLink/>
        <LinkList/>
    </>
}

export default App;
