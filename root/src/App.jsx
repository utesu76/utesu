import React from 'react'
import moment from 'moment'
import dark from './assets/dark.svg'
import light from './assets/light.svg'

function App() {

  const [settings, setSettings] = React.useState(false)
  const [theme, setTheme] = React.useState('dark')
  const [lang, setLang] = React.useState(window.localStorage.getItem('lang') !== null ? window.localStorage.getItem('lang') : navigator.language.slice(0, 2) || navigator.userLanguage.slice(0, 2))

  const [data, setData] = React.useState({ profile: { name: 'Ian', position: 'Software Engineer', description: 'A student currently involved in Bachelor studies at the University of London, and pursuing a degree in Computer Science with a keen interest in full stack software development. With a solid foundation in programming languages such as HTML, CSS, and JavaScript, I have learned to design and build user-friendly websites and apps. Additionally, I am proficient in working with a variety of web development frameworks and libraries, including Tailwind, React and React Native. I am highly motivated, detail-oriented, and always eager to learn more. I am excited to apply my technical skills and knowledge to real-world projects!', image: '' }, experience: [ { name: 'Software Developer', position: 'Internship', date: { ja: '1月2021年 - 6月2021年', en: 'Jan 2021 - June 2021' }, description: 'Developed and deployed a Discord Bot written in NodeJS. Implemented a system to track work hours during the day with a MySQL database. Worked with Senior Developer to maintain and implement new WordPress features. Set-up and helped run bimonthly company conferences held on Zoom.', footnotes: 'Node.js, Express.js' } ], projects: [{ title: 'Full-stack Chat App with Real-time Messaging', subtitle: 'React, Tailwind, Node.js, Express.js, Postgres, Websockets, JWT, AWS SDK', description: 'Created a Real-time Chat App using React and Tailwind CSS running on Node.js, with Web-sockets. Chat app enables users to communicate with each other and share images. The app uses a RESTful API architecture, and stores user data in a Postgres Database, while using S3 Buckets to hold user uploads and avatars. It also implements an encrypted authentication system using JsonWebTokens. The app is also built with responsiveness in mind, as the app is designed for a variety of screen sizes, and even includes a language and theme switcher for accessibility purposes. The API also supports password, avatar, display name and email change requests. Self hosted on a RPi4 running Headless Ubuntu.', footnotes: 'Self-hosted Ubuntu, AWS S3', link: 'https://chat.utesu.com', github: '' }, { title: 'Custom URL Shortener', subtitle: 'React, Tailwind, Node.js, Express.js, Postgres, Cloudflare Turnstile', description: 'Created a simple URL Shortening website using React, Tailwind CSS and Node.js. Website allows users to shorten long links into short compact URLs hosted on a five letter domain. Implemented Cloudflare\'s Turnstile to differentiate bots from real users, as it is free to use, and is very user friendly. Hosted on an AWS EC2 Instance with an AWS RDS Database.', footnotes: 'AWS EC2, AWS RDS', link: 'https://ut3.su', github: '' }, { title: 'Simple Portfolio made with Tailwind CSS', subtitle: 'React, Tailwind, Express.js', description: 'Designed and developed a portfolio website using React, Tailwind CSS and Express.js, with responsiveness in mind. The website features a theme and language switcher to enhance user experience, and to better demonstrate my skills. The website is fully responsive and accessible on mobile devices, using Tailwind\'s breakpoints. The website is hosted on my RPi 4 running Headless Ubuntu, alongside the Real-time Chat App mentioned earlier.', footnotes: 'Self-hosted Ubuntu', link: 'https://utesu.com', github: '' }] })

  React.useEffect(() => {
    window.localStorage.setItem('lang', lang)
  }, [lang])

  function translate(key) {
    return translations[lang][key]
  }

  const translations = {
    en: {
      'toronto': 'Toronto',
      'new_tab': 'Open in a new tab',
      'projects': 'Projects',
      'experience': 'Experience',
      'language': 'Language',
      'theme': 'Theme',
      'dark': 'Dark',
      'light': 'Light',
      'en': 'English',
    },
    ja: {
      'toronto': 'トロント',
      'new_tab': '新しいタブで開く',
      'projects': 'プロジェクト',
      'experience': '経験',
      'language': '言語',
      'theme': 'テーマ',
      'dark': 'ダーク',
      'light': 'ライト',
      'ja': '日本語',
    }
  }

  const projects = data.projects.map((project) => {
    return (
      <article className='dark:bg-neutral-900 bg-neutral-100 p-4 mb-[12px] rounded flex flex-col'>
        <p className='text-xl font-medium'>{project.title}</p>
        <p className='dark:text-neutral-300 text-neutral-700 sm:whitespace-normal sm:overflow-auto overflow-scroll whitespace-nowrap'>{project.subtitle}</p>
        <p className='my-3'>{project.description}</p>
        <div className='flex flex-row'>
          <p className='dark:text-neutral-300 text-neutral-700 my-auto sm:w-full w-1/2 sm:whitespace-normal sm:overflow-auto whitespace-nowrap overflow-scroll'>{project.footnotes}</p>
          <button className='dark:bg-black bg-neutral-200 px-4 py-1 rounded ml-auto whitespace-nowrap' onClick={() => {
            window.open(project.link, '_blank')
          }}>
            {translate('new_tab')}
          </button>
        </div>
      </article>
    )
  })

  const experience = data.experience.map((job) => {
    return (
      <div className='dark:bg-neutral-900 bg-neutral-100 p-4 mb-[12px] rounded flex flex-col'>
        <p className='text-xl font-medium'>{job.name}</p>
        <div className='flex dark:text-neutral-300 text-neutral-700'>
          <p className='mr-auto'>{job.position}</p>
          <p className='ml-auto'>{job.date[lang]}</p>
        </div>
        <p className='my-3'>{job.description}</p>
        <div className='flex flex-row'>
          <p className='dark:text-neutral-300 text-neutral-700'>{job.footnotes}</p>
        </div>
      </div>
    )
  })

  const profile = (
    <>
      <div className='mr-auto'>
        <p className='text-4xl font-black'>{data.profile.name}</p>
        <p className='dark:text-neutral-300 text-neutral-700'>{data.profile.position}</p>
        <p className='mt-[20px]'>{data.profile.description}</p>
      </div>
    </>
  )

  return (
    <div className={`bg-${theme=='light'?'white':'black'} h-screen flex flex-col items-center font-light text-${theme=='light'?'black':'white'} overflow-x-hidden pb-[40px] ${theme}`} onClick={(event) => {if(settings == true){setSettings(false)}}}>
      {
        settings
        ?
        <div className='fixed w-[200px] dark:bg-neutral-700/50 bg-neutral-300/50 rounded backdrop-blur mt-[60px] sm:right-[auto] right-1 sm:ml-[700px] sm:mr-[0px] mr-[16px] flex flex-col animate-fade p-2 z-20'>
          <button className='flex my-auto' onClick={(event) => {
            event.stopPropagation();
            setTheme(theme === 'dark' ? 'light' : 'dark')
          }}>
            <p>{translate('theme')}: </p>
            <p className='ml-auto'>{translate(theme)}</p>
          </button>
          <hr className='border-1 border-neutral-600 my-[6px]' /> 
          <button className='flex my-auto' onClick={(event) => {
            event.stopPropagation();
            setLang(lang === 'en' ? 'ja' : 'en')
          }}>
            <p>{translate('language')}: </p>
            <p className='ml-auto'>{translate(lang)}</p>
          </button>
        </div>
        :
        <></>
      }
      <p className='text-center mx-auto my-auto fixed w-auto z-10 mt-[17px] text-black dark:text-white'>{moment().utc().subtract('hours', 5).format('HH:mm')}, {translate('toronto')}</p>
      <header className='flex items-center backdrop-blur dark:bg-black/50 bg-white/50 fixed w-screen h-[60px] text-white animate-fade px-[20px] sm:px-0'>
        <nav className='w-[540px] sm:w-[900px] m-auto flex'>
          <p className='font-bold text-2xl my-auto mr-auto text-black dark:text-white'>utesu</p>
          <button className='h-[24px] w-[24px] z-30 my-auto' onClick={() => {
              setSettings(!settings)
            }} >
            <img className='h-[24px] ml-auto my-auto' src={theme=='light'?light:dark} alt=""/>
          </button>
        </nav>
      </header>
      <div className='w-screen sm:w-[900px] animate-fade px-[20px] sm:px-0 mt-[20px]'>
        <section className='flex items-center mt-[60px]'>
          {profile}
        </section>
        <section className='flex flex-col mt-[40px]'>
          <h2 className='text-2xl font-medium mb-6'>{translate('experience')}</h2>
          {experience}
        </section>
        <section className='flex flex-col mt-[40px]'>
          <h2 className='text-2xl font-medium mb-6'>{translate('projects')}</h2>
          {projects}
          <a className='mr-auto hidden' href="">
            <div className='p-[8px] bg-neutral-900 rounded flex'>
              <p className='text-neutral-300 my-auto mr-[10px]'>View all projects</p>
              <img className='h-[16px] m-auto' src='' alt="" />
            </div>
          </a>
        </section>
      </div>
    </div>
  )
}

export default App