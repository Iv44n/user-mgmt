import { Button } from '@mui/material'

interface Props {
  disabled?: boolean
}

function ButtonExtended({ disabled }: Props) {
  return (
    <Button
      disabled={disabled}
      variant='contained'
      type='submit'
      color='success'
      fullWidth
    >
      Save
    </Button>
  )
}

export default ButtonExtended
