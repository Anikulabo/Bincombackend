# Bincombackend
Here’s a detailed README documentation for your backend, covering the various routes and their controllers. This will help users understand the available endpoints and how to interact with your API.
Backend API Documentation
Overview

This document provides details on the backend API for the project, including the routes, controllers, and functionality.
Base URL

The base URL for the API is http://localhost:3001/api.
Endpoints
Announced Polling Unit Results
GET /api/polling-units/:polling_unit_uniqueid/results

    Description: Retrieves results for a specific polling unit.
    Parameters:
        polling_unit_uniqueid: Unique identifier for the polling unit (URL parameter).
    Responses:
        200 OK: Returns the results for the polling unit.
        404 Not Found: No results found for the polling unit.
        500 Internal Server Error: Error retrieving results.

POST /api/polling-units/results

    Description: Adds results for a polling unit.
    Body:
        entered_by_user: The user who entered the data.
        polling_unit_uniqueid: Unique identifier for the polling unit.
        party_abbreviation: Abbreviation of the party.
        party_score: Score of the party.
    Responses:
        201 Created: Successfully added the results.
        500 Internal Server Error: Error adding the results.

LGA Routes
GET /api/lga/:state_id

    Description: Retrieves all LGAs in a specific state with optional pagination.
    Parameters:
        state_id: Unique identifier for the state (URL parameter).
        page: Page number for pagination (query parameter, default is 1).
        limit: Number of items per page (query parameter, default is 25).
    Responses:
        200 OK: Returns the LGAs with pagination metadata.
        500 Internal Server Error: Error retrieving LGAs.

Polling Units
GET /api/polling-units/:lga_id/:uniquewardid

    Description: Retrieves polling units based on LGA and ward ID.
    Parameters:
        lga_id: Unique identifier for the LGA (URL parameter).
        uniquewardid: Unique identifier for the ward (URL parameter).
    Responses:
        200 OK: Returns the polling units.
        404 Not Found: No polling units found.
        500 Internal Server Error: Error retrieving polling units.

Wards
GET /api/wards/:lga_id/:searchitem

    Description: Retrieves all wards in a specific LGA with optional search and pagination.
    Parameters:
        lga_id: Unique identifier for the LGA (URL parameter).
        searchitem: Optional search term for ward names (URL parameter).
        page: Page number for pagination (query parameter, default is 1).
        limit: Number of items per page (query parameter, default is 25).
    Responses:
        200 OK: Returns the wards with pagination metadata.
        400 Bad Request: Invalid page or limit value.
        500 Internal Server Error: Error retrieving wards.

Parties
GET /api/parties

    Description: Retrieves a list of all parties.
    Responses:
        200 OK: Returns the list of parties.
        404 Not Found: No parties found.
        500 Internal Server Error: Error retrieving parties.

Error Handling

    404 Not Found: Returned when a resource is not found.
    500 Internal Server Error: Returned for server-side errors, such as issues with database queries or transactions.
