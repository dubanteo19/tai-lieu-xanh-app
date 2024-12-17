export const getColor = (name: string) => {
  if (name === "primary") {
    return {
      main: "rgba(168,253,45, 0.42)",
      icon: "rgba(48,123,45, 1)",
      darker: "rgba(120,213,45, 0.42)",
      svg: "rgba(0,253,45, 0.70)",
    };
  }
  if (name === "secondary") {
    return {
      main: "rgba(205, 193, 255, 0.42)",
      icon: "rgba(105, 103, 255, 1)",
      darker: "rgba(185, 183, 255, 0.42)",
      svg: "rgba(170, 170, 255, 0.70)",
    };
  }
  if (name === "success") {
    return {
      main: "rgba(72, 220, 128, 0.42)",
      icon: "rgba(52, 178, 102, 1)",
      darker: "rgba(62, 200, 112, 0.42)",
      svg: "rgba(52, 190, 112, 0.70)",
    };
  }
  if (name === "error") {
    return {
      main: "rgba(255, 199, 192, 0.42)",
      icon: "rgba(255, 59, 92, 1)",
      darker: "rgba(255, 79, 112, 0.42)",
      svg: "rgba(255, 89, 102, 0.70)",
    };
  }
  if (name === "warning") {
    return {
      main: "rgba(255, 206, 86, 0.42)",
      icon: "rgba(255, 186, 36, 1)",
      darker: "rgba(255, 196, 66, 0.42)",
      svg: "rgba(255, 176, 56, 0.70)",
    };
  }
  if (name === "info") {
    return {
      main: "rgba(54, 162, 235, 0.42)",
      icon: "rgba(34, 132, 205, 1)",
      darker: "rgba(44, 152, 225, 0.42)",
      svg: "rgba(64, 142, 215, 0.70)",
    };
  }
  if (name === "neutral") {
    return {
      main: "rgba(200, 200, 200, 0.42)",
      icon: "rgba(150, 150, 150, 1)",
      darker: "rgba(180, 180, 180, 0.42)",
      svg: "rgba(170, 170, 170, 0.70)",
    };
  }

  // Fallback for unknown color names
  return {
    main: "rgba(0,0,0,0.1)",
    icon: "rgba(0,0,0,0.5)",
    darker: "rgba(0,0,0,0.2)",
    svg: "rgba(0,0,0,0.3)",
  };
};
