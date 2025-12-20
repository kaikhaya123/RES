# Testing & Quality Assurance Guide

## Quick Start

```bash
# Run tests
npm test

# Run tests in CI mode (no watch)
npm run test:ci

# Generate coverage report
npm run test:coverage

# Check types
npm run type-check

# Format code
npm run format

# Lint code
npm run lint
```

## Testing Overview

The R.E.S. platform uses a comprehensive testing strategy covering:
- **Unit Tests:** Individual components and functions
- **Integration Tests:** API routes and user flows
- **Component Tests:** React component rendering and interactions
- **E2E Tests:** Full user journeys (planned)
- **Performance Tests:** Core Web Vitals monitoring

## Unit Tests

### Running Unit Tests

```bash
# Watch mode
npm test

# Single run
npm test -- --no-coverage

# Specific test file
npm test -- Navbar.test.tsx

# Watch specific file
npm test -- --watch Navbar.test.tsx
```

### Writing Unit Tests

Example test structure:

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import MyComponent from '@/components/MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })

  it('handles user interactions', () => {
    render(<MyComponent />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(screen.getByText('Clicked')).toBeInTheDocument()
  })
})
```

### Test Files Location
- Place test files in `__tests__` directory
- Or use `.test.tsx` or `.spec.tsx` suffix
- Keep same directory structure as source files

## Component Tests

### Navbar Component Tests
```bash
npm test -- Navbar.test.tsx
```

Tests included:
- Logo rendering
- Navigation links display
- Mobile menu toggle
- Scroll handling
- Accessibility attributes

### Adding More Component Tests

Create tests for:
- Hero component
- VotingSection component
- Statistics component
- Forms and inputs
- Modals and dialogs

## API Integration Tests

### Structure

```typescript
// __tests__/api/vote.test.ts
import { POST } from '@/app/api/vote/route'

describe('Vote API', () => {
  it('creates a vote successfully', async () => {
    const request = new Request('http://localhost:3000/api/vote', {
      method: 'POST',
      body: JSON.stringify({
        contestantId: 'uuid',
        voteCount: 5,
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(201)
  })
})
```

### API Endpoints to Test
- Authentication (register, login, logout)
- Voting system (cast vote, get stats)
- Contestants (list, details, search)
- Quizzes (get daily, submit answer, stats)
- Nominations (create, get status)

## Coverage Reports

Generate detailed coverage report:

```bash
npm run test:coverage
```

This generates:
- Line coverage
- Branch coverage
- Function coverage
- Statement coverage

**Target Coverage:**
- Statements: 80%+
- Branches: 75%+
- Functions: 80%+
- Lines: 80%+

View HTML report:
```bash
npm run test:coverage
# Open coverage/index.html in browser
```

## Error Handling Tests

Test error boundaries and error handling:

```typescript
describe('Error Handling', () => {
  it('catches errors in error boundary', () => {
    const ThrowError = () => {
      throw new Error('Test error')
    }

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
  })
})
```

## Accessibility (a11y) Tests

Automated accessibility testing:

```bash
npm install --save-dev jest-axe

# In test file:
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

it('has no a11y violations', async () => {
  const { container } = render(<Navbar />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

## Performance Testing

### Web Vitals Monitoring

```bash
# Build and test production bundle
npm run build
npm start
```

Monitor these metrics:
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

See [PERFORMANCE_TESTING_GUIDE.md](./PERFORMANCE_TESTING_GUIDE.md) for detailed instructions.

### Lighthouse Audits

In Chrome DevTools:
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Click "Analyze page load"
4. View detailed report

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+

## Type Checking

Ensure type safety:

```bash
# Check for TypeScript errors
npm run type-check

# Fix common issues
npm run lint -- --fix
```

## Code Quality

### Formatting

```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

### Linting

```bash
# Run ESLint
npm run lint

# Fix linting issues
npm run lint -- --fix
```

## Continuous Integration (CI)

GitHub Actions workflow for automated testing:

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm install
      - run: npm run type-check
      - run: npm run lint
      - run: npm run test:ci
      - run: npm run build
```

## Manual Testing Checklist

### Desktop Testing
- [ ] Test on Chrome (Latest)
- [ ] Test on Firefox (Latest)
- [ ] Test on Safari (Latest)
- [ ] Test on Edge (Latest)
- [ ] Run Lighthouse audit
- [ ] Check all forms work correctly
- [ ] Test navigation flow
- [ ] Verify images load properly

### Mobile Testing
- [ ] Test on iPhone (Safari)
- [ ] Test on Android (Chrome)
- [ ] Test on tablet
- [ ] Verify responsive layout
- [ ] Test touch interactions
- [ ] Test on 3G/4G throttling

### Browser Features
- [ ] Test with JavaScript disabled
- [ ] Test with cookies disabled
- [ ] Test with private/incognito mode
- [ ] Test with extensions disabled

### User Flows to Test
- [ ] New user registration
- [ ] User login/logout
- [ ] Vote casting
- [ ] Quiz participation
- [ ] Contestant nomination
- [ ] Dashboard access
- [ ] Admin functions
- [ ] Error handling

## Bug Reporting Template

```markdown
## Bug Report

**Title:** [Clear, concise description]

**Environment:**
- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]
- Device: [Desktop/Mobile]
- Network: [Normal/3G/4G]

**Steps to Reproduce:**
1. [First action]
2. [Second action]
3. [Observed behavior]

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Screenshots/Videos:**
[If applicable]

**Console Errors:**
[Any JavaScript errors from DevTools]

**Severity:** [Critical/High/Medium/Low]
```

## Testing Best Practices

### Do's ✓
- Write tests for critical user flows
- Test both happy path and error cases
- Use meaningful test descriptions
- Mock external dependencies
- Isolate tests (no interdependencies)
- Keep tests focused and small
- Test accessibility
- Monitor performance metrics

### Don'ts ✗
- Don't test implementation details
- Don't rely on timing (setTimeout)
- Don't test third-party libraries
- Don't create flaky tests
- Don't skip error handling
- Don't ignore accessibility
- Don't write tests that only pass locally

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web Vitals Guide](https://web.dev/vitals/)

## CI/CD Status

View the status of all tests and builds:
- GitHub Actions: https://github.com/[repo]/actions
- Code Coverage: https://app.codecov.io/[repo]
- Performance: https://speedcurve.com/[project]

---

**Last Updated:** December 21, 2025
**Maintained by:** R.E.S. Development Team
