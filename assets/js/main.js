gsap.to("#background", {
  duration: 2,
  "background":
    "linear-gradient(315deg, #130f40 0%, #000000 50%),url(./assets/images/noise-fine.svg)",
});

// ,radial-gradient(circle at left,#08071b 0vw,rgba(255,255,255,0) 36vw)

// setTimeout(function () {
//   document.body.style.background =
//     "linear-gradient(315deg, #130f40 0%, #000000 60%)";
// }, 2100);

var tl;
var transition = { playing: true };
function textEffect1(textId,special) {
  var a = document.getElementById(textId).innerText;
  var b = a.split("");
  for (var l in b) {
      if((l==0||l==17||l==18||l==19||l==20)&&special){
          b[l] ="<div class='mobileHeading'>" + b[l].replace(" ", "&nbsp;") + "</div>";
      } else if(special) {
        b[l] ="<div class='onlyExpand'>" + b[l].replace(" ", "&nbsp;") + "</div>";
      } else {
        b[l] ="<div>" + b[l].replace(" ", "&nbsp;") + "</div>";
      }
  }
  document.getElementById(textId).innerHTML = "<div>" + b.join("") + "</div>";

  var mySplitText = document.getElementById(textId).getElementsByTagName("div"),
    numChars = mySplitText.length;
  tl = new TimelineLite();
  for (var i = 0; i < numChars; i++) {
    if (i == 0) {
      document.getElementById(textId).style.opacity = 1;
    }
    // mySplitText[i].style.opacity = 0.7 + Math.random();
    //random value used as position parameter
    tl.from(
      mySplitText[i],
      2,
      {
        opacity: 0,
      },
      Math.random() * 2
    );
  }
}

textEffect1("heading",true);
textEffect1("subHeading",false);
// linear-gradient(147deg, rgb(0, 0, 0) 0%, #15062b 80%), url(./assets/images/noise.svg)
var noise = "./assets/images/noise.svg";
let tl2 = gsap.timeline({
  defaults: {
    ease: "power4.inOut",
  },
  paused: true,
});
tl2
.to(
  "#background",
  {
    
    "background":
      'linear-gradient(147deg, rgb(0, 0, 0) 0%, rgb(50, 2, 41) 70%), url("./assets/images/noise.svg")',
    duration: 3,
  },
  "<"
)
  .to(
    "#about-head",
    {
      "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      opacity: 1,
      y: 0,
      duration: 2,
    },
    "<0.8"
  )
  .to(
    ".about-desc",
    {
      transform: "translateY(0px) scale(0.9)",
      color: "rgb(255, 255, 255, 95%)",
      opacity: 1,
      duration: 2.3,
    },
    "<"
  )
  .to(
    "#about-vid",
    {
      opacity: 1,
      "-webkit-transform": "rotateY(-15deg) translateX(-60px)",
      transform: "rotateY(-15deg) translateX(-60px)",
      duration: 2,
    },
    "<"
  )
  .add(function () {
    let vp = document.getElementById("video-parent");
    vp.style.setProperty("--vpaAnimVar", "vpa 2s linear forwards");
    vp.style.setProperty("--vpbAnimVar", "vpb 2s linear forwards");
  }, "<")
  .to(
    "#about-vid-mobile",
    {
      opacity: 1,
      duration: 1.5,
    },
    "<"
  )
  ;

let tl3 = gsap.timeline({
  defaults: {
    ease: "power4.inOut",
  },
  paused: true,
});
tl3
.to("#background", {
  "background":
    "linear-gradient(147deg, rgb(0, 0, 0) 0%, rgb(1 36 138) 70%)",
  duration: 5,
})
.to("#tsparticles canvas", {
  "y":
    "-100vh",
  duration: 1.2,
}, "<")
    .to("#background", {
      "opacity":
        "0",
      duration: 5,
    }, "<")
    .to("#background-mesh", {
      "opacity":
        "1",
      duration: 5,
    }, "<")
;
  
    // linear-gradient(147deg, rgb(0, 0, 0) 0%, rgb(1 36 138) 70%), url(./assets/images/noise.svg)
// linear-gradient(147deg, rgb(0, 0, 0) 0%, rgb(2 54 56) 74%), url(./assets/images/noise.svg) rgb(0, 0, 0)

  let tl4= gsap.timeline({
    defaults: {
      ease: "power4.inOut",
    },
    paused: true,
  });
  // linear-gradient(147deg, rgb(0, 0, 0) 0%, rgb(2 54 56) 74%), url(./assets/images/noise.svg) rgb(0, 0, 0)
  tl4
  // .to("#fourth", {
  //   "background-image":
  //     "linear-gradient(315deg, #0cbaba 0%, #380036 74%)",
  //   duration: 2,
  // }, "<")
    .from(".sponsorItem", {
      "y":
        "30px",
      duration: 4,
    }, "<")
    .from(".sponsorItem", {
      "opacity":
        "0",
      duration: 4,
    }, "<")
    ;
    
    
    // background: url(media/images/3661906.jpg);

tl2.timeScale(2);
tl3.timeScale(2);
tl4.timeScale(2);

// tl2.reverse(0);
var currentPage = 1;
setTimeout(function () {
  transition.playing = false;
  var a = Array.from(document.getElementsByClassName("back-filter"));
  a.forEach((e) => {
    e.style.setProperty("backdrop-filter", "blur(2.5px)");
  });
}, 5000);

//check for Navigation Timing API support
if (window.performance) {
  console.info("window.performance works fine on this browser");
}
console.info(performance.navigation.type);
if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
} else {
  console.info("This page is not reloaded");
}
