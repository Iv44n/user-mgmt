export const validateName = (name: string) => ({
  hasError: name.trim().length <= 3,
  helperText: name.trim().length > 3 ? '' : 'Must be at least 3 characters',
})
