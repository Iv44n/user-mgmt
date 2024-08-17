import { Box } from '@mui/material'
import { useUserStore } from '../store/userStore'
import { FormEvent, useState } from 'react'
import { validateName } from '../utils/validateForm'
import ButtonExtended from '../components/Button'
import BasicInput from '../components/BasicInput'

function NamePage() {
  const { user, updateUser } = useUserStore()
  const [name, setName] = useState(
    user?.name || { firstName: '', lastName: '' }
  )
  
  const firstNameError = validateName(name.firstName)
  const lastNameError = validateName(name.lastName)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!user || firstNameError.hasError || lastNameError.hasError) return
    await updateUser({ ...user, name })
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      height='100%'
    >
      <Box display='flex' flexDirection='column' gap={2}>
        <BasicInput
          id='first-name'
          label='First Name'
          value={name.firstName}
          handleChange={(value) => setName((prev) => ({ ...prev, firstName: value }))}
          error={firstNameError.hasError}
          helperText={firstNameError.helperText}
        />
        <BasicInput
          id='last-name'
          label='Last Name'
          value={name.lastName}
          handleChange={(value) => setName((prev) => ({ ...prev, lastName: value }))}
          error={lastNameError.hasError}
          helperText={lastNameError.helperText}
        />
      </Box>
      <ButtonExtended disabled={firstNameError.hasError || lastNameError.hasError}/>
    </Box>
  )
}

export default NamePage
