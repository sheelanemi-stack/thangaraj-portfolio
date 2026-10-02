# THANGARAJ P - Engineering Portfolio

A modern, high-performance personal portfolio website designed for **THANGARAJ P**, an **Electronics and Communication Engineering (ECE)** student at **Easa College of Engineering and Technology (Anna University)**.

---

## 🌟 Overview & Highlights

- **Target Persona**: Aspiring ECE Engineer | Embedded Systems Enthusiast | AI Learner
- **Design Philosophy**: Sleek dark futuristic engineering aesthetic with PCB circuit animations, glassmorphism, responsive typography, and glowing signal accents.
- **Audience**: Technical recruiters, hardware engineering teams, academic project evaluators, and internship coordinators.

---

## 📁 Project Structure

```text
thangaraj-portfolio/
│
├── index.html        # Semantic HTML5 with complete structured metadata & sections
├── style.css         # Custom Vanilla CSS design system, responsive grid & animations
├── script.js         # Interactive circuit canvas, scroll-spy, drawer & validation
└── README.md         # Documentation & deployment guide
```

---

## 🚀 Live Preview & Local Running

### Option 1: Direct File Opening
Double-click `index.html` to open it in any modern browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local HTTP Server (Python)
Run the following in PowerShell / Terminal:
```bash
python -m http.server 3000
```
Then visit: `http://localhost:3000`

### Option 3: VS Code Live Server
Right-click `index.html` in VS Code and select **"Open with Live Server"**.

---

## 🌐 Free 1-Click Deployment Options

### GitHub Pages (Recommended)
1. Push this folder to a GitHub repository named `thangaraj-portfolio` or `<your-username>.github.io`.
2. Go to **Settings** → **Pages** → under **Build and deployment**, select `Deploy from a branch` (Branch: `main` or `master`, folder: `/ (root)`).
3. Click **Save**. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

### Vercel / Netlify
1. Drag and drop the folder into [Netlify Drop](https://app.netlify.com/drop) or import from GitHub on [Vercel](https://vercel.com).
2. Deploys instantly with zero configuration.

---

## 🛠️ Tech Stack & Key Features

- **Core**: Vanilla HTML5, Vanilla CSS3 (Custom Properties & Glassmorphism), Vanilla ES6 JavaScript.
- **Performance**: 100% lightweight with no heavy external UI libraries.
- **Hardware Simulation & Test Bench**:
  - **Interactive ECE Signal & Waveform Oscilloscope**: Real-time canvas oscilloscope simulating Analog Sine, Digital Clock Pulses (DSD), Microcontroller PWM, and Noisy Sensor Signals with toggleable MATLAB DSP Noise Filtering!
  - **Canvas PCB Circuit Stage**: Live orthogonal circuit traces, solder pads, signal pulses, and responsive cursor electric arc pulses.
- **Recruiter & Presentation Features**:
  - **Candidate Executive Dossier Modal**: One-click printable reference sheet (`window.print()` formatted) tailored for recruiters to save directly as a clean PDF.
  - **Project Technical Architecture Modals**: Deep-dive technical modals featuring block diagrams, LTspice circuit notes, and DSP transfer functions.
  - **Dynamic Terminal Typing**: Realistic typing effect cycling through technical focus areas.
  - **Animated Metric Counters**: Smooth cubic-bezier count-up animations for CGPA (8.3), graduation year, and credentials.
  - **Skill Category Filtering**: Interactive tab buttons (`All`, `Core Electronics`, `Software & Tools`, `Professional`).
  - **3D Card Perspective Tilt**: Interactive mouse tracking with 3D perspective glare.
  - **Sticky Glass Navigation & Scroll-Spy**: Real-time section tracking with active indicators.
  - **One-Click Contact Copy & Dispatch**: Direct clipboard copy with toasts and automated mail client handoff.

---

## ⚡ Featured Engineering Projects

1. **Smart Environmental Monitor & Hazard Alert System**
   - *Domain*: Embedded Systems & Hardware Prototyping
   - *Tools*: Embedded C, Sensors (DHT11, MQ Gas), LTspice, ADC Interfacing
   - *Key Highlights*: Real-time multi-sensor telemetry, SPICE circuit simulations for power stability, and automated buzzer/visual alert alarms. Includes technical block diagram & schematic notes modal.

2. **Digital Signal Filtering & Noise Suppression in MATLAB**
   - *Domain*: Digital Signal Processing (DSP) & Simulation
   - *Tools*: MATLAB, Digital Signal Design (DSD), FFT Analysis, Butterworth/IIR Filter Design
   - *Key Highlights*: Discrete-time filter modeling, spectral energy evaluation via Fast Fourier Transform (FFT), and quantitative Signal-to-Noise Ratio (SNR) enhancement (+18.4 dB). Includes mathematical transfer function modal.


