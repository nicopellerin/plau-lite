import { createGlobalStyle } from "styled-components";
import { normalize } from "polished";

const GlobalStyles = createGlobalStyle`
${normalize()}

:root {
  --primaryBaseHue: 305;
  --primaryButtonColor: hsl(var(--primaryBaseHue), 56%, 55%);
  --primaryColor: hsl(305, 56%, 55%);
  --primaryColorDark: hsl(305, 56%, 35%);
  --primaryColorLight: hsl(305, 56%, 75%);
  --primaryColorLighter: hsl(305, 56%, 85%);
  --primaryColorLighter2: hsl(305, 56%, 95%, 1);

  --secondaryColor: hsl(333, 65%, 62%);
  --secondaryColorDark: hsl(333, 65%, 42%);
  --secondaryColorLight: hsl(333, 65%, 82%);
  --secondaryColorLighter: hsl(333, 65%, 92%);

  --tertiaryColor: hsl(213, 66%, 66%);
  --textColor: var(--primaryColorLighter2);
  --headingColor: var(--primaryColorLight);

  --backgroundColor: #001;

  --borderColor: hsla(305, 56%, 85%, 0.15);

  --cardHeading: var(--headingColor);
  --cardViewTechStackText:  var(--primaryColor);

  --themeHeadingBackground: none;
  --themeContainerBackground: hsla(305, 56%, 80%, 0.1);
  --themeItemBackground: hsla(305, 56%, 80%, 0.15);

  --nowPlayingBackground: none;

  --inputBackground: hsla(305, 56%, 35%, 0.08);
  --inputBorder: hsla(305, 56%, 35%, 0.3);
  --inputText: var(---textColor);

  --success: hsl(123, 65%, 42%);

  --mobileDropdownBackground: #112;
  --mobileDropdownBackground2: #112;

  --gradientOpacity: 0;
  --sectionBorderColor: hsla(305, 56%, 55%, 0.1);

  --similarTracksBackground: #eef;
  --similarTracksBorder: none;
  --similarTracksBorderBottom: none;
  --similarTracksHoverText: var(--textColor);

  --codeEditorBackground: #110f1d;
  --inlineCodeColor: #f4f4f4;
  --inlineCodeBackground: hsla(240, 20%, 17%, 0.9);

  --blogLinkColor: var(--textColor);

  --toolsBorder: hsla(305, 26%, 20%, 0.35);
  --toolsBackground: hsla(305, 26%, 20%, 0.2);

  --selectBackground: #fff;


  /* Fonts */
  --headingFont: "InterVariable", sans-serif;
  --bodyFont: "Space GroteskVariable", sans-serif;

  /* Spaces */
  --spacer-180: 18rem;
  --spacer-160: 16rem;
  --spacer-128: 12.8rem;
  --spacer-104: 10.4rem;
  --spacer-96: 9.6rem;
  --spacer-88: 8.8rem;
  --spacer-80: 8rem;
  --spacer-64: 6.4rem;
  --spacer-48: 4.8rem;
  --spacer-32: 3.2rem;
  --spacer-24: 2.4rem;
  --spacer-20: 2rem;
  --spacer-16: 1.6rem;
  --spacer-8: 0.8rem;
  --spacer-4: 0.4rem;

  --border-radius-2: 2px;
  --border-radius-4: 4px;
  --border-radius-8: 8px;
}

.dark {
  --textColor: var(--primaryColorLighter2);
  --headingColor: var(--primaryColorLight);

  --backgroundColor: #001;
  background: var(--backgroundColor);

  --cwoSideBorder: var(--primaryColorLighter);
  --cwoText: var(--textColor);
  --cwoDateText: hsla(305, 56%,93%, 0.8);
  --cwoHeadingText: var(--primaryColorLighter);
  --cwoChevronDown: var(--primaryColorLight);
  --cwoBackground: #112;
  --cwoText: var(--textColor);
  --cwoDate: var(--primaryColorLight);
  --cwoSingleBorder: #223;
  --cwoSingleHover: #223;

  --cardHeading: var(--primaryColorLighter);
  --cardViewTechStackText:  var(--primaryColorLight);

  --themeHeadingBackground: hsla(305, 56%, 35%, 0.2);
  --themeContainerBackground: hsla(305, 56%, 35%, 0.2);
  --themeItemBackground: hsla(305, 56%, 35%, 0.1);

  --nowPlayingBackground: var(--themeItemBackground);
  
  --inputBackground: hsla(305, 56%, 35%, 0.1);
  --inputBorder: hsla(305, 56%, 35%, 0.3);
  --inputText: var(---textColor);

  --mobileDropdownBackground: #020019;
  --mobileDropdownBackground2: #020029;

  --gradientOpacity: 0.8;
  --sectionBorderColor: hsla(305, 56%, 55%, 0.12);

  --similarTracksBackground: #000;
  --similarTracksBorder: 1px solid #112;
  --similarTracksBorderBottom: 2px solid #223;
  --similarTracksHoverText: var(--primaryColorLighter);

  --codeEditorBackground: hsla(305, 6%, 20%, 0.3);

  --inlineCodeColor: var(--primaryColorLighter);
  --inlineCodeBackground: hsla(240, 20%, 17%, 0.9);

  --blogLinkColor: var(--primaryColorLighter);

  --toolsBorder: hsla(305, 26%, 20%, 0.35);
  --toolsBackground: hsla(305, 26%, 20%, 0.2);

  --selectBackground: #160C22;
}


*, *:before, *:after {
  box-sizing: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: auto;
  line-height: calc(1em + 0.725rem);
}

html {
  font-size: 62.5%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  -webkit-tap-highlight-color: transparent;
  font-family: Helvetica, Arial, sans-serif;
}

body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: var(--bodyFont);
  color: var(--textColor);
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
}

#__next {
  height: 100%;
}

[id] {
  scroll-margin-top: 1em;
}

h1, h2, h3, h4, h5, h6, p {
  text-rendering: optimizeLegibility;
  overflow-wrap: break-word;
}

h1 {
  font-family: var(--headingFont);
  font-style: normal;
  font-weight: 900;
  color: var(---headingColor);
  margin: 0;
  margin-bottom: 0.5rem;
  font-size: 10rem;
  line-height: 1em;
}

h2 {
  font-family: var(--headingFont);
  font-style: normal;
  font-weight: 900;
  color: var(---headingColor);
  letter-spacing: -0.02em;
  margin-top: 0;
  margin-bottom: 3rem;
}

h3 {
  font-family: var(--headingFont);
  font-style: normal;
  font-weight: 600;
  color: var(---headingColor);
  font-size: 20px;
  line-height: 1.1;
  margin-top: 2rem;
  margin-bottom: 0;
}

h4 {
  font-family: var(--headingFont);
  color: var(---headingColor);
}

p {
  font-size: 1.8rem;
  color: var(--textColor);
  line-height: 1.6;
  max-width: 90ch;
  margin-top: 0;
  margin-bottom: 2.4rem;
  -webkit-font-smoothing: antialiased;
  hyphens: auto;
}

a {
  text-decoration: none;
}


`;

export default GlobalStyles;
