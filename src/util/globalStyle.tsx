import styled, { createGlobalStyle } from "styled-components";

import NotoSansR from "../assets/fonts/NotoSans/NotoSansCJKjp-Regular.woff";
import NotoSansL from "../assets/fonts/NotoSans/NotoSansCJKjp-Light.woff";
import NotoSansB from "../assets/fonts/NotoSans/NotoSansCJKjp-Bold.woff";

import NotoSansOR from "../assets/fonts/NotoSans/NotoSansCJKjp-Regular.otf";
import NotoSansOL from "../assets/fonts/NotoSans/NotoSansCJKjp-Light.otf";
import NotoSansOB from "../assets/fonts/NotoSans/NotoSansCJKjp-Bold.otf";

const GlobalStyle = createGlobalStyle`
/* 
html5doctor.com Reset Stylesheet
v1.6.1
Last Updated: 2010-09-17
Author: Richard Clark - http://richclarkdesign.com 
Twitter: @rich_clark
*/

html,
body,
div,
span,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
abbr,
address,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
samp,
small,
strong,
sub,
sup,
var,
b,
i,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section,
summary,
time,
mark,
audio,
video {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
}

body {
    line-height: 1;
}

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
    display: block;
}

nav ul {
    list-style: none;
}

blockquote,
q {
    quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
    content: '';
    content: none;
}

a {
    margin: 0;
    padding: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
}

/* change colours to suit your needs */
ins {
    background-color: #ff9;
    color: #000;
    text-decoration: none;
}

/* change colours to suit your needs */
mark {
    background-color: #ff9;
    color: #000;
    font-style: italic;
    font-weight: bold;
}

del {
    text-decoration: line-through;
}

abbr[title],
dfn[title] {
    border-bottom: 1px dotted;
    cursor: help;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

/* change border colour to suit your needs */
hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #cccccc;
    margin: 1em 0;
    padding: 0;
}

input,
select {
    vertical-align: middle;
}

@font-face {
    font-family: "Noto Sans";
    src: url(${NotoSansOL}) format('opentype'), url(${NotoSansL}) format('woff');
    font-weight: lighter;
}

@font-face {
    font-family: "Noto Sans";
    src: url(${NotoSansOR}) format('opentype'), url(${NotoSansR}) format('woff');
    font-weight: normal;
}

@font-face {
    font-family: "Noto Sans";
    src: url(${NotoSansOB}) format('opentype'),url(${NotoSansB}) format('woff');
    font-weight: bold;
}
`;

export default GlobalStyle;
