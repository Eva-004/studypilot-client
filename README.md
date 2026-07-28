# StudyPilot AI

> An AI-powered study planning platform that helps students create personalized study plans using an Agentic AI Study Planner.

StudyPilot AI is a full-stack web application designed to make study planning smarter and more personalized. The core feature is an **Agentic AI Study Planner** that analyzes a student's goals, subject, exam date, available study time, and priorities to generate a structured study plan.

The project was developed using an **AI-Assisted Vibe Coding approach**, where AI tools were used as a development partner for implementation exploration, debugging, refactoring, prompt engineering, and problem-solving, while the overall architecture, feature decisions, integration, testing, and final implementation were reviewed and adapted throughout development.

Live demo: https://studypilot-client.vercel.app/

---

## Features

### AI Study Planner

- Generates personalized study plans using Agentic AI
- Analyzes study goals and requirements
- Considers exam dates and available study time
- Prioritizes study requirements
- Generates structured and actionable study plans
- Supports regenerating AI-generated plans

### Study Plan Management

- Create study plans
- View study plan details
- Manage existing plans
- Delete plans
- Set study priority
- Track study-related information

### Explore Study Plans

- Search study plans by title
- Filter plans by priority
- Sort plans by exam date
- Pagination
- Loading skeletons
- Responsive study plan cards

### Authentication

- User registration
- User login
- Google authentication
- Protected routes
- Secure API access
- User-specific study plans

### Dashboard

- Overview of study plans
- Study statistics
- Progress visualization
- Interactive charts
- Quick access to AI Study Planner

### Responsive UI

- Mobile responsive
- Tablet responsive
- Desktop optimized
- Consistent component design
- Loading and empty states
- Error handling

---

## Agentic AI Workflow

The main AI workflow of StudyPilot AI follows a context-aware planning process:

```text
User
  ↓
Study Requirements
  ↓
AI Study Planner Agent
  ↓
Context Analysis
  ↓
Planning & Decision Making
  ↓
Personalized Study Plan
  ↓
User Review
  ↓
Save & Manage Plan
