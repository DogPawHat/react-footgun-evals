# Project Overview

You are building a web application that evaluates how well different LLMs can explain React concepts to beginners.

# Core functionalities

1. **Evaluation System:**

   - Run evaluations against multiple LLMs (Claude, GPT-4) using predefined prompts
   - Store evaluation results in Convex DB
   - Track metrics:
     - Duration of responses
     - Token usage
     - Cost per evaluation
     - Success/failure rates

2. **Predefined Prompts:**

   - Create a TypeScript file containing React topic prompts
   - Organize by categories (Setup, Components, State Management)
   - Each prompt should include:
     - Question text
     - Expected key points in answer
     - Category
     - Difficulty level

3. **LLM Integration:**

   - Create uniform API abstraction for different LLMs
   - Handle rate limiting and error cases
   - Support streaming responses
   - Manage API keys securely

4. **Scoring System:**

   - Automated scoring based on:
     - Presence of expected key points
     - Code example quality
     - Explanation clarity
   - Manual review interface for spot-checking
   - Score aggregation and comparison

5. **Scheduling:**

   - Weekly automated evaluation runs
   - Manual trigger option for immediate evaluation
   - Progress tracking and status updates

6. **Results Dashboard:**

   - Compare LLM performance:
     - Overall scores
     - Category-wise analysis
     - Response time comparison
   - Historical trends
   - Export capabilities

7. **Error Handling:**
   - Retry logic for failed API calls
   - Partial results handling
   - Cost monitoring and limits
   - Detailed error logging

---

## Technical Implementation

### Data Flow

1. Scheduler triggers evaluation run
2. System loads predefined prompts
3. LLMs generate responses
4. Scoring system evaluates responses
5. Results stored in Convex DB
6. Dashboard updates with new data

### Tech Stack

- TypeScript
- React
- Tailwind CSS
- TanStack Router
- TanStack Query
- Convex DB
- Vercel AI SDK

### Database Schema

Using existing Convex schema with tables:

- runs: Evaluation run metadata
- evals: Individual prompt evaluations
- results: Raw responses and metrics
- scores: Detailed scoring data
- traces: API call monitoring
