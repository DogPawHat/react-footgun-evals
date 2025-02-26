# React Prompt Evaluation Website - Implementation Blueprint

## Overview

This blueprint outlines the implementation process for building a static website that evaluates programming prompts for accuracy, with a focus on React. The site will display evaluation scores, grades, and commentary on programming prompts to help users identify outdated or incorrect information.

## Step-by-Step Blueprint

### Phase 1: Project Setup and Structure

1. Initialize project with React and Tanstack Start
2. Configure Tailwind CSS and Shadcn UI
3. Set up project directory structure
4. Configure build and bundling for optimal performance
5. Set up routing

### Phase 2: Core Components and UI Implementation

1. Create base App component
2. Implement PromptList component
3. Implement PromptCard component
4. Create CollapsibleOutput component
5. Design and implement EvaluationBadge component
6. Implement responsive layout with Tailwind

### Phase 3: Data and State Management

1. Configure Convex integration
2. Implement data schema
3. Create data fetching utilities
4. Set up state management using React hooks

### Phase 4: Feature Implementation

1. Implement technology category filtering
2. Build collapsible sections for prompt outputs
3. Design and implement grade visualization
4. Add timestamp display and formatting

### Phase 5: Refinement and Deployment

1. Implement error handling and fallbacks
2. Add accessibility features
3. Optimize performance (code splitting, etc.)
4. Configure Netlify deployment
5. Set up environment variables

## Iterative Implementation Chunks

Breaking the above into smaller, iterative chunks:

### 1. Initial Project Setup

- Initialize React app with Tanstack Start
- Set up basic file structure
- Configure Tailwind CSS

### 2. UI Component Foundation

- Create basic App component
- Implement initial page layout
- Add Shadcn UI integration

### 3. Core Component Implementation - Part 1

- Create PromptList component with mock data
- Implement basic PromptCard structure
- Add styling for basic components

### 4. Core Component Implementation - Part 2

- Create EvaluationBadge component
- Implement CollapsibleOutput component
- Connect components together

### 5. State Management and Data Structure

- Set up React state hooks
- Implement context if needed
- Create data models matching schema

### 6. Convex Integration

- Configure Convex connection
- Set up data fetching utilities
- Implement mock data for development

### 7. UI Refinement

- Improve responsive design
- Enhance component styling
- Implement dark/light mode if desired

### 8. Feature Polish

- Add error boundaries
- Implement loading states
- Add accessibility attributes

### 9. Build and Deployment

- Configure build process
- Set up Netlify deployment
- Configure environment variables

## Final Implementation Steps (Refined)

After further refinement, here are the right-sized implementation steps:

### Step 1: Basic Project Setup

- Initialize React with Tanstack Start
- Configure Tailwind CSS
- Set up basic project structure

### Step 2: Component Skeleton

- Create App component with basic layout
- Add placeholder components for PromptList and PromptCard
- Set up basic routing structure

### Step 3: UI Components - Part 1

- Implement PromptList component with static data
- Style with Tailwind and Shadcn UI
- Add basic responsive design

### Step 4: UI Components - Part 2

- Implement PromptCard component
- Create EvaluationBadge component
- Add proper styling and layout

### Step 5: Interactive Features

- Implement CollapsibleOutput component
- Add toggle functionality
- Style expanded/collapsed states

### Step 6: Data Structure

- Create interfaces for Prompt and Evaluation
- Set up mock data matching schema
- Implement data context

### Step 7: Convex Integration

- Configure Convex connection
- Create data fetching utilities
- Replace mock data with real data fetching

### Step 8: Refinement

- Add error handling
- Implement loading states
- Add accessibility attributes

### Step 9: Build and Deploy

- Configure build process
- Set up Netlify deployment
- Test production build

## LLM Code Generation Prompts

### Prompt 1: Project Initialization

```
Create a new React project for a Prompt Evaluation Website using Tanstack, Tailwind CSS, and Shadcn UI. The site will display evaluations of programming prompts to help users identify outdated or incorrect information.

Please create:
1. The initial project setup with proper directory structure
2. Configuration for Tailwind CSS
3. Integration with Shadcn UI
4. A basic package.json with necessary dependencies
5. A README.md explaining the project and setup instructions

Focus on creating a clean, maintainable foundation that follows React best practices.
```

### Prompt 2: Basic App Component and Layout

```
Now that we have the project initialized, let's create the basic App component and layout structure.

Please create:
1. An App component that serves as the main container
2. A simple layout with header, main content area, and footer
3. Responsive styling using Tailwind CSS
4. A simple navigation structure for potential future expansion
5. Apply Shadcn UI theming

The layout should be clean and minimal, with room to add more components later. Follow best practices for component organization and file structure.
```

### Prompt 3: Data Models and Context

