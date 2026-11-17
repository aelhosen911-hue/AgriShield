# AgriShield (AgroVision) 🌿🛡️
### *A Proactive Decision-Support System for Precision Agriculture & Foliar Protection*

**Domain:** Precision Agriculture & Edge AI  
**Core Technologies:** Multimodal AI Fusion, Time-Series Weather Ingestion, Three.js 3D WebGL, and Human-in-the-Loop (HITL) Expert Verification.

---

## 📖 Overview

**AgriShield (AgroVision)** is an advanced precision agriculture decision-support platform engineered to transform crop management from **reactive post-infection treatment** into **proactive early foliar protection**.

By fusing real-time time-series microclimate forecasting (Temperature, Relative Humidity, Leaf Wetness Duration), edge deep learning computer vision (PyTorch / TensorFlow), and deterministic soil chemistry titration (pH & NPK calibration), AgriShield detects pathogen threats days before visible symptoms appear, preventing crop destruction and slashing chemical waste by ~35%.

---

## ✨ Key Features

### 1. 🌐 Interactive 3D WebGL Plant Anatomy Lab
- **3D Exploded Decomposition:** Disassembles the plant into distinct spatial layers (Foliar Canopy, Vascular Stem Core, and Rhizosphere Root Matrix) with floating 3D connector lines.
- **Microscopic Diagnostic Zoom Cards:** Interactive 3D orbiting tiles detailing leaf stomata, shoot junction nodes, honeycomb parenchyma cross-sections, xylem/phloem fluid conduits, and underground root hairs.
- **Holographic AI Laser Scanner:** Sweeping animated laser beam and dynamic bounding reticles detecting simulated pathogen lesions in real-time.
- **Dynamic 3D Particle Cloud:** Triple particle simulation featuring microclimate moisture mist, upward xylem nutrient stream, and simulated spore outbreak dispersal.
- **3D Photo Carousel:** 3D orbital carousel showcasing ultra-high-definition empirical project assets.

### 2. 🏛️ Three Operational Pillars (ركائز النظام)
1. **Predictive Microclimate Analytics:** Continuous ingestion of microclimate metrics to model fungal incubation curves before symptoms appear.
2. **Edge Vision & Foliar Pathology:** On-device convolutional neural networks (<140ms latency) classifying plant diseases with calibrated confidence scores.
3. **Deterministic Soil & Chemical Titration:** Mathematical formulation calculating exact NPK ratios and pesticide dosages based on field area, crop type, and soil pH.

### 3. 🧪 Live Interactive Simulators
- **AI Foliar Diagnostic Scanner:** Test sample leaf lesions, view bounding boxes, AI confidence meters, and recommended active ingredients.
- **Microclimate Disease Risk Predictor:** Interactive sliders for Temperature, Humidity, and Leaf Wetness Duration calculating the Fungal Disease Risk Index (FDRI) in real-time.
- **NPK & Chemical Titration Engine:** Dynamic calculator computing Urea, DAP, and Potash requirements with automated waste reduction analytics.
- **HITL Certified Agronomist Review Station:** Simulation of the expert gateway where certified agronomists review, modify, and digitally certify high-risk chemical prescriptions.

### 4. 🌍 Full Bilingual Support (English & العربية)
- One-click language switcher with seamless RTL/LTR layout transitions and tailored typography (`Outfit` / `Cairo`).

---

## 📂 Project Structure

```
gravitytest/
├── assets/
│   ├── vendor/
│   │   ├── three.min.js               # Local Three.js WebGL library
│   │   └── OrbitControls.js           # Smooth 3D camera controls
│   ├── AgriShield-Proposal.pdf        # Official academic graduation proposal
│   ├── plant_seedling_hero.jpg        # Vegetative seedling asset
│   ├── plant_anatomy_clean.jpg        # Dissected horizontal morphology
│   ├── plant_cards_overview.jpg       # Microscopic infographic breakdown
│   ├── plant_biology_quote.jpg        # Biological definition context
│   └── card_*.jpg                     # Cropped diagnostic zoom tiles
├── css/
│   └── styles.css                     # Cyber-botanical responsive stylesheet
├── js/
│   ├── three-scene.js                 # Three.js 3D animation & interaction engine
│   └── app.js                         # Application logic & bilingual controller
├── index.html                         # Main web platform interface
├── start_agrishield.bat               # One-click Windows local server launcher
└── README.md                          # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- Any modern web browser supporting WebGL (Chrome, Edge, Firefox, Safari).
- Python 3.x (optional, for local HTTP hosting).

### Running Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/AgriShield.git
   cd AgriShield
   ```
2. Launch with the provided Windows batch script:
   - Double-click `start_agrishield.bat`
   *Or run via Python:*
   ```bash
   python -m http.server 8080
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:8080/index.html
   ```

---

## 📜 Academic Deliverables

- **Mobile App:** Flutter-based offline-first field diagnostic tool.
- **Web Portal:** Certified Agronomist Human-in-the-Loop review dashboard.
- **Dosage Engine:** Validated deterministic mathematical NPK algorithm.
- **Proposal Document:** Included as `assets/AgriShield-Proposal.pdf`.

---

## 📄 License
This project is part of an academic graduation proposal in Precision Agriculture & Edge AI. All rights reserved.
