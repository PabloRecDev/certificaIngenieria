import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contacto from "./pages/Contacto";
import Nosotros from "./pages/Nosotros";
import PorQue from "./pages/PorQue";
import Experiencia from "./pages/Experiencia";
import Blog from "./pages/Blog";
import Rehabilitacion from "./pages/Rehabilitacion";
import ObraNueva from "./pages/ObraNueva";
import EficienciaEnergetica from "./pages/EficienciaEnergetica";
import RehabilitacionSate from "./pages/RehabilitacionSate";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/por-que-certifica" element={<PorQue />} />
        <Route path="/experiencia" element={<Experiencia />} />
        <Route path="/obra-nueva" element={<ObraNueva />} />
        <Route path="/eficiencia-energetica" element={<EficienciaEnergetica />} />
        <Route path="/rehabilitacion-sate" element={<RehabilitacionSate />} />
        <Route path="/rehabilitacion" element={<Rehabilitacion />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
