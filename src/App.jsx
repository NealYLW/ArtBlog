import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Layout from './page/layout/layout'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Paint from './page/Paints/paint'

function App() {
    return (
    <BrowserRouter>
    <Routes>
        <Route path = ''  element = {<Layout />}></Route>
        <Route path = '/paint' element = {<Paint />}></Route>
    </Routes>
    </BrowserRouter>
    )
    
}

export default App
