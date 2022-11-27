if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // dark mode. default is light theme so dont worry about changing that
    document.getElementById("themeStylesheet").href = "Styles/darkStyle.css";
}