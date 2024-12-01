
@import "compass";

body {
background: #fed75a;
overflow: hidden;
}

figure {
display: flex;
align-items: center;
justify-content: center;
height: 100vh;
width: 100vw;
}

svg {
padding: 5vw;
width: 90vw;
}

svg >  {
fill: c1c1c;
stroke:c1c1c;
strokewidth: 0.85px;
}

/* hover tip */

body:hover:after {
content: "Hover to Slow Motion";
position: absolute;
left: 0;
right: 0;
bottom: 1vh;
color: c1c1c;
text-align: center;
text-transform: uppercase;
letter-spacing: 0.5px;
font: 700 9px/14px Tahoma, sans-serif;
 animation(tip 2.5s forwards);
}

@include keyframes(tip) {
0%,
100% {
opacity: 0;
}
10%,
80% {
opacity: 1;
}
}
