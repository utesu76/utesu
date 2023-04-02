import React from 'react'


import moment from 'moment'

import dark from './assets/dark.svg'

function App() {

  const [theme, setTheme] = React.useState('dark')

  const isLoaded = false

  return (
    <div className='app' theme={theme}>
      <p className='time'>{moment().utc().subtract('hours', 5).format('HH:mm')}, Toronto</p>
      <header>
        <nav>
          <div>
            <a className='nav-btn' href="">Home</a>
            <a className='nav-btn' href="">Projects</a>
          </div>
          <button className='theme-toggle' onClick={() => {setTheme((prevTheme) => {return prevTheme == 'dark'?'light':'dark'})}}><img className='icon' src={dark} alt="" /></button>
        </nav>
      </header>
      <div className='container'>
        <div className='about'>
          <div>
            <p className='title'>Name</p>
            <p className='subtitle'>Software Engineer</p>
            <p className='desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi iste ipsum voluptates? Architecto perferendis velit aliquam eius aliquid id placeat est.</p>
          </div>
          <img className='pfp' src="https://cdn.discordapp.com/attachments/853033792097091604/1063859627420299464/images.jpg" alt="" />
        </div>
        <section>
          <h2>Projects</h2>
          <div className='project'>
            {
              isLoaded
              ?
              <img className='demo' src="https://www.madflows.dev/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fmadflows-dev.appspot.com%2Fo%2Ffiles%252Fscreenshot-rocks.png%3Falt%3Dmedia%26token%3Daa4f0957-dfdb-47b1-bf85-0c73be234d60&w=256&q=100" alt="" />
              :
              <div className='demo loading'></div>
            }
            <div className='project-con'>
              <h3 className='loading'>Hyper</h3>
              <p className='other-sub loading'>Landing Page for a Cloud-based collaboration and communities chat that's free, secure and works on both your desktop and phone.</p>
              <p className='subtitle loading'>reactjs, tailwindcss, framer motion, nextjs, styled-components</p>
            </div>
            <div className='button-con'>
              <button className='theme-toggle2 loading' ></button>
              <button className='theme-toggle2 loading' ></button>
            </div>
          </div>
          <div className='project'>
            {
              isLoaded
              ?
              <img className='demo' src="https://www.madflows.dev/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fmadflows-dev.appspot.com%2Fo%2Ffiles%252Fscreenshot-rocks.png%3Falt%3Dmedia%26token%3Daa4f0957-dfdb-47b1-bf85-0c73be234d60&w=256&q=100" alt="" />
              :
              <div className='demo loading'></div>
            }
            <div className='project-con'>
              <h3 className='loading'>Hyper</h3>
              <p className='other-sub loading'>Landing Page for a Cloud-based collaboration and communities chat that's free, secure and works on both your desktop and phone.</p>
              <p className='subtitle loading'>reactjs, tailwindcss, framer motion, nextjs, styled-components</p>
            </div>
            <div className='button-con'>
              <button className='theme-toggle2 loading' ></button>
              <button className='theme-toggle2 loading' ></button>
            </div>
          </div>
          <div className='project'>
            {
              isLoaded
              ?
              <img className='demo' src="https://www.madflows.dev/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fmadflows-dev.appspot.com%2Fo%2Ffiles%252Fscreenshot-rocks.png%3Falt%3Dmedia%26token%3Daa4f0957-dfdb-47b1-bf85-0c73be234d60&w=256&q=100" alt="" />
              :
              <div className='demo loading'></div>
            }
            <div className='project-con'>
              <h3 className='loading'>Hyper</h3>
              <p className='other-sub loading'>Landing Page for a Cloud-based collaboration and communities chat that's free, secure and works on both your desktop and phone.</p>
              <p className='subtitle loading'>reactjs, tailwindcss, framer motion, nextjs, styled-components</p>
            </div>
            <div className='button-con'>
              <button className='theme-toggle2 loading' ></button>
              <button className='theme-toggle2 loading' ></button>
            </div>
          </div>
          <div className='project'>
            {
              isLoaded
              ?
              <img className='demo' src="https://www.madflows.dev/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fmadflows-dev.appspot.com%2Fo%2Ffiles%252Fscreenshot-rocks.png%3Falt%3Dmedia%26token%3Daa4f0957-dfdb-47b1-bf85-0c73be234d60&w=256&q=100" alt="" />
              :
              <div className='demo loading'></div>
            }
            <div className='project-con'>
              <h3 className='loading'>Hyper</h3>
              <p className='other-sub loading'>Landing Page for a Cloud-based collaboration and communities chat that's free, secure and works on both your desktop and phone.</p>
              <p className='subtitle loading'>reactjs, tailwindcss, framer motion, nextjs, styled-components</p>
            </div>
            <div className='button-con'>
              <button className='theme-toggle2 loading' ></button>
              <button className='theme-toggle2 loading' ></button>
            </div>
          </div>
          <div className='project'>
            {
              isLoaded
              ?
              <img className='demo' src="https://www.madflows.dev/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fmadflows-dev.appspot.com%2Fo%2Ffiles%252Fscreenshot-rocks.png%3Falt%3Dmedia%26token%3Daa4f0957-dfdb-47b1-bf85-0c73be234d60&w=256&q=100" alt="" />
              :
              <div className='demo loading'></div>
            }
            <div className='project-con'>
              <h3 className='loading'>Hyper</h3>
              <p className='other-sub loading'>Landing Page for a Cloud-based collaboration and communities chat that's free, secure and works on both your desktop and phone.</p>
              <p className='subtitle loading'>reactjs, tailwindcss, framer motion, nextjs, styled-components</p>
            </div>
            <div className='button-con'>
              <button className='theme-toggle2 loading' ></button>
              <button className='theme-toggle2 loading' ></button>
            </div>
          </div>
        </section>
        <section>
          <h2>Experience</h2>
          <div className='experience loading'>
            
          </div>
          <div className='experience'>
            <h3>Software Engineer</h3>
            <div className='temp'>
              <p>Shopify</p>
              <p>June 2020 - present</p>
            </div>
            <p>Developed Stuffs</p>
            <p>Nodejs, Express</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App