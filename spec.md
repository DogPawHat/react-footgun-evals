# Prompt Evaluation Website - Developer Specification

## Project Overview

A static website that evaluates programming prompts for accuracy and currency, initially focusing on React. The site displays evaluation scores, grades, and commentary on common programming prompts to help users identify outdated or incorrect information.

## Technical Requirements

### Frontend Architecture

- **Framework**: React with Tanstack Start
- **Styling**: Tailwind CSS with Shadcn UI components
- **Build/Bundling**: Configure for optimal performance with code splitting
- **State Management**: React's built-in state management (useState, useContext)
- **Routing**: Simple routing for potential future expansion

### Backend/Data Architecture

- **Database**: Convex (pre-configured)
- **Data Schema**:

  ```typescript
  type Prompt = {
    id: string;
    text: string;
    technology: string;
    evaluations: Evaluation[];
  };

  type Evaluation = {
    timestamp: Date;
    score: number; // 0-100
    grade: "S" | "A" | "B" | "C" | "D" | "F";
    commentary: string;
    output: string; // The full response to the prompt
  };
  ```

- **API**: Static data fetching from Convex during build time

### Deployment

- **Platform**: Netlify
- **Build Configuration**: Set up automatic builds from repository
- **Environment Variables**: Configure for development/production environments

## Functional Requirements

### Prompt Display

1. Display prompts organized by technology category
2. Each prompt card should show:
   - Full prompt text
   - Current percentage score (0-100%)
   - Letter grade (S through F)
   - Last evaluation timestamp
   - Collapsible section to view full output

### Evaluation System

1. Implement a simple word grep tool that scans responses for outdated technologies
2. For React prompts, specifically check for:
   - References to Create React App (deprecated)
   - Outdated React patterns (class components without hooks alternatives)
   - Outdated package versions
3. Weekly cron job to re-evaluate prompts (implementation outside of frontend)

### User Interface

1. Responsive design that works well on mobile and desktop
2. Implement collapsible sections for prompt outputs
3. Clear visual hierarchy with prompt text prominently displayed
4. Playful, slightly snarky design aesthetic

## Component Breakdown

### `<App />`

- Main application container
- Handles routing (if expanded in the future)

### `<PromptList />`

- Displays all prompts for a given technology
- Handles grouping by technology

### `<PromptCard />`

- Displays individual prompt with its evaluation
- Props:
  - `prompt`: Prompt object
  - `latestEvaluation`: Most recent evaluation object

### `<CollapsibleOutput />`

- Toggleable component to show/hide the full output
- Props:
  - `output`: String containing the full response
  - `isOpen`: Boolean to control visibility
  - `onToggle`: Function to handle open/close

### `<EvaluationBadge />`

- Displays the score and grade
- Props:
  - `score`: Number (0-100)
  - `grade`: String ("S" through "F")

## Data Flow

1. Data is pre-fetched from Convex during build time
2. Static pages are generated with all prompt and evaluation data
3. User interactions (like expanding collapsible sections) are handled client-side
4. No data mutations occur on the frontend

## Error Handling

1. **Data Loading Errors**:

   - Implement fallback UI for missing data
   - Log build errors during static generation

2. **UI Error Boundaries**:

   - Implement React Error Boundaries around key components
   - Provide user-friendly error states

3. **Missing Data Handling**:
   - Gracefully handle missing fields in prompt or evaluation objects
   - Provide default values where appropriate

## Performance Considerations

1. **Image Optimization**:

   - Optimize any images used in the UI
   - Implement lazy loading for images

2. **Code Splitting**:

   - Split code by route/component for faster initial load

3. **Static Generation**:
   - Pre-render all pages at build time for optimal performance

## Accessibility Requirements

1. Ensure proper contrast ratios for text readability
2. Implement proper ARIA attributes for interactive elements
3. Ensure keyboard navigation works for all interactive elements
4. Test with screen readers

## Testing Plan

### Unit Tests

- Test individual components with Jest and React Testing Library
- Focus on component rendering and state changes
- Mock data for consistent test results

### Component Tests

- Test component interactions (e.g., collapsible sections)
- Verify proper rendering of evaluation data

### Accessibility Tests

- Run automated accessibility tests (Axe, Lighthouse)
- Perform manual keyboard navigation testing

### Responsive Tests

- Test on multiple viewport sizes
- Verify breakpoints work as expected

## Development Workflow

1. Set up project with React and Tanstack Start
2. Implement core components with mock data
3. Style with Tailwind and Shadcn
4. Connect to Convex data source
5. Implement responsive design
6. Test thoroughly
7. Deploy to Netlify

## Future Expansion Considerations

While not part of the MVP, the architecture should accommodate:

- Additional technology categories beyond React
- Historical data visualization
- Search and filtering capabilities
- LLM-generated commentary

## Deliverables

1. Source code repository with:

   - Complete React application
   - README with setup instructions
   - Build configuration for Netlify

2. Deployment to Netlify with:
   - Production build
   - Proper environment configuration
   - Build hooks for future updates

This specification provides all necessary details for a developer to implement the Prompt Evaluation Website as discussed. The architecture is designed to be simple yet expandable, focusing on delivering a high-quality MVP that can grow over time.
