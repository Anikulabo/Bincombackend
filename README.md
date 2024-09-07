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