```
Let's define the data models and set up the state management for our application.

Create the following:
1. TypeScript interfaces for the Prompt and Evaluation types as specified in the schema:
   - Prompt: id, text, technology, evaluations
   - Evaluation: timestamp, score, grade, commentary, output
2. A React context for managing prompt data
3. Mock data for development (at least 5 sample prompts with evaluations)
4. Utility functions for working with the data (e.g., getting the latest evaluation)

Ensure type safety throughout and follow best practices for React context implementation.
```

### Prompt 4: PromptList Component

```
Let's implement the PromptList component that will display all prompts for a given technology.

Create:
1. A PromptList component that receives prompts as props
2. The ability to group prompts by technology
3. Proper styling using Tailwind CSS and Shadcn UI
4. Responsive design for different screen sizes
5. Integration with our data context from the previous step

The component should display a list of prompts in a clean, organized manner. For now, we'll just show placeholder cards for each prompt.
```

### Prompt 5: EvaluationBadge Component

```
Now, implement the EvaluationBadge component which will display the score and grade for a prompt evaluation.

Create:
1. An EvaluationBadge component that accepts score (0-100) and grade (S-F) as props
2. Visual representation of the grade with appropriate colors:
   - S: Green/Gold
   - A: Green
   - B: Light Green
   - C: Yellow
   - D: Orange
   - F: Red
3. Display the numerical score alongside the letter grade
4. Responsive and accessible design
5. Different styling variations based on grade

Use Tailwind and Shadcn UI for styling, and ensure the component is reusable across the application.
```

### Prompt 6: PromptCard Component

```
Let's implement the PromptCard component which displays an individual prompt with its evaluation.

Create:
1. A PromptCard component that receives a prompt object and its latest evaluation as props
2. Display of the prompt text, formatted appropriately
3. Integration of the EvaluationBadge component we created earlier
4. Display of the timestamp of the latest evaluation
5. A clean, card-based design using Shadcn UI and Tailwind
6. Responsive behavior for different screen sizes

The card should have a clear visual hierarchy with the prompt text prominently displayed.
```

### Prompt 7: CollapsibleOutput Component

```
Now, implement the CollapsibleOutput component that will allow users to expand and collapse the full output of a prompt evaluation.

Create:
1. A CollapsibleOutput component that accepts output text, isOpen state, and onToggle function as props
2. Toggle functionality to show/hide the full output
3. Smooth animation for expanding/collapsing
4. Styling for both collapsed and expanded states
5. Proper formatting of the output text
6. "Show more" / "Show less" toggle button

Use Tailwind for styling and ensure the component is accessible with keyboard navigation support.
```

### Prompt 8: Integrate Components and Wire Together

```
Now let's integrate all the components we've created so far and wire them together.

Please:
1. Update the App component to use our PromptList component
2. Ensure PromptList renders PromptCard components for each prompt
3. Integrate the EvaluationBadge into each PromptCard
4. Add CollapsibleOutput to each PromptCard
5. Connect all components to the data context
6. Implement any missing functionality for a cohesive experience
7. Ensure responsive behavior across all screen sizes

The result should be a fully functional UI that displays prompts, their evaluations, and allows expanding/collapsing the full outputs.
```

### Prompt 9: Convex Integration

```
Let's integrate our application with Convex for data fetching.

Please:
1. Set up Convex configuration for the project
2. Create data fetching utilities to retrieve prompts and evaluations
3. Modify our data context to fetch from Convex instead of using mock data
4. Implement proper loading states during data fetching
5. Add error handling for failed data fetching
6. Update components to handle real data

Make sure to maintain type safety and follow best practices for data fetching in React applications.
```

### Prompt 10: Error Handling and Fallbacks

```
Now let's enhance our application with proper error handling and fallbacks.

Please:
1. Implement React Error Boundaries around key components
2. Create user-friendly error states for components
3. Add fallback UI for missing data
4. Implement graceful handling for missing fields in prompt or evaluation objects
5. Add loading indicators for async operations
6. Provide default values where appropriate

Ensure that the application degrades gracefully under error conditions and provides useful feedback to users.
```

### Prompt 11: Accessibility and Performance Optimizations

```
Let's improve the accessibility and performance of our application.

Please:
1. Add proper ARIA attributes to all interactive elements
2. Ensure proper contrast ratios for text readability
3. Implement keyboard navigation for all interactive elements
4. Add code splitting for optimal performance
5. Implement lazy loading for components where appropriate
6. Optimize rendering performance (useMemo, useCallback where needed)
7. Add meta tags for SEO

Focus on making the application accessible to all users and optimizing for fast load times and smooth interactions.
```

### Prompt 12: Build and Deployment Configuration

```
Finally, let's set up the build and deployment configuration for our application.

Please:
1. Configure the build process for optimal output
2. Set up environment variables for development and production
3. Create a Netlify configuration file for deployment
4. Add build scripts to package.json
5. Document the deployment process in the README
6. Add any necessary optimizations for the production build

The result should be a project that's ready to deploy to Netlify with proper configuration and optimized build settings.
```
