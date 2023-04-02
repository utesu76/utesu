import React from 'react'

import Channels from './pages/channels'
import Main from './pages/main'
import Login from './pages/login'
import Verify from './pages/verify'
import Register from './pages/register'
import Join from './pages/join'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

const api = 'https://api.utesu.com'

function App() {

  const [lang, setLang] = React.useState(window.localStorage.getItem('lang') !== null ? window.localStorage.getItem('lang') : navigator.language.slice(0, 2) || navigator.userLanguage.slice(0, 2))

  React.useEffect(() => {
    window.localStorage.setItem('lang', lang)
  }, [lang])

  const [mobile, setMobile] = React.useState(window.innerWidth < 768 ? true : false)

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setMobile(window.innerWidth < 768 ? true : false)
    })
  }, [])

  const translations = {
    'en': {
      'utesu': 'utesu',
      'login': 'Login',
      'username': 'Username',
      'password': 'Password',
      'email': 'Email',
      'continue': 'Continue',
      'register': 'Register',
      'create_account': 'Don\'t have an account?　',
      'have_an_account': 'Already have an account?　',
      'members': ' Members',
      'settings': 'Settings',
      'channel_owner': 'Channel Owner',
      'channel_info': 'Channel Info',
      'channel_url': 'Channel URL',
      'channel_creation_date': 'Channel Creation Date',
      'leave_channel': 'Leave Channel',
      'lang': 'English',
      'language': 'Language',
      'account': 'Account',
      'profile': 'Profile',
      'back': 'Back',
      'change_email': 'Change Email',
      'change_password': 'Change Password',
      'change_avatar': 'Change Avatar',
      'edit_username': 'Edit Display Name',
      'error': 'Wrong Username or Password',
      'incorrect_email': 'Incorrect Email',
      'short_password': 'Password must be at least 8 characters',
      'short_username': 'Username must be at least 3 characters',
      'username_in_use': 'Username is already in use',
      'login_with_google': 'Login with Google',
      'login_with_email': 'Login with Email',
      'logout': 'Logout',
      'confirm_email_msg': 'Please enter your email confirmation code',
      'confirm': 'Confirm',
      'confirmation_code': 'Confirmation Code',
      'false_code': 'Incorrect Confirmation Code',
      'create_channel': 'Create New Channel',
      'channel_name': 'Channel Name',
      'customize_channel': 'Customize Channel',
      'someones_channel': '\'s channel',
      'create_new_channel': 'Create New Channel',
      'enter_new_email': 'Enter New Email Address',
      'enter_new_password': 'Enter New Password',
      'enter_new_display_name': 'Enter New Display Name',
      'enter_current_password': 'Enter Current Password',
    },
    'ja': {
      'utesu': 'ウテス',
      'login': 'ログイン',
      'username': 'ユーザー名',
      'password': 'パスワード',
      'email': 'メールアドレス',
      'continue': 'はい',
      'register': '登録',
      'create_account': 'アカウントが必要ですか？　',
      'have_an_account': 'すでにアカウントをお持ちですか？　',
      'members': '人のメンバー',
      'settings': '設定',
      'channel_owner': 'チャンネルの所有者',
      'channel_info': 'チャンネルの情報',
      'channel_url': 'リンク',
      'channel_creation_date': 'チャンネルの作成日',
      'leave_channel': 'チャンネルから脱退',
      'lang': '日本語',
      'language': '言語',
      'account': 'アカウント',
      'profile': 'プロフィール',
      'back': '戻る',
      'change_email': 'メールアドレスを変更',
      'change_password': 'パスワードを変更',
      'change_avatar': 'アバターを変更',
      'edit_username': '表示名を編集',
      'error': 'ユーザー名またはパスワードが無効です',
      'incorrect_email': 'メールアドレスが正しくありません',
      'short_password': '最低８文字必要です',
      'short_username': '最低３文字必要です',
      'username_in_use': '既に登録されています',
      'login_with_google': 'Googleでログイン',
      'login_with_email': 'メールアドレスでログイン',
      'logout': 'ログアウト',
      'confirm_email_msg': 'メールアドレスの確認コードを入力してください',
      'confirm': '確認',
      'confirmation_code': '確認コード',
      'false_code': '確認コードが正しくありません',
      'create_channel': '新しいチャンネルを作成',
      'channel_name': 'チャンネル名',
      'customize_channel': 'チャンネルをカスタマイズ',
      'someones_channel': 'のチャンネル',
      'create_new_channel': '新規作成',
      'enter_new_email': '新しいメールアドレスを入力してください',
      'enter_new_password': '新しいパスワードを入力してください',
      'enter_new_display_name': '新しい表示名を入力してください',
      'enter_current_password': '現在のパスワードを入力してください',
    }
  }

  function translate(text) {
    return translations[lang][text];
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Main mobile={mobile} translate={translate} api={api} />} />
          <Route path="login" element={<Login mobile={mobile} translate={translate} api={api} />} />
          <Route path="join/:channel" element={<Join mobile={mobile} translate={translate} api={api} />} />
          <Route path="verify" element={<Verify mobile={mobile} translate={translate} api={api} />} />
          <Route path="login/:callback" element={<Login mobile={mobile} translate={translate} callback={true} api={api} />} />
          <Route path="register" element={<Register mobile={mobile} translate={translate} api={api} />} />
          <Route path="channels/:channelId" element={<Channels mobile={mobile} translate={translate} lang={lang} setLang={setLang} api={api} />} />
          <Route path="*" element={<Main mobile={mobile} translate={translate} api={api} />} />
        </Route>
      </Routes>
    </BrowserRouter>


    
/* <div>
{
  loggedIn
  ?
  typeof messages[0] == 'undefined'
  ?
  <div className='loading_container'>
    <p className='loading_text'>Loading...</p>
  </div>
  :
  <div className='flex h-screen overflow-x-hidden dark:bg-neutral-800 dark:text-white'>
    <Sidebar width={window.innerWidth} menu={menu} setMenu={setMenu} isMobile={isMobile} chatData={chatData} selectedChannel={selectedChannel} setSelectedChannel={setSelectedChannel} fetchMessages={fetchMessages} />
    <Chat showMenu={showMenu} isMobile={isMobile} chatData={chatData} inputFields={inputFields} setInputFields={setInputFields} selectedChannel={selectedChannel} setSelectedChannel={setSelectedChannel} messages={messages} setSelectedUser={setSelectedUser} />
  </div>
  :
  <Login inputFields={inputFields} setInputFields={setInputFields} login={login} setLoggedIn={setLoggedIn} />
}
</div> */





    
  )
}

export default App