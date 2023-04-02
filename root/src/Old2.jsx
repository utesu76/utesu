import React from 'react'
import moment from 'moment'
import dark from './assets/dark.svg'
import link from './assets/link.svg'
import github from './assets/github.svg'

function App() {

  const [theme, setTheme] = React.useState('dark')

  const isLoaded = true

  return (
    <div className='bg-black h-screen flex flex-col items-center font-light text-white overflow-x-hidden '>
      <p className='text-center mx-auto my-auto fixed w-screen z-10 mt-[20px]'>{moment().utc().subtract('hours', 5).format('HH:mm')}, Toronto</p>
      <header className='flex items-center backdrop-blur bg-black/50 fixed w-screen h-[60px] text-white animate-fade px-[20px] sm:px-0'>
        <nav className='w-[540px] sm:w-[900px] m-auto flex'>
          <p className='font-bold text-2xl my-auto mr-auto'>utesu</p>
          <button className='ml-auto '><img className='h-[24px] mx-auto my-auto' src={dark} alt="" /></button>
        </nav>
      </header>
      <div className='w-screen sm:w-[900px] animate-fade px-[20px] sm:px-0'>
        <section className='flex items-center mt-[60px]'>
          <div className='max-w-[600px] mr-auto'>
            <p className='text-4xl font-black'>Name</p>
            <p className=''>Software Engineer</p>
            <p className='text-neutral-300 mt-[20px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi iste ipsum voluptates? Quasi iste ipsum voluptates? Quasi iste ipsum voluptates? Quasi iste ipsum voluptates? Quasi iste ipsum voluptates?</p>
          </div>
          <img className='rounded-full w-[200px] hidden sm:flex' src="https://cdn.discordapp.com/attachments/853033792097091604/1063859627420299464/images.jpg" alt="" />
        </section>
        <section className='flex flex-col mt-[60px]'>
          <h2 className='text-2xl font-medium'>Experience</h2>
          <article className='bg-neutral-900 rounded mt-[20px] flex flex-col p-[16px]'>
            <h2 className='font-medium text-xl'>Software Engineer</h2>
            <div className='text-neutral-300 flex mb-[14px]'>
              <p className='mr-auto'>Lorem ipsum</p>
              <p>June 2024 - present</p>
            </div>
            <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi iste ipsum voluptates? Quasi iste ipsum voluptates? Quasi iste ipsum voluptates? Quasi iste ipsum voluptates? Quasi iste ipsum voluptates?</p>
            <p className='text-neutral-300 mt-[14px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </article>
          <article className='bg-neutral-900 rounded mt-[20px] flex flex-col p-[16px]'>
            <h2 className='font-medium text-xl'>Software Engineer</h2>
            <div className='text-neutral-300 flex mb-[14px]'>
              <p className='mr-auto'>Lorem ipsum</p>
              <p>June 2022 - June 2024</p>
            </div>
            <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi iste ipsum voluptates? Quasi iste ipsum voluptates? Quasi iste ipsum voluptates? Quasi iste ipsum voluptates? Quasi iste ipsum voluptates? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi iste ipsum voluptates? Quasi iste ipsum voluptates? Quasi iste ipsum voluptates? Quasi iste ipsum voluptates? Quasi iste ipsum voluptates?</p>
            <p className='text-neutral-300 mt-[14px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </article>
        </section>
        <section className='flex flex-col mt-[60px] mb-[60px]'>
          <h2 className='text-2xl font-medium'>Projects</h2>
          <article className='bg-neutral-900 rounded mt-[20px] flex'>
            <div className='flex flex-col sm:flex-row items-center mr-auto'>
              {
                isLoaded
                ?
                <img src="https://images.unsplash.com/photo-1558637845-c8b7ead71a3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8MTYlM0E5fGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" className='min-h-[287px] min-w-[510px] sm:min-h-[160px] sm:min-w-[284px] rounded m-[16px]' />
                :
                <div className='min-h-[287px] min-w-[510px] sm:min-h-[160px] sm:min-w-[284px] bg-neutral-800 rounded m-[16px] animate-pulse'></div>
              }
              <div className='flex flex-col h-full mx-[16px] sm:mx-0'>
                <h2 className={isLoaded?'font-medium text-xl mb-auto sm:mt-[30px]':'sm:mb-auto sm:mt-[30px] mb-[16px] text-neutral-800 bg-neutral-800 animate-pulse rounded w-[120px] h-[24px] overflow-hidden'}>Lorem ipsum</h2>
                <p className={isLoaded?'my-auto w-auto':' mb-[16px] sm:my-auto text-neutral-800 bg-neutral-800 animate-pulse rounded w-[514px] h-[48px] overflow-hidden'}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi iste ipsum voluptates? Quasi iste ipsum voluptates? Quasi iste ipsum voluptates? Quasi iste ipsum voluptates? Quasi iste ipsum voluptates?</p>
                <p className={isLoaded?'text-neutral-300 mt-auto mb-[16px] sm:mb-[30px]':'mt-auto mb-[16px] sm:mb-[30px] text-neutral-800 bg-neutral-800 animate-pulse rounded w-[240px] h-[24px] overflow-hidden'}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
              {
                isLoaded
                ?
                <div className='flex sm:flex-col mb-[16px] sm:mr-[16px]'>
                  <a href="">
                    <div className='h-[38px] w-[38px] bg-neutral-800 rounded mx-[8px] sm:mb-[18px] flex content-center items-center'>
                      <img className='h-[22px] m-auto' src={github} alt="" />
                    </div>
                  </a>
                  <a href="">
                    <div className='h-[38px] w-[38px] bg-neutral-800 rounded mx-[8px] flex content-center items-center'>
                      <img className='h-[20px] m-auto' src={link} alt="" />
                    </div>
                  </a>
                </div>
                :
                <div className='flex sm:flex-col mb-[16px] sm:ml-[8px] sm:my-[16px]'>
                  <div className='h-[38px] w-[38px] bg-neutral-800 rounded mx-[8px] sm:mb-[18px] animate-pulse'></div>
                  <div className='h-[38px] w-[38px] bg-neutral-800 rounded mx-[8px] animate-pulse'></div>
                </div>
              }
            </div>   
          </article>
          <article className='bg-neutral-900 rounded mt-[20px] flex'>
            <div className='flex flex-col sm:flex-row items-center mr-auto'>
              {
                isLoaded
                ?
                <img src="https://images.unsplash.com/photo-1558637845-c8b7ead71a3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8MTYlM0E5fGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" className='min-h-[287px] min-w-[510px] sm:min-h-[160px] sm:min-w-[284px] rounded m-[16px]' />
                :
                <div className='min-h-[287px] min-w-[510px] sm:min-h-[160px] sm:min-w-[284px] bg-neutral-800 rounded m-[16px] animate-pulse'></div>
              }
              <div className='flex flex-col h-full mx-[16px] sm:mx-0'>
                <h2 className={isLoaded?'font-medium text-xl mb-auto sm:mt-[30px]':'sm:mb-auto sm:mt-[30px] mb-[16px] text-neutral-800 bg-neutral-800 animate-pulse rounded w-[120px] h-[24px] overflow-hidden'}>Lorem ipsum</h2>
                <p className={isLoaded?'my-auto w-auto':' mb-[16px] sm:my-auto text-neutral-800 bg-neutral-800 animate-pulse rounded w-[514px] h-[48px] overflow-hidden'}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi iste ipsum voluptates? Quasi iste ipsum voluptates? Quasi iste ipsum voluptates? Quasi iste ipsum voluptates? Quasi iste ipsum voluptates?</p>
                <p className={isLoaded?'text-neutral-300 mt-auto mb-[16px] sm:mb-[30px]':'mt-auto mb-[16px] sm:mb-[30px] text-neutral-800 bg-neutral-800 animate-pulse rounded w-[240px] h-[24px] overflow-hidden'}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
              {
                isLoaded
                ?
                <div className='flex sm:flex-col mb-[16px] sm:mr-[16px]'>
                  <a href="">
                    <div className='h-[38px] w-[38px] bg-neutral-800 rounded mx-[8px] sm:mb-[18px] flex content-center items-center'>
                      <img className='h-[22px] m-auto' src={github} alt="" />
                    </div>
                  </a>
                  <a href="">
                    <div className='h-[38px] w-[38px] bg-neutral-800 rounded mx-[8px] flex content-center items-center'>
                      <img className='h-[20px] m-auto' src={link} alt="" />
                    </div>
                  </a>
                </div>
                :
                <div className='flex sm:flex-col mb-[16px] sm:ml-[8px] sm:my-[16px]'>
                  <div className='h-[38px] w-[38px] bg-neutral-800 rounded mx-[8px] sm:mb-[18px] animate-pulse'></div>
                  <div className='h-[38px] w-[38px] bg-neutral-800 rounded mx-[8px] animate-pulse'></div>
                </div>
              }
            </div>   
          </article>
          <a className='mr-auto' href="">
            {
              isLoaded
              ?
              <div className='p-[8px] bg-neutral-900 mt-[20px] rounded flex'>
                <p className='text-neutral-300 my-auto mr-[10px]'>View all projects</p>
                <img className='h-[16px] m-auto' src={link} alt="" />
              </div>
              :
              <div className='h-[40px] w-[159px] p-[8px] bg-neutral-900 mt-[20px] rounded flex'>
                <div className=' bg-neutral-800 h-[20px] w-full my-auto rounded animate-pulse'></div>
                <div className=' bg-neutral-800 ml-[10px] my-auto h-[20px] w-[24px] rounded animate-pulse'></div>
              </div>
            }
          </a>
        </section>
      </div>
    </div>
  )
}

export default App