import DisplayOption from '../components/DisplayOption'
import { useUserStore } from '../store/userStore'

function Home() {
  const user = useUserStore((state) => state.user)

  if (!user) return <div>loading...</div>

  return (
    <article className='border border-blue-300 rounded-xl bg-white'>
      <DisplayOption
        title='Name'
        value={`${user.name.firstName} ${user.name.lastName}`}
        to='name'
      />
      <DisplayOption title='User Name' value={user.username} to='username' />
      <DisplayOption title='Email' value={user.email} to='home' />
      <DisplayOption
        title='Phone Number'
        value={user.phoneNumber || 'Add Phone Number'}
        to='home'
      />
      <DisplayOption title='Change Password' to='changePassword' value='' />
    </article>
  )
}

export default Home
