import { TextField } from '@mui/material'

interface Props {
  id: string
  label: string
  value: string
  handleChange: (value: string, inputId: string) => void
  error?: boolean
  helperText?: string
}

function BasicInput({
  id,
  label,
  value,
  handleChange,
  error,
  helperText,
}: Props) {
  return (
    <TextField
      id={id}
      label={label}
      variant='outlined'
      fullWidth
      value={value}
      onChange={(e) => handleChange(e.target.value, id)}
      size='medium'
      sx={{ backgroundColor: 'white' }}
      error={error}
      helperText={helperText}
    />
  )
}

export default BasicInput
