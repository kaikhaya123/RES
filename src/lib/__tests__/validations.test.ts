import { validateEmail, validatePassword, sanitizeInput } from '@/lib/validations'

describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    it('validates correct email addresses', () => {
      expect(validateEmail('user@example.com')).toBe(true)
      expect(validateEmail('test.email@domain.co.za')).toBe(true)
    })

    it('rejects invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false)
      expect(validateEmail('user@')).toBe(false)
      expect(validateEmail('@example.com')).toBe(false)
    })

    it('handles edge cases', () => {
      expect(validateEmail('')).toBe(false)
      expect(validateEmail('   ')).toBe(false)
    })
  })

  describe('validatePassword', () => {
    it('validates strong passwords', () => {
      expect(validatePassword('SecurePass123!')).toBe(true)
      expect(validatePassword('MyP@ssw0rd')).toBe(true)
    })

    it('rejects weak passwords', () => {
      expect(validatePassword('weak')).toBe(false)
      expect(validatePassword('12345678')).toBe(false)
      expect(validatePassword('nouppercaseornumber')).toBe(false)
    })

    it('enforces minimum length', () => {
      expect(validatePassword('Pass1!')).toBe(false)
    })
  })

  describe('sanitizeInput', () => {
    it('removes dangerous characters', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe('')
      expect(sanitizeInput('normal text')).toBe('normal text')
    })

    it('trims whitespace', () => {
      expect(sanitizeInput('  text  ')).toBe('text')
    })

    it('prevents injection attacks', () => {
      const dangerous = "'; DROP TABLE users; --"
      expect(sanitizeInput(dangerous)).not.toContain('<')
    })
  })
})
