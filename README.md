# BOXpad Application

A modern, responsive React-based team communication and dashboard application featuring an interactive inbox, user lists, animated UI layouts, and customizable chat windows.

## Setup Instructions

1. **Prerequisites**: Make sure you have [Node.js](https://nodejs.org/) installed along with `npm` (Node Package Manager).

2. **Clone the repository** (if not done already):
   ```bash
   git clone <repository-url>
   cd toxpad
   ```

3. **Install dependencies**:
   Run the following command in the project root to install the necessary packages.
   ```bash
   npm install
   ```

4. **Start the Development Server**:
   Launch the app locally.
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## APIs Used

The application utilizes **Axios** to fetch mock user data from multiple free public APIs, consolidating them into a single fluid application state:

1. **JSONPlaceholder API**: `https://jsonplaceholder.typicode.com/users` (Provides baseline mock users, emails, and usernames).
2. **DummyJSON API**: `https://dummyjson.com/users` (Provides additional detailed mock user profiles, avatars, and extended data).
3. **Reqres API**: `https://reqres.in/api/users` (Used for fetching paginated user simulation data).

---

## Assumptions Made

During the development process, the following assumptions and technical choices were made:

1. **No Backend Required for Operation**: The app operates solely as a client-side frontend mock. Any data fetched uses the public endpoints listed above. Real authentication, persistent messaging, and server-side state are abstracted away or simulated.
2. **Environment & Frameworks**: It is assumed the environment runs on standard React 18/19 typings using Create React App (CRA).
3. **TypeScript Workarounds**: Due to `react-icons@5.5.0` component typings occasionally conflicting with strict React 19 `ReactElement` typing constraints, a direct function invocation workaround (`{Icon({} as any) as ReactElement}`) is used across the codebase to ensure stable compilation without sacrificing UI correctness.
4. **Layout**: The application assumes a Desktop-first and heavily responsive approach using standard `Tailwind CSS` utility classes, aggressively utilizing flex layouts and hiding scrollbars to mimic a seamless native application feel. Mobile compatibility is ensured via breakpoints (`md`, `lg`) and drawer toggles. 
5. **Iconography**: `react-icons` is extensively used to simulate a rich feature-set (e.g. `FiMenu`, `FaUser`, `PiNetworkFill`, `IoChevronDown`, etc.).
# box-pad
