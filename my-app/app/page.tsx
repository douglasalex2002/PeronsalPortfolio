import React from 'react'

const page = () => {
  return (
    <>
      <div className='colored-rectangle'></div>
      <div id='top-row'>
        <div className='top-row-left'>
          <a href="#top-row" className="left-buttons" id='AD-button'>AD</a>
          <a href="#AboutMe" className="left-buttons" id='hover-underline'>About Me</a>
          <a href="#Experience" className="left-buttons" id='hover-underline'>Experience</a>
          <a href="#Projects" className="left-buttons" id='hover-underline'>Projects</a>
        </div>
        <div>
          <a href="#ContactMe" className='topButtons' id="contact-me">Contact Me</a>
        </div>
      </div>
      <div id='AboutMe'>
        <img src="/pictures/headshot_circle.png" alt="Professional Headshot" width="450" height="450" className="about-me-items"/>
        <p className="about-me-items" id="about-me-text">Hello, I am <span id="my-name">Alex Douglas</span>...</p>
      </div>
      <div id="featuredWork">
        <h1 className="section-title">Featured Work</h1>
        <div id="featured-work-projects">
          <div className='single-featured-work'>
            <img src='/pictures/placeholder.png' alt="Place Holder"></img>
            <p className="featured-text">One</p>
          </div>
          <div className='single-featured-work'>
            <img src='/pictures/placeholder.png' alt="Place Holder"></img>
            <p className="featured-text">Two</p>
          </div>
          <div className='single-featured-work'>
            <img src='/pictures/placeholder.png' alt="Place Holder"></img>
            <p className="featured-text">Three</p>
          </div>
        </div>
      </div>
      <div id='Experience'>
        <h1 className="section-title">
          Experience
        </h1>
        <p>
        Lorem ipsum odor amet, consectetuer adipiscing elit. Morbi dictumst nam nam, maximus eu commodo. In sodales elementum vivamus torquent augue ultricies commodo augue. Viverra tellus vehicula porta ornare tristique egestas sit id? Elit eleifend diam eu porttitor rhoncus felis elementum vivamus et. Viverra eleifend dolor urna, iaculis penatibus etiam. Ipsum curabitur eu suscipit bibendum auctor conubia nibh.

Conubia mollis eleifend maecenas sodales primis quis. Vestibulum etiam et ipsum mattis commodo vehicula congue ligula. Ipsum auctor nostra elementum, varius litora sapien risus lacus torquent. Pretium integer senectus rutrum lacus congue penatibus pretium sollicitudin. Vitae efficitur posuere curae commodo sodales aliquam orci quis aenean. Nam ullamcorper parturient sit sollicitudin netus arcu; consequat nunc libero. Non fusce sapien; justo taciti finibus lacus vestibulum parturient. Ad efficitur rhoncus rutrum, scelerisque dis vestibulum fermentum fusce. Elit euismod nibh inceptos donec volutpat.

Amet etiam enim sem sit adipiscing. Nullam enim imperdiet egestas euismod, varius dis ante hac! Himenaeos augue est magna justo fermentum hac augue. Morbi tempus potenti dui rhoncus rutrum tempor facilisis. Dolor netus ullamcorper porta convallis sodales malesuada proin amet. Malesuada eleifend quis maecenas quam at mattis feugiat. Interdum lobortis eu enim nibh nisi vestibulum eu sodales. Volutpat pretium lorem taciti neque elit maecenas feugiat tellus.        </p>
      </div>
      <div id='Projects'>
        <h1 className="section-title">
          Projects
        </h1>
        <p>
        Lorem ipsum odor amet, consectetuer adipiscing elit. Morbi dictumst nam nam, maximus eu commodo. In sodales elementum vivamus torquent augue ultricies commodo augue. Viverra tellus vehicula porta ornare tristique egestas sit id? Elit eleifend diam eu porttitor rhoncus felis elementum vivamus et. Viverra eleifend dolor urna, iaculis penatibus etiam. Ipsum curabitur eu suscipit bibendum auctor conubia nibh.

Conubia mollis eleifend maecenas sodales primis quis. Vestibulum etiam et ipsum mattis commodo vehicula congue ligula. Ipsum auctor nostra elementum, varius litora sapien risus lacus torquent. Pretium integer senectus rutrum lacus congue penatibus pretium sollicitudin. Vitae efficitur posuere curae commodo sodales aliquam orci quis aenean. Nam ullamcorper parturient sit sollicitudin netus arcu; consequat nunc libero. Non fusce sapien; justo taciti finibus lacus vestibulum parturient. Ad efficitur rhoncus rutrum, scelerisque dis vestibulum fermentum fusce. Elit euismod nibh inceptos donec volutpat.

Amet etiam enim sem sit adipiscing. Nullam enim imperdiet egestas euismod, varius dis ante hac! Himenaeos augue est magna justo fermentum hac augue. Morbi tempus potenti dui rhoncus rutrum tempor facilisis. Dolor netus ullamcorper porta convallis sodales malesuada proin amet. Malesuada eleifend quis maecenas quam at mattis feugiat. Interdum lobortis eu enim nibh nisi vestibulum eu sodales. Volutpat pretium lorem taciti neque elit maecenas feugiat tellus.        </p>
      </div>
    </>
  )
}

export default page