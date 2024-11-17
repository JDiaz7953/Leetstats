import "./Header.css"
import React from 'react';
import videoSrc from "../../assets/coolParticles.mp4";

export default function Header(){
   return (
      <header>
        <video className="background-video" autoPlay loop muted>
            <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="header-content">
        <h1>LEETSTATS</h1>
        <p>Track and organize your LeetCode problems here.</p>
        </div>
     </header>
    )
}