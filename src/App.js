import "./App.css";
import { useState } from "react";
import Jela from "./components/jela";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import Filter from "./components/filter";

function App() {
  const sastojci = [
    "Pileće meso",
    "Svinjsko meso",
    "Goveđe Meso",
    "Slanina",
    "Pirinač",
    "Krompir",
    "Suvo meso",
    "Jaja",
    "Sir",
    "Testenina",
    "Beli luk",
    "Biber",
    "Kupus",
    "Tucana paprika",
    "Aleva paprika",
    "Mast",
    "Crni luk",
    "Šargarepa",
    "Mleko",
    "Ulje",
    "Peršun",
    "Grašak",
  ];

  const [nizJela, setNizJela] = useState([
    {
      id: 1,
      ime: "Pilav",
      slika:
        "https://glossy.espreso.co.rs/data/images/2022/03/17/17/336896_pilav-sa-piletinom-shutterstock-113235262_sq-xs.jpg",
      sastojci: [
        sastojci.find((s) => s === "Pileće meso"),
        sastojci.find((s) => s === "Pirinač"),
        sastojci.find((s) => s === "Crni luk"),
        sastojci.find((s) => s === "Šargarepa"),
      ],
    },
    {
      id: 2,
      ime: "Podvarak",
      slika:
        "https://staticstvarukusa.mondo.rs/Thumbnail/21480/jpeg/Jelo-za-hladne-dane-Podvarak-sa-suvim-mesom",
      sastojci: [
        sastojci.find((s) => s === "Suvo meso"),
        sastojci.find((s) => s === "Kupus"),
        sastojci.find((s) => s === "Biber"),
        sastojci.find((s) => s === "Mast"),
        sastojci.find((s) => s === "Aleva paprika"),
      ],
    },
    {
      id: 3,
      ime: "Kiseli kupus",
      slika:
        "https://i.pinimg.com/736x/60/fe/2e/60fe2ec46af15213b5cb77013ac0010f.jpg",
      sastojci: [
        sastojci.find((s) => s === "Kupus"),
        sastojci.find((s) => s === "Mast"),
        sastojci.find((s) => s === "Crni luk"),
        sastojci.find((s) => s === "Biber"),
        sastojci.find((s) => s === "Tucana paprika"),
      ],
    },
    {
      id: 4,
      ime: "Makarone",
      slika:
        "https://thesaltedpepper.com/wp-content/uploads/2020/06/Basic-Mac-Cheese-web-300x300.jpg",
      sastojci: [
        sastojci.find((s) => s === "Testenina"),
        sastojci.find((s) => s === "Sir"),
        sastojci.find((s) => s === "Mleko"),
        sastojci.find((s) => s === "Ulje"),
      ],
    },
    {
      id: 5,
      ime: "Sarme",
      slika:
        "https://glossy.espreso.co.rs/data/images/2023/11/16/12/375655_sarma-shutterstock-694939105_sq-xs.jpg",
      sastojci: [
        sastojci.find((s) => s === "Goveđe Meso"),
        sastojci.find((s) => s === "Svinjsko meso"),
        sastojci.find((s) => s === "Slanina"),
        sastojci.find((s) => s === "Mast"),
        sastojci.find((s) => s === "Kupus"),
        sastojci.find((s) => s === "Beli luk"),
        sastojci.find((s) => s === "Jaja"),
        sastojci.find((s) => s === "Aleva paprika"),
      ],
    },
    {
      id: 6,
      ime: "Gulaš",
      slika:
        "https://glossy.espreso.co.rs/data/images/2023/09/04/13/370854_gulas-instagram_sq-xs.jpg",
      sastojci: [
        sastojci.find((s) => s === "Goveđe Meso"),
        sastojci.find((s) => s === "Beli luk"),
        sastojci.find((s) => s === "Šargarepa"),
        sastojci.find((s) => s === "Crni luk"),
        sastojci.find((s) => s === "Biber"),
        sastojci.find((s) => s === "Peršun"),
      ],
    },
    {
      id: 7,
      ime: "Grašak",
      slika:
        "https://i0.wp.com/klopica.rs/wp-content/uploads/2021/01/C%CC%81ufte-u-kremastom-gras%CC%8Cku-scaled.jpeg?resize=300%2C300&ssl=1",
      sastojci: [
        sastojci.find((s) => s === "Grašak"),
        sastojci.find((s) => s === "Crni luk"),
        sastojci.find((s) => s === "Beli luk"),
        sastojci.find((s) => s === "Šargarepa"),
        sastojci.find((s) => s === "Ulje"),
        sastojci.find((s) => s === "Aleva paprika"),
        sastojci.find((s) => s === "Peršun"),
      ],
    },
  ]);

  return (
    <BrowserRouter>
      <NavBar />

      <div className="cssjela">
        <Routes>
          <Route
            path="/"
            element={<Filter sastojci={sastojci} products={nizJela} />}
          />
          <Route path="/svajela" element={<Jela nizJela={nizJela} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
