export const PARTICLES_OPTIONS = {
  fullScreen: false,
  style: { position: "relative", color: "white", height: "60vh !important" },
  height: "60vh !important",
  fpsLimit: 60,
  background: {
    color: "#000",
  },
  interactivity: {
    events: {
      onClick: { enable: true, mode: "push" },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: {
        enable: true
      },
    },
    modes: {
      push: { quantity: 4 },
      repulse: { distance: 200, duration: 0.4 },
    },
  },
  particles: {
    color: { value: "#ffffff" },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "out"
      },
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
      },
      value: 100,
    },
    opacity: {
      value: {
        min: 0.5,
        max: 0.7,
      },
      animation: {
        enable: true,
        speed: 0.05,
        sync: true,
      },
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
} as const;
