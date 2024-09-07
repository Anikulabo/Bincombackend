<<<<<<< HEAD
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
=======
# Bincom
Application Overview

This React application is designed to manage and display data related to Local Government Areas (LGAs), Wards, Polling Units, and political parties. It integrates with a backend API to fetch and submit data, using React Query for data fetching and context for state management. Below is a detailed overview of the processes and components used in the application.
Features

    Fetch and display LGA, Ward, Polling Unit, and Party data.
    Submit polling unit results to the backend.
    Dynamic data fetching based on user selections and actions.
    Context-based state management for shared data across components.

Components
State Management

    activeaction State:
        Manages the currently active action (e.g., viewing results or adding data).
        Initialized with the first action from allactions.

    data State:
        Stores form data including entered_by_user and party_score.
        Updated through the updatedata function.

    allselecteditems State:
        Tracks selections for LGA, Ward, Polling Unit, and Party.
        Updated through the changeSelectedItems function.

Data Fetching

    fetchLGA:
        Fetches LGA data based on a predefined state_id.
        Used in the useQuery hook to provide LGA data for dropdowns.

    fetchWard:
        Fetches Ward data based on LGA and an optional search term.
        Triggered when LGA is selected.

    fetchpollingunitresults:
        Fetches results for a specific polling unit.
        Triggered when a Polling Unit is selected.

    fetchpollingunit:
        Fetches Polling Units based on LGA and Ward selections.
        Triggered based on selected LGA and Ward.

    fetchlgaresult:
        Fetches results for a specific LGA.
        Triggered when viewing LGA results.

    fetchallparties:
        Fetches data for all political parties.
        Triggered when the action to add a polling unit result is selected.

Context API

    MyContext:
        Provides a context to share state and functions across components.

    MyProvider:
        Wraps components to provide the context.
        Passes down LGA, Ward, Party, and Polling Unit data along with state management functions.

Form Submission

    submitdata Function:
        Handles form submission.
        Collects form data and appends only non-empty values to FormData.
        Sends a POST request to the backend.
        Handles success and error responses.
        Resets form fields upon successful submission.

React Query Integration

    useQuery Hook:
        Used to fetch and manage data states (loading, error, and data) for LGAs, Wards, Polling Units, and Party data.
        Queries are dependent on user selections and actions, ensuring that only relevant data is fetched and displayed.

Application Flow

    Data Fetching:
        Data is fetched dynamically based on user interactions (e.g., selecting LGA triggers fetching of Wards).
        The fetched data populates dropdowns and other UI elements.

    Form Handling:
        Users can select options from dropdowns and enter data into forms.
        Upon form submission, data is validated and sent to the backend.
        Success or failure messages are displayed based on the response.

    State Management:
        Shared state is managed using the Context API, making it accessible across components.
        Local component state handles individual component data and user interactions.

Error Handling

    Errors during data fetching are logged to the console and displayed as alerts.
    Form submission errors are handled with alerts and console logs.

Dependencies

    React: For building the user interface.
    React Query: For data fetching and caching.
    Axios: For making HTTP requests.
    React Context API: For state management across components.
>>>>>>> 94c73a4e85de6062304f12c9371e40a32c2d225b
