documentation du commit:
1.Pour creer plusieurs webpaes avec un seul html file nous avons de router
  pour avoir router nous devons installer dans le derminal en faisant "npm install react-router@7.8.0"
  apres l'avoir installer nous devons le setup:
   .dans main.jsx:

    import { BrowserRouter } from 'react-router' // ajouter cette ligne pour activer le router
        createRoot(document.getElementById('root')).render(
        <StrictMode>
            <BrowserRouter> // ajouter cette ligne pour activer le router
            <App />
            </BrowserRouter>
        </StrictMode>,
        )

    .ensuite dans App.jsx:
        import { Routes,Route } from 'react-router' // ajouter cette ligne pour activer le router
        function App() {
        return (
            <Routes>
            <Route path="/" element={<HomePage />}> </Route>  
            </Routes>
        )
        }

        export default App
shortcut
    <Routes>
      <Route index element={<HomePage />} />  // we can put index instead of path="/" 
      <Route path="checkout" element={<div>Checkout Page</div>}  /> 
    </Routes>