import DisplayOption from '../components/DisplayOption'
import { useUserStore } from '../store/userStore'
import { User } from '../types/user'

function Home() {
  const user = useUserStore(state => state.user) || {} as User
  
  return (
    <article className='border border-blue-300 rounded-xl bg-white'>
      <DisplayOption
        title='Name'
        value={`${user.name.firstName} ${user.name.lastName}`}
        to='name'
      />
      <DisplayOption title='User Name' value={user.username} to='username' />
      <DisplayOption title='Email' value={user.email} to='' />
      <DisplayOption
        title='Phone Number'
        value={user.phoneNumber || 'Add Phone Number'}
        to=''
      />
      <DisplayOption title='Change Password' to='changePassword' value='' />
    </article>
  )
}

export default Home
