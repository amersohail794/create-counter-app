# Counter App (React + TypeScript + Vite)

A front-end prototype for a branch/counter service desk workflow (QMATIC-style), built with React, TypeScript, Vite, Tailwind CSS, and Lucide icons.

## Overview

This application simulates the key UI flow for a service counter operator:

1. Select branch, counter, and work profile.
2. Enter a **ready-to-serve** counter view.
3. Call the next ticket and move into the **serving** experience.
4. Perform actions while serving (finish, transfer, link customer, etc.).

All data is currently mocked and stored in `src/constants/mockData.ts`.

---

## Features

### 1) Settings / Selection flow
- Operator selects:
  - Branch
  - Counter
  - Work profile
- Dependent selects are progressively enabled (counter after branch, profile after counter).
- "Apply Settings" is enabled only when all three values are selected.

### 2) Counter screen
- Displays header with product brand, selected counter, selected branch.
- Primary CTA: **Call Next Customer**.
- Secondary actions shown for walk-in and counter-close actions.
- Right sidebar shows queues with waiting customers and wait time badges.

### 3) Serving screen
- Shows active ticket number and service name.
- Shows waiting time and transaction time.
- Includes actions row:
  - Recall (placeholder)
  - Recycle (placeholder)
  - Transfer (opens transfer modal)
  - Park (placeholder)
  - SMS (placeholder)
  - No Show (placeholder)
- Finish Service returns to counter-ready state.
- Link/add/edit customer flow via modal dialog.
- Notes and additional info placeholders are present for future integration.

### 4) Customer dialog (link/add/edit)
- Search existing customers by name, email, or phone.
- Select an existing customer to link to current ticket.
- Add/edit customer form with required first/last name validation.
- DOB split into year/month/day with month list sourced from constants.

### 5) Transfer dialog
- Multi-step transfer modal with 3 paths:
  - **Transfer to Queue** (search queues + position options)
  - **Transfer to Counter** (active/inactive/current status handling)
  - **Transfer to Staff** (current user disabled, others selectable)

---

## Code Structure

```text
src/
  App.tsx                         # Main screen state machine + top-level orchestration
  main.tsx                        # React app bootstrap
  App.css / index.css             # Global/app-level styles

  constants/
    mockData.ts                   # Branches, counters, staff, queues, customers, next ticket

  types/
    index.ts                      # Shared domain types (Ticket, Queue, Customer, Screen, etc.)

  screens/
    SelectionScreen.tsx           # Branch/counter/profile selection UI
    CounterScreen.tsx             # Ready-to-serve counter UI
    ServingScreen.tsx             # In-service ticket handling UI

  components/
    AppHeader.tsx                 # Header with context + change settings action
    QueueSidebar.tsx              # Queue summary panel
    CustomerDialog.tsx            # Add/edit/link customer modal
    SectionDivider.tsx            # Reusable section separator

    transfer/
      TransferDialog.tsx          # Transfer modal step coordinator
      TransferOptions.tsx         # Transfer mode selection
      TransferToQueue.tsx         # Queue transfer step
      TransferToCounter.tsx       # Counter transfer step
      TransferToStaff.tsx         # Staff transfer step
```

---

## State & Flow Notes

- Top-level UI flow is managed in `App.tsx` using `screen` state:
  - `selection` → `counter` → `serving`
- `currentTicket` being set determines whether serving UI is rendered.
- `TransferDialog` visibility is controlled by `showTransferDialog`.
- Display names for selected branch/counter are resolved in `App.tsx` from IDs.
- Most business actions are currently UI-only (mocked or TODO placeholders).

---

## Tech Stack

- React 19
- TypeScript 5
- Vite 7
- Tailwind CSS 4
- lucide-react (icons)
- ESLint 9

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install

```bash
npm install
```

### Run dev server

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Preview production build

```bash
npm run preview
```

---

## Current Limitations / Next Steps

- Data persistence/API integration is not implemented.
- Multiple actions are placeholders (`Recall`, `Recycle`, `Park`, `SMS`, `No Show`, some counter actions).
- Queue and ticket operations are not yet stateful across sessions.
- No automated test suite is configured yet.

Potential next improvements:
- Introduce API layer + React Query/state management.
- Add unit/component tests (Vitest + React Testing Library).
- Add routing if the app expands to multi-module navigation.
- Externalize mock data into service adapters for easy swapping.
